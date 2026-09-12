import { useMemo, useState } from "react";
import { RUBRIC, emptyScores } from "../lib/rubric";
import { finalScore, getStatus, totalRawScore } from "../lib/scoring";
import { MONTHS, monthToNumber, numberToMonth, yearOptions, dayOptions } from "../lib/months";
import RubricIndicatorRow from "./RubricIndicatorRow";
import StatusBadge from "./StatusBadge";
import { Save, CheckCircle2 } from "lucide-react";

export default function AssessmentForm({
  trainee,
  penilai,
  initial,
  onSubmit,
  submitLabel = "Submit Penilaian Final",
}) {
  const initialYear = initial?.date ? Number(initial.date.slice(0, 4)) : new Date().getFullYear();
  const initialMonth = initial?.date
    ? numberToMonth(initial.date.slice(5, 7))
    : initial?.shift || "";
  const initialDay = initial?.date ? Number(initial.date.slice(8, 10)) : 1;

  const [tanggal, setTanggal] = useState(initialDay);
  const [bulan, setBulan] = useState(initialMonth);
  const [tahun, setTahun] = useState(initialYear);

  const currentYear = new Date().getFullYear();
  const [bulanMulai, setBulanMulai] = useState(initial?.pklBulanMulai || "");
  const [tahunMulai, setTahunMulai] = useState(initial?.pklTahunMulai || currentYear);
  const [bulanSelesai, setBulanSelesai] = useState(initial?.pklBulanSelesai || "");
  const [tahunSelesai, setTahunSelesai] = useState(initial?.pklTahunSelesai || currentYear);
  const periodePkl =
    bulanMulai && bulanSelesai
      ? `${bulanMulai} ${tahunMulai} – ${bulanSelesai} ${tahunSelesai}`
      : "";

  const [scores, setScores] = useState(initial?.scores || emptyScores());
  const [notes, setNotes] = useState(initial?.notes || { hard: "", soft: "", technical: "" });

  const raw = useMemo(() => totalRawScore(scores), [scores]);
  const nilai = useMemo(() => finalScore(scores), [scores]);
  const status = useMemo(() => getStatus(nilai), [nilai]);

  function setScore(id, value) {
    setScores((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e, asDraft) {
    e.preventDefault();
    onSubmit({
      shift: bulan,
      date: `${tahun}-${monthToNumber(bulan)}-${String(tanggal).padStart(2, "0")}`,
      pklBulanMulai: bulanMulai,
      pklTahunMulai: tahunMulai,
      pklBulanSelesai: bulanSelesai,
      pklTahunSelesai: tahunSelesai,
      periodePkl,
      scores,
      notes,
      status: asDraft ? "draft" : "final",
    });
  }

  return (
    <form className="space-y-6">
      {/* Identitas Penilaian */}
      <div className="rounded-2xl border border-linen-300 bg-white p-6">
        <p className="mb-4 font-display text-lg text-ink-900">Identitas Penilaian</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
              Nama Peserta Trainee
            </label>
            <input
              disabled
              value={trainee?.name || ""}
              className="w-full rounded-lg border border-linen-300 bg-linen-50 px-3.5 py-2.5 text-sm text-ink-700"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
              Nama Penilai
            </label>
            <input
              disabled
              value={penilai?.name || ""}
              className="w-full rounded-lg border border-linen-300 bg-linen-50 px-3.5 py-2.5 text-sm text-ink-700"
            />
          </div>

          <div className="sm:col-span-2 grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
                Tanggal
              </label>
              <select
                value={tanggal}
                onChange={(e) => setTanggal(Number(e.target.value))}
                required
                className="w-full rounded-lg border border-linen-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none focus-ring"
              >
                {dayOptions(bulan, tahun).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
                Bulan
              </label>
              <select
                value={bulan}
                onChange={(e) => setBulan(e.target.value)}
                required
                className="w-full rounded-lg border border-linen-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none focus-ring"
              >
                <option value="" disabled>Pilih bulan</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
                Tahun
              </label>
              <select
                value={tahun}
                onChange={(e) => setTahun(Number(e.target.value))}
                required
                className="w-full rounded-lg border border-linen-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none focus-ring"
              >
                {yearOptions().map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Periode PKL */}
        <div className="mt-6 border-t border-linen-200 pt-5">
          <p className="mb-3 text-sm font-medium text-ink-900">Periode PKL</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
                  Bulan Mulai
                </label>
                <select
                  value={bulanMulai}
                  onChange={(e) => setBulanMulai(e.target.value)}
                  className="w-full rounded-lg border border-linen-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none focus-ring"
                >
                  <option value="">Pilih bulan</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
                  Tahun Mulai
                </label>
                <select
                  value={tahunMulai}
                  onChange={(e) => setTahunMulai(Number(e.target.value))}
                  className="w-full rounded-lg border border-linen-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none focus-ring"
                >
                  {yearOptions().map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
                  Bulan Selesai
                </label>
                <select
                  value={bulanSelesai}
                  onChange={(e) => setBulanSelesai(e.target.value)}
                  className="w-full rounded-lg border border-linen-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none focus-ring"
                >
                  <option value="">Pilih bulan</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
                  Tahun Selesai
                </label>
                <select
                  value={tahunSelesai}
                  onChange={(e) => setTahunSelesai(Number(e.target.value))}
                  className="w-full rounded-lg border border-linen-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none focus-ring"
                >
                  {yearOptions().map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {periodePkl && (
            <p className="mt-3 text-sm text-ink-700">
              Periode PKL: <span className="font-medium text-ink-900">{periodePkl}</span>
            </p>
          )}
        </div>
      </div>

      {/* Rubrik per kategori */}
      {RUBRIC.map((cat) => (
        <div key={cat.key} className="rounded-2xl border border-linen-300 bg-white p-6">
          <p className="mb-1 font-display text-lg text-ink-900">{cat.category}</p>
          <p className="mb-3 text-xs text-ink-500">
            Klik ikon info untuk melihat deskriptor tiap level skor.
          </p>
          <div>
            {cat.indicators.map((ind) => (
              <RubricIndicatorRow
                key={ind.id}
                indicator={ind}
                value={scores[ind.id]}
                onChange={(v) => setScore(ind.id, v)}
              />
            ))}
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
              Catatan Penilai — {cat.category} (opsional)
            </label>
            <textarea
              rows={2}
              value={notes[cat.key] || ""}
              onChange={(e) => setNotes((prev) => ({ ...prev, [cat.key]: e.target.value }))}
              className="w-full rounded-lg border border-linen-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none focus-ring"
              placeholder="Catatan tambahan terkait kategori ini..."
            />
          </div>
        </div>
      ))}

      {/* Ringkasan live */}
      <div className="sticky bottom-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brass-400/40 bg-linen-50 p-5 shadow-lg shadow-ink-900/5">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-500">Total Skor</p>
            <p className="font-display text-2xl text-ink-900">{raw} / 80</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-500">Nilai Akhir</p>
            <p className="font-display text-2xl text-ink-900">{nilai}</p>
          </div>
          <StatusBadge status={status} size="lg" />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            className="flex items-center gap-2 rounded-lg border border-linen-300 bg-white px-4 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:border-brass-400 focus-ring"
          >
            <Save size={15} />
            Simpan Draft
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            className="flex items-center gap-2 rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-medium text-linen-50 transition-colors hover:bg-ink-800 focus-ring"
          >
            <CheckCircle2 size={15} />
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}