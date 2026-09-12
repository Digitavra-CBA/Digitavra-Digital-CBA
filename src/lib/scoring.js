// ini scoring js
import { RUBRIC, ALL_INDICATORS, MAX_SCORE } from "./rubric";

// Pedoman Konversi Nilai & Status Kompetensi (4 tingkat)
export const STATUS_LEVELS = [
  {
    key: "sangat",
    label: "Sangat Kompeten",
    min: 92,
    max: 100,
    color: "sangat",
    keterangan: "Trainee dapat bekerja secara mandiri tanpa pengawasan.",
  },
  {
    key: "kompeten",
    label: "Kompeten",
    min: 83,
    max: 91,
    color: "kompeten",
    keterangan: "Trainee dapat bekerja mandiri dengan sesekali pengawasan ringan.",
  },
  {
    key: "cukup",
    label: "Cukup Kompeten",
    min: 74,
    max: 82,
    color: "cukup",
    keterangan: "Memerlukan bimbingan/pendampingan ulang pada aspek yang masih lemah.",
  },
  {
    key: "belum",
    label: "Belum Kompeten",
    min: 0,
    max: 73,
    color: "belum",
    keterangan: "Belum mencapai standar; memerlukan bimbingan & pelatihan ulang (retraining).",
  },
];

export function totalRawScore(scores) {
  return ALL_INDICATORS.reduce((sum, ind) => sum + (Number(scores[ind.id]) || 0), 0);
}

export function finalScore(scores) {
  const raw = totalRawScore(scores);
  return Math.round((raw / MAX_SCORE) * 1000) / 10; // one decimal
}

export function getStatus(nilaiAkhir) {
  return (
    STATUS_LEVELS.find((s) => nilaiAkhir >= s.min && nilaiAkhir <= s.max) ||
    STATUS_LEVELS[STATUS_LEVELS.length - 1]
  );
}

export function categoryBreakdown(scores) {
  return RUBRIC.map((cat) => {
    const max = cat.indicators.length * 4;
    const raw = cat.indicators.reduce((s, i) => s + (Number(scores[i.id]) || 0), 0);
    return {
      key: cat.key,
      category: cat.category,
      raw,
      max,
      percent: max ? Math.round((raw / max) * 1000) / 10 : 0,
    };
  });
}

// Sistem feedback otomatis berbasis skor akhir + kategori terlemah
export function generateFeedback(scores) {
  const nilai = finalScore(scores);
  const status = getStatus(nilai);
  const breakdown = categoryBreakdown(scores);

  const weakest = [...breakdown].sort((a, b) => a.percent - b.percent)[0];

  const opening = {
    sangat:
      "Selamat! Kinerja Anda sangat baik dan Anda dapat bekerja secara mandiri tanpa pengawasan.",
    kompeten:
      "Kinerja Anda sudah baik dan Anda mampu bekerja mandiri dengan pengawasan ringan sesekali.",
    cukup:
      "Kinerja Anda cukup baik, namun masih memerlukan bimbingan pada beberapa aspek.",
    belum:
      "Anda memerlukan bimbingan dan pelatihan ulang pada beberapa aspek sebelum dapat bekerja secara mandiri.",
  }[status.key];

  const hasAnyScore = totalRawScore(scores) > 0;
  const focus =
    hasAnyScore && weakest && weakest.percent < 100
      ? `Aspek ${weakest.category} Anda masih menjadi area yang perlu diperkuat — perhatikan kembali indikator-indikator pada kategori ini.`
      : "Pertahankan konsistensi pada seluruh kategori penilaian.";

  const followUp = {
    sangat: "Terus pertahankan standar kerja ini dan jadilah contoh bagi rekan trainee lainnya.",
    kompeten: "Lanjutkan pengembangan diri agar dapat mencapai level Sangat Kompeten.",
    cukup: "Jadwalkan sesi pendampingan bersama supervisor untuk aspek yang masih lemah.",
    belum: "Diperlukan retraining terjadwal bersama supervisor pada aspek yang belum dikuasai.",
  }[status.key];

  return { opening, focus, followUp, status, nilai, weakest };
}
