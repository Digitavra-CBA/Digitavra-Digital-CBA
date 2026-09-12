# Digital CBA — Competency-Based Assessment

Mockup website untuk penilaian kompetensi trainee *Job Performance Table
Set-Up Restaurant*, berbasis rubrik penilaian resmi (SOP No.
002/F&B/PnP Food and Beverage Service). Dibangun dengan **React + Vite +
Tailwind CSS v4**.

## Menjalankan di VS Code

1. Buka folder ini di VS Code.
2. Install dependency:
   ```bash
   npm install
   ```
3. Jalankan mode pengembangan:
   ```bash
   npm run dev
   ```
4. Buka alamat yang muncul di terminal (biasanya `http://localhost:5173`).

Untuk build production: `npm run build`, lalu `npm run preview` untuk melihat hasil build.

## Akun demo

Data pengguna & penilaian bersifat mock (`src/lib/mockData.js`) dan disimpan sementara di
`localStorage`/`sessionStorage` browser — tidak memerlukan backend untuk mencoba mockup ini.

| Role | Username | Password |
|---|---|---|
| Trainee | `zidan.trainee` | `trainee123` |
| Trainee | `amira.trainee` | `trainee123` |
| Trainee | `raka.trainee` | `trainee123` |
| Supervisor | `dewi.supervisor` | `super123` |
| Supervisor | `bagus.supervisor` | `super123` |
| General Manager | `hendra.gm` | `gm123` |

Tombol akun demo juga tersedia langsung di halaman login.

## Struktur proyek

```
src/
  lib/
    rubric.js        # 20 indikator rubrik (Hard/Soft/Technical Skill)
    scoring.js        # perhitungan nilai akhir, status kompetensi, feedback otomatis
    mockData.js        # akun pengguna & data penilaian contoh
    storage.js         # persistensi lokal (localStorage) & sesi login
    pdfExport.js        # ekspor lembar rekapitulasi skor ke PDF
  context/
    AuthContext.jsx     # state login & role
  components/            # Sidebar, PageShell, StatusBadge, form rubrik, chart, dst.
  pages/
    LoginPage.jsx
    trainee/TraineeDashboard.jsx
    supervisor/SupervisorDashboard.jsx, SupervisorAssessment.jsx, SupervisorHistory.jsx
    gm/GMDashboard.jsx, GMMonitoring.jsx, GMTraineeDetail.jsx
```

## Fitur utama

- **Login berbasis role**: Trainee, Supervisor, General Manager.
- **Trainee**: melihat status kompetensi, nilai akhir, rincian skor per kategori,
  feedback otomatis, dan riwayat penilaian miliknya sendiri.
- **Supervisor**: mengisi form penilaian berbasis rubrik (20 indikator, skor 1–4
  dengan deskriptor), melihat & mengedit riwayat penilaian trainee bimbingannya.
- **General Manager**: memantau statistik kompetensi seluruh trainee, memfilter &
  mencari data, melihat detail tiap trainee, serta dapat **mengoreksi/mengubah skor**
  penilaian bila diperlukan.
- **Status kompetensi otomatis** (4 tingkat): Belum Kompeten, Cukup Kompeten,
  Kompeten, Sangat Kompeten — dihitung dari Nilai Akhir = (Jumlah Skor ÷ 80) × 100.
- **Feedback otomatis** berbasis skor, termasuk penyorotan kategori
  (Hard/Soft/Technical Skill) yang paling lemah.
- **Ekspor PDF** lembar rekapitulasi skor per trainee.
- **Ilustrasi table set-up beranimasi** pada halaman login sebagai elemen visual
  khas hospitality.

## Catatan

Ini adalah **mockup/prototipe front-end**. Data disimpan di browser (localStorage),
bukan di server sungguhan — cocok untuk demo, review desain, atau dasar pengembangan
lebih lanjut dengan backend nyata (mis. autentikasi asli, database, dsb).
