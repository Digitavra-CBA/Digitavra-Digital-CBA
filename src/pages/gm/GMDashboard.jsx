import { useEffect, useMemo, useState } from "react";
import PageShell from "../../components/PageShell";
import StatusDistributionChart from "../../components/StatusDistributionChart";
import { fetchUsers, fetchAssessments } from "../../lib/supabaseData";
import { categoryBreakdown, generateFeedback, STATUS_LEVELS } from "../../lib/scoring";
import { RUBRIC } from "../../lib/rubric";

function average(nums) {
  if (nums.length === 0) return 0;
  return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 10) / 10;
}

export default function GMDashboard() {
  const [users, setUsers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [u, a] = await Promise.all([fetchUsers(), fetchAssessments()]);
        if (!cancelled) {
          setUsers(u);
          setAssessments(a);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Gagal memuat data dari Supabase.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const trainees = useMemo(() => users.filter((u) => u.role === "trainee"), [users]);

  const latestPerTrainee = useMemo(() => {
    return trainees
      .map((t) => {
        const list = assessments
          .filter((a) => a.traineeId === t.id)
          .sort((a, b) => (a.date < b.date ? 1 : -1));
        return list[0] ? { trainee: t, assessment: list[0] } : null;
      })
      .filter(Boolean);
  }, [trainees, assessments]);

  const statusCounts = useMemo(() => {
    const counts = {};
    latestPerTrainee.forEach(({ assessment }) => {
      const { status } = generateFeedback(assessment.scores);
      counts[status.key] = (counts[status.key] || 0) + 1;
    });
    return counts;
  }, [latestPerTrainee]);

  const categoryAverages = useMemo(() => {
    return RUBRIC.map((cat) => {
      const percents = latestPerTrainee.map(({ assessment }) => {
        const bd = categoryBreakdown(assessment.scores).find((b) => b.key === cat.key);
        return bd?.percent || 0;
      });
      return { category: cat.category, percent: average(percents) };
    });
  }, [latestPerTrainee]);

  if (loading) {
    return (
      <PageShell title="Ringkasan Kompetensi" subtitle="Memuat data...">
        <p className="text-sm text-ink-500">Memuat data dari Supabase...</p>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell title="Ringkasan Kompetensi" subtitle="Terjadi kesalahan">
        <p className="text-sm text-status-belum">{error}</p>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Ringkasan Kompetensi"
      subtitle={`Memantau ${trainees.length} trainee aktif di seluruh divisi F&B`}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-linen-300 bg-white p-6 lg:col-span-1">
          <p className="mb-1 font-display text-lg text-ink-900">Distribusi Status</p>
          <p className="mb-2 text-xs text-ink-500">Berdasarkan penilaian terakhir tiap trainee</p>
          <StatusDistributionChart counts={statusCounts} />
        </div>

        <div className="rounded-2xl border border-linen-300 bg-white p-6 lg:col-span-2">
          <p className="mb-1 font-display text-lg text-ink-900">Rata-rata Skor per Kategori</p>
          <p className="mb-4 text-xs text-ink-500">Hard Skill · Soft Skill · Technical Skill</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {categoryAverages.map((c) => (
              <div key={c.category} className="rounded-xl border border-linen-200 bg-linen-50 p-4">
                <p className="text-xs text-ink-500">{c.category}</p>
                <p className="mt-1 font-display text-3xl text-ink-900">{c.percent}%</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-linen-200">
                  <div className="h-full rounded-full bg-brass-500" style={{ width: `${c.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {STATUS_LEVELS.map((s) => (
          <div key={s.key} className="rounded-2xl border border-linen-300 bg-white p-5">
            <p className="text-xs text-ink-500">{s.label}</p>
            <p className="mt-1 font-display text-3xl text-ink-900">{statusCounts[s.key] || 0}</p>
            <p className="mt-1 text-xs text-ink-500">trainee</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
