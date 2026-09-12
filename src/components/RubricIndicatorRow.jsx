//ini rubric indicator
import { useState } from "react";
import { Info } from "lucide-react";

export default function RubricIndicatorRow({ indicator, value, onChange, readOnly = false }) {
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <div className="border-b border-linen-200 py-4 last:border-none">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <button
            type="button"
            onClick={() => setOpenInfo((v) => !v)}
            className="mt-0.5 text-ink-500 transition-colors hover:text-brass-600 focus-ring"
            aria-label={`Lihat deskriptor untuk ${indicator.name}`}
          >
            <Info size={16} />
          </button>
          <p className="text-sm font-medium text-ink-900">{indicator.name}</p>
        </div>

        <div className="flex items-center gap-1.5" role="radiogroup" aria-label={indicator.name}>
          {[1, 2, 3, 4].map((score) => (
            <button
              key={score}
              type="button"
              disabled={readOnly}
              role="radio"
              aria-checked={value === score}
              onClick={() => onChange(score)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors focus-ring ${
                value === score
                  ? "border-brass-500 bg-brass-500 text-white"
                  : "border-linen-300 bg-white text-ink-700 hover:border-brass-400"
              } ${readOnly ? "cursor-not-allowed opacity-60" : ""}`}
            >
              {score}
            </button>
          ))}
        </div>
      </div>

      {openInfo && (
        <div className="mt-3 grid gap-2 rounded-lg border border-linen-200 bg-linen-50 p-3 text-xs text-ink-700 sm:grid-cols-2">
          {[4, 3, 2, 1].map((s) => (
            <div key={s} className="flex gap-2">
              <span className="font-semibold text-brass-600">Skor {s}</span>
              <span>{indicator.descriptors[s]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
