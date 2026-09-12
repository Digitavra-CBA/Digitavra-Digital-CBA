import { useParams } from "react-router-dom";
import PageShell from "../../components/PageShell";
import { GUIDE_CONTENT } from "../../lib/guideContent";
import { useAuth } from "../../context/AuthContext";
import { Info } from "lucide-react";

export default function GuidePage() {
  const { user } = useAuth();
  const { role: roleParam } = useParams();
  const role = roleParam || user?.role;
  const content = GUIDE_CONTENT[role];

  if (!content) return null;

  return (
    <PageShell title={content.title} subtitle={content.intro}>
      <div className="space-y-4">
        {content.sections.map((s) => (
          <div key={s.heading} className="rounded-2xl border border-linen-300 bg-white p-6">
            <p className="mb-2 font-display text-lg text-ink-900">{s.heading}</p>
            <p className="text-sm leading-relaxed text-ink-700">{s.body}</p>
          </div>
        ))}

        {content.note && (
          <div className="flex items-start gap-3 rounded-2xl border border-brass-400/40 bg-linen-50 p-5">
            <Info size={18} className="mt-0.5 shrink-0 text-brass-600" />
            <p className="text-sm text-ink-700">{content.note}</p>
          </div>
        )}
      </div>
    </PageShell>
  );
}