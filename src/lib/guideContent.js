// Konten Panduan Penggunaan — disusun per role
import { BookOpenCheck } from "lucide-react";

export const GUIDE_CONTENT = {
  trainee: {
    title: "Panduan Penggunaan — Trainee",
    intro:
      "Panduan ini menjelaskan hasil penilaian kompetensi Anda di Digital CBA Digitavra.",
    sections: [
      {
        heading: "1. Masuk ke akun Anda",
        body: "Login menggunakan username & password yang diberikan oleh supervisor. Setelah masuk, Anda akan otomatis diarahkan ke Dashboard Trainee.",
      },
      {
        heading: "2. Status Kompetensi",
        body: "Kartu berwarna di bagian atas dashboard menunjukkan status kompetensi terkini: Belum Kompeten, Cukup Kompeten, Kompeten, atau Sangat Kompeten. Status ini dihitung otomatis dari nilai akhir penilaian terakhir yang diberikan supervisor.",
      },
      {
        heading: "3. Nilai Akhir & Rincian Skor",
        body: "Nilai akhir ditampilkan dalam skala 0–100. Di bawahnya terdapat grafik batang yang membandingkan pencapaian Anda pada tiga kategori: Hard Skill, Soft Skill, dan Technical Skill. Rincian skor ini untuk mengetahui kategori mana yang sudah kuat dan mana yang masih perlu ditingkatkan.",
      },
      {
        heading: "4. Feedback Sistem",
        body: "Kartu 'Feedback Sistem' berisi narasi otomatis: ringkasan status kompetensi Anda, kategori yang paling perlu diperkuat, dan saran tindak lanjut.",
      },
      {
        heading: "5. Detail 20 Indikator",
        body: "Klik 'Lihat detail rubrik' untuk melihat skor Anda pada masing-masing dari 20 indikator penilaian, lengkap dengan kategorinya.",
      },
      {
        heading: "6. Riwayat Penilaian",
        body: "Tabel Riwayat Penilaian menampilkan seluruh penilaian yang Anda terima, termasuk tanggal, nama penilai, nilai akhir, dan status kompetensi.",
      },
      {
        heading: "7. Mengunduh Rekap PDF",
        body: "Tombol 'Unduh Rekap PDF' pada kartu Detail Penilaian akan mengunduh lembar rekapitulasi skor Anda dalam format PDF.",
      },
    ],
    note: "Trainee hanya dapat melihat hasil penilaian (read-only) dan tidak dapat mengubah skor.",
  },

  supervisor: {
    title: "Panduan Penggunaan — Supervisor",
    intro:
      "Panduan ini menjelaskan cara melakukan penilaian kompetensi Table Set-up trainee menggunakan rubrik digital.",
    sections: [
      {
        heading: "1. Melihat Daftar Trainee Bimbingan",
        body: "Setelah login, halaman 'Trainee Bimbingan' menampilkan seluruh trainee yang berada di bawah bimbingan Anda.",
      },
      {
        heading: "2. Memulai Penilaian Baru",
        body: "Klik tombol 'Nilai Sekarang' pada kartu trainee yang ingin dinilai. Anda akan diarahkan ke form penilaian berbasis rubrik untuk trainee tersebut.",
      },
      {
        heading: "3. Mengisi Identitas Penilaian",
        body: "Lengkapi periode PKL trainee serta tanggal pelaksanaan penilaian. Nama trainee dan nama penilai sudah terisi otomatis sesuai akun yang login.",
      },
      {
        heading: "4. Memberi Skor per Indikator",
        body: "Form terbagi menjadi tiga kategori: Hard Skill, Soft Skill, dan Technical Skill, total 20 indikator. Untuk setiap indikator, klik angka 1–4 sesuai unjuk kerja trainee. Klik ikon info (ⓘ) di samping nama indikator untuk membaca deskriptor lengkap tiap level skor sebelum menentukan nilai, hal ini penting agar penilaian tetap objektif dan konsisten antar penilai.",
      },
      {
        heading: "5. Menambahkan Catatan",
        body: "Kolom catatan di tiap kategori bersifat opsional, gunakan untuk mencatat observasi spesifik yang tidak tertangkap oleh skor angka saja.",
      },
      {
        heading: "6. Memantau Nilai Akhir Secara Real-Time",
        body: "Panel ringkasan di bagian bawah form (total skor, nilai akhir, dan status kompetensi) akan otomatis diperbarui setiap kali Anda mengubah skor, sebelum penilaian disimpan.",
      },
      {
        heading: "7. Menyimpan Draft atau Submit Final",
        body: "Gunakan 'Simpan Draft' bila penilaian belum selesai dan ingin dilanjutkan nanti. Gunakan 'Submit Penilaian Final' bila penilaian sudah lengkap dan siap dilihat oleh trainee serta General Manager.",
      },
      {
        heading: "8. Melihat & Mengedit Riwayat Penilaian",
        body: "Menu 'Riwayat Penilaian' menampilkan seluruh penilaian yang pernah Anda buat, dapat difilter per trainee. Klik 'Lihat / Edit' untuk membuka kembali sebuah penilaian.",
      },
    ],
    note: "Mohon lakukan penilaian berdasarkan pengamatan langsung terhadap unjuk kerja trainee sesuai dengan deskriptor rubrik, agar hasil assessment tetap objektif dan akurat..",
  },

  gm: {
    title: "Panduan Penggunaan — General Manager",
    intro:
      "Panduan ini menjelaskan cara memantau kompetensi seluruh trainee dan melakukan koreksi penilaian bila diperlukan.",
    sections: [
      {
        heading: "1. Ringkasan Kompetensi",
        body: "Halaman 'Ringkasan' menampilkan distribusi status kompetensi seluruh trainee (grafik), rata-rata skor per kategori (Hard Skill, Soft Skill, Technical Skill), serta jumlah trainee pada tiap status.",
      },
      {
        heading: "2. Memantau Seluruh Trainee",
        body: "Menu 'Monitoring Trainee' menampilkan tabel seluruh trainee beserta supervisor penilai, nilai akhir, status kompetensi, dan tanggal penilaian.",
      },
      {
        heading: "3. Mencari & Memfilter Data",
        body: "Gunakan kolom pencarian untuk mencari nama trainee tertentu, atau gunakan filter supervisor dan filter status untuk mempersempit tampilan tabel.",
      },
      {
        heading: "4. Melihat Detail Trainee",
        body: "Klik 'Lihat Detail' pada baris trainee untuk membuka halaman detail lengkap — tampilannya sama seperti dashboard yang dilihat trainee tersebut (status kompetensi, nilai, grafik kategori, feedback sistem, riwayat penilaian).",
      },
      {
        heading: "5. Mengoreksi atau Mengubah Skor",
        body: "Pada halaman detail trainee, klik 'Edit Penilaian' untuk membuka kembali form rubrik dan mengoreksi skor bila ditemukan ketidaksesuaian. Klik 'Simpan Perubahan' setelah selesai, perubahan akan langsung memengaruhi nilai akhir, status kompetensi, dan feedback sistem trainee tersebut.",
      },
      {
        heading: "6. Mengunduh Rekap PDF",
        body: "Pada halaman detail trainee, tombol 'Unduh Rekap PDF' menghasilkan lembar rekapitulasi skor untuk keperluan pelaporan atau arsip.",
      },
    ],
    note: "Mohon pastikan setiap perubahan skor didasarkan pada hasil verifikasi atau peninjauan ulang yang dapat dipertanggungjawabkan, sehingga objektivitas dan integritas proses assessment tetap terjaga.",
  },
};

export const GUIDE_ICON = BookOpenCheck;
