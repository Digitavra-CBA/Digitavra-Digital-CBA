import { seedAssessments } from "./mockData";

const KEY = "digital-cba:assessments";
const SESSION_KEY = "digital-cba:session";

// Migrasi skema lama (field `shift`: "Pagi"/"Siang"/"Sore"/"Malam" atau nama bulan)
// menjadi skema baru `periodeMulai` / `periodeSelesai` (format "YYYY-MM-01").
// Kalau record sudah punya periodeMulai/periodeSelesai, dibiarkan apa adanya.
function migrateAssessment(a) {
  if (a.periodeMulai || a.periodeSelesai) return a;

  const { shift, ...rest } = a;

  // Tidak ada informasi bulan pasti dari shift lama (Pagi/Siang/Sore/Malam),
  // jadi dipakai bulan dari `date` (tanggal penilaian) sebagai perkiraan
  // periode mulai & selesai. Ini hanya fallback agar tampilan tidak rusak;
  // supervisor tetap bisa mengedit ke periode yang benar lewat "Edit Penilaian".
  const fallbackMonth = a.date ? a.date.slice(0, 7) : null; // "YYYY-MM"

  return {
    ...rest,
    periodeMulai: fallbackMonth ? `${fallbackMonth}-01` : "",
    periodeSelesai: fallbackMonth ? `${fallbackMonth}-01` : "",
  };
}

function migrateList(list) {
  let changed = false;
  const migrated = list.map((a) => {
    if (a.periodeMulai || a.periodeSelesai) return a;
    changed = true;
    return migrateAssessment(a);
  });
  return { migrated, changed };
}

export function loadAssessments() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const seeded = seedAssessments();
      localStorage.setItem(KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    const { migrated, changed } = migrateList(parsed);
    if (changed) {
      localStorage.setItem(KEY, JSON.stringify(migrated));
    }
    return migrated;
  } catch {
    return seedAssessments();
  }
}

export function saveAssessments(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function upsertAssessment(assessment) {
  const list = loadAssessments();
  const idx = list.findIndex((a) => a.id === assessment.id);
  if (idx >= 0) {
    list[idx] = assessment;
  } else {
    list.push(assessment);
  }
  saveAssessments(list);
  return list;
}

export function nextAssessmentId(list) {
  const n = list.length + 1;
  return `a-${n}-${Date.now().toString(36)}`;
}

export function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function setSession(user) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}