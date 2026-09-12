import { emptyScores } from "./rubric";

export const USERS = [
  {
    id: "u-trainee-1",
    username: "zidan.trainee",
    password: "trainee123",
    role: "trainee",
    name: "Zidan Ramadhan",
    department: "Food & Beverage Service",
    period: "Jul 2026 — Jan 2027",
    supervisorId: "u-supervisor-1",
  },
  {
    id: "u-trainee-2",
    username: "amira.trainee",
    password: "trainee123",
    role: "trainee",
    name: "Amira Salsabila",
    department: "Food & Beverage Service",
    period: "Ags 2026 — Feb 2027",
    supervisorId: "u-supervisor-1",
  },
  {
    id: "u-trainee-3",
    username: "raka.trainee",
    password: "trainee123",
    role: "trainee",
    name: "Raka Prasetyo",
    department: "Food & Beverage Service",
    period: "Ags 2026 — Feb 2027",
    supervisorId: "u-supervisor-2",
  },
  {
    id: "u-supervisor-1",
    username: "dewi.supervisor",
    password: "super123",
    role: "supervisor",
    name: "Dewi Anggraini",
    position: "F&B Supervisor",
  },
  {
    id: "u-supervisor-2",
    username: "bagus.supervisor",
    password: "super123",
    role: "supervisor",
    name: "Bagus Wirawan",
    position: "F&B Supervisor",
  },
  {
    id: "u-gm-1",
    username: "hendra.gm",
    password: "gm123",
    role: "gm",
    name: "Hendra Kusuma",
    position: "General Manager",
  },
];

// Skor contoh (seed) — supaya dashboard tidak kosong saat pertama dibuka
export function seedAssessments() {
  const s1 = {
    ...emptyScores(),
    h1: 4, h2: 4, h3: 3, h4: 4, h5: 3,
    s1: 4, s2: 4, s3: 3, s4: 3, s5: 4, s6: 4, s7: 4,
    t1: 4, t2: 3, t3: 4, t4: 4, t5: 3, t6: 4, t7: 4, t8: 3,
  };
  const s2 = {
    ...emptyScores(),
    h1: 3, h2: 3, h3: 3, h4: 3, h5: 2,
    s1: 3, s2: 3, s3: 2, s4: 2, s5: 3, s6: 3, s7: 3,
    t1: 3, t2: 2, t3: 3, t4: 2, t5: 3, t6: 2, t7: 3, t8: 2,
  };
  const s3 = {
    ...emptyScores(),
    h1: 2, h2: 2, h3: 2, h4: 3, h5: 2,
    s1: 2, s2: 2, s3: 2, s4: 1, s5: 2, s6: 2, s7: 2,
    t1: 2, t2: 1, t3: 2, t4: 2, t5: 1, t6: 2, t7: 2, t8: 1,
  };

  return [
    {
      id: "a-1",
      traineeId: "u-trainee-1",
      supervisorId: "u-supervisor-1",
      // Periode PKL: Juli 2026 – Januari 2027
      periodeMulai: "2026-07-01",
      periodeSelesai: "2027-01-01",
      date: "2026-08-20",
      scores: s1,
      notes: { hard: "", soft: "", technical: "" },
      status: "final",
    },
    {
      id: "a-2",
      traineeId: "u-trainee-2",
      supervisorId: "u-supervisor-1",
      // Periode PKL: Agustus 2026 – Februari 2027
      periodeMulai: "2026-08-01",
      periodeSelesai: "2027-02-01",
      date: "2026-08-28",
      scores: s2,
      notes: { hard: "", soft: "Masih perlu lebih inisiatif saat jam sibuk.", technical: "" },
      status: "final",
    },
    {
      id: "a-3",
      traineeId: "u-trainee-3",
      supervisorId: "u-supervisor-2",
      // Periode PKL: Agustus 2026 – Februari 2027
      periodeMulai: "2026-08-01",
      periodeSelesai: "2027-02-01",
      date: "2026-09-02",
      scores: s3,
      notes: { hard: "", soft: "", technical: "Perlu latihan ulang water & beverage service." },
      status: "final",
    },
  ];
}