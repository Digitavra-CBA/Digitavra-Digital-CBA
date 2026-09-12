import StatusBadge from "./StatusBadge";
import CategoryBarChart from "./CategoryBarChart";
import { categoryBreakdown, generateFeedback } from "../lib/scoring";
import { ALL_INDICATORS } from "../lib/rubric";
import { periodStartLabel, periodEndLabel } from "../lib/months";
import { Download, ClipboardCheck } from "lucide-react";

export default function AssessmentSummary({ assessment, trainee, onExportPdf, showRubricDetail, onToggleRubricDetail }) {
  if (!assessment) {
    return (
      <div className="rounded-2xl border border-dashed border-linen-300 bg-linen-50 p-10 text-center">
        <ClipboardCheck className="mx-auto mb-3 text-ink-300" size={28} />
        <p className="text-sm text-ink-500">Belum ada penilaian yang tercatat untuk trainee ini.</p>
      </div>
    );
  }

  const { opening, focus, followUp, status, nilai } = generateFeedback(assessment.scores);
  const breakdown = categoryBreakdown(assessment.scores);

  return (
    <div className="space-y-6">
      {/* Kartu status & skor */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-linen-300 bg-white p-6 md:col-span-1">
          <p className="text-xs uppercase tracking-wide text-ink-500">Status Kompetensi</p>
          <div className="mt-3">
            <StatusBadge status={status} size="lg" />
          </div>
          <p className="mt-4 text-xs text-ink-500">{status.keterangan}</p>
        </div>

        <div className="rounded-2xl border border-linen-300 bg-white p-6 md:col-span-1">
          <p className="text-xs uppercase tracking-wide text-ink-500">Nilai Akhir</p>
          <p className="mt-2 font-display text-5xl text-ink-900">{nilai}</p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-linen-200">
            <div
              className="h-full rounded-full bg-brass-500"
              style={{ width: `${Math.min(nilai, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-ink-500">dari skala 0–100</p>
        </div>

        <div className="rounded-2xl border border-linen-300 bg-white p-6 md:col-span-1">
          <p className="text-xs uppercase tracking-wide text-ink-500">Detail Penilaian</p>
          <dl className="mt-3 space-y-1.5 text-sm">
            {assessment.periodePkl && (
              <div className="flex justify-between">
                <dt className="text-ink-500">Periode PKL</dt>
                <dd className="text-ink-900">{assessment.periodePkl}</dd>
              </div>
            )}
            {trainee && (
              <div className="flex justify-between">
                <dt className="text-ink-500">Trainee</dt>
                <dd className="text-ink-900">{trainee.name}</dd>
              </div>
            )}
          </dl>
          {onExportPdf && (
            <button
              onClick={onExportPdf}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-linen-300 px-3 py-2 text-xs font-medium text-ink-700 transition-colors hover:border-brass-400 hover:text-brass-600 focus-ring"
            >
              <Download size={14} />
              Unduh Rekap PDF
            </button>
          )}
        </div>
      </div>

      {/* Grafik kategori */}
      <div className="rounded-2xl border border-linen-300 bg-white p-6">
        <p className="mb-1 font-display text-lg text-ink-900">Rincian Skor per Kategori</p>
        <p className="mb-2 text-xs text-ink-500">Hard Skill · Soft Skill · Technical Skill</p>
        <CategoryBarChart data={breakdown} />
      </div>

      {/* Feedback otomatis */}
      <div className="rounded-2xl border border-brass-400/40 bg-linen-50 p-6">
        <p className="mb-3 font-display text-lg text-ink-900">Feedback Sistem</p>
        <div className="space-y-2 text-sm text-ink-700">
          <p>{opening}</p>
          <p>{focus}</p>
          <p className="text-ink-500">{followUp}</p>
        </div>
      </div>

      {/* Detail rubrik */}
      {onToggleRubricDetail && (
        <div className="rounded-2xl border border-linen-300 bg-white p-6">
          <button
            onClick={onToggleRubricDetail}
            className="text-sm font-medium text-brass-600 hover:underline focus-ring"
          >
            {showRubricDetail ? "Sembunyikan detail rubrik" : "Lihat detail rubrik (20 indikator)"}
          </button>
          {showRubricDetail && (
            <div className="mt-4 divide-y divide-linen-200">
              {ALL_INDICATORS.map((ind) => (
                <div key={ind.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="text-ink-900">{ind.name}</p>
                    <p className="text-xs text-ink-500">{ind.category}</p>
                  </div>
                  <span className="rounded-md bg-linen-100 px-2.5 py-1 text-xs font-semibold text-ink-700">
                    {assessment.scores[ind.id] || "-"} / 4
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}