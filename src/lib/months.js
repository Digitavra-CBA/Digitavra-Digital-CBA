// Daftar bulan & helper konversi ke/dari nomor bulan (untuk menyusun tanggal internal)
export const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export function monthToNumber(name) {
  const idx = MONTHS.indexOf(name);
  return idx >= 0 ? String(idx + 1).padStart(2, "0") : "01";
}

export function numberToMonth(num) {
  const idx = Number(num) - 1;
  return MONTHS[idx] || MONTHS[0];
}

// Jumlah hari yang wajar untuk bulan tertentu (dipakai untuk mengisi pilihan tanggal)
export function daysInMonth(monthName, year) {
  const idx = MONTHS.indexOf(monthName);
  if (idx < 0) return 31;
  return new Date(year, idx + 1, 0).getDate();
}

export function dayOptions(monthName, year) {
  const total = daysInMonth(monthName, year || new Date().getFullYear());
  return Array.from({ length: total }, (_, i) => i + 1);
}

// Label lengkap "12 September 2026" dari sebuah assessment (shift = nama bulan, date = YYYY-MM-DD)
export function periodLabel(assessment) {
  if (!assessment?.date) return "-";
  const day = Number(assessment.date.slice(8, 10)) || 1;
  const year = assessment.date.slice(0, 4);
  const month = assessment.shift || numberToMonth(assessment.date.slice(5, 7));
  return `${day} ${month} ${year}`;
}

// Awal & akhir Periode PKL (bulan + tahun), diambil dari field pklBulanMulai/pklTahunMulai
// dan pklBulanSelesai/pklTahunSelesai yang diisi di form penilaian.
export function periodStartLabel(assessment) {
  if (!assessment?.pklBulanMulai) return "-";
  return `${assessment.pklBulanMulai} ${assessment.pklTahunMulai}`;
}

export function periodEndLabel(assessment) {
  if (!assessment?.pklBulanSelesai) return "-";
  return `${assessment.pklBulanSelesai} ${assessment.pklTahunSelesai}`;
}

// Rentang pilihan tahun yang ditampilkan di dropdown (bebas dipilih dalam rentang ini)
export function yearOptions(span = 3) {
  const current = new Date().getFullYear();
  const years = [];
  for (let y = current - span; y <= current + span; y++) years.push(y);
  return years;
}