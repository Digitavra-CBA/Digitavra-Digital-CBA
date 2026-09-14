// Catatan: data assessment & users sekarang diambil dari Supabase (lihat lib/supabaseData.js).
// File ini tinggal menyisakan hal-hal yang memang tetap cocok disimpan lokal di browser:
// sesi login (sessionStorage) dan generator id untuk assessment baru.

const SESSION_KEY = "digital-cba:session";

// Generator id assessment baru. Dulu butuh parameter `list` untuk menghitung
// panjang array; sekarang cukup timestamp + random suffix supaya tetap unik
// tanpa perlu tahu isi data yang ada di Supabase.
export function nextAssessmentId() {
  return `a-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
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