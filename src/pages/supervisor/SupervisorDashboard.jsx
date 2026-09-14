import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/PageShell";
import StatusBadge from "../../components/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { fetchUsers, fetchAssessments } from "../../lib/supabaseData";
import { generateFeedback } from "../../lib/scoring";
import { periodLabel } from "../../lib/months";
import { ClipboardPen } from "lucide-react";

export default function SupervisorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

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
        const [usersData, assessmentsData] = await Promise.all([
          fetchUsers(),
          fetchAssessments(),
        ]);
        if (!cancelled) {
          setUsers(usersData);
          setAssessments(assessmentsData);
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

  const myTrainees = useMemo(
    () => users.filter((u) => u.role === "trainee" && u.supervisorId === user.id),
    [users, user.id]
  );

  function latestFor(traineeId) {
    return assessments
      .filter((a) => a.traineeId === traineeId)
      .sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  }

  if (loading) {
    return (
      <PageShell title="Trainee Bimbingan" subtitle="Memuat data...">
        <p className="text-sm text-ink-500">Memuat data dari Supabase...</p>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell title="Trainee Bimbingan" subtitle="Terjadi kesalahan">
        <p className="text-sm text-status-belum">{error}</p>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Trainee Bimbingan"
      subtitle={`${myTrainees.length} trainee dalam bimbingan Anda`}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {myTrainees.map((t) => {
          const latest = latestFor(t.id);
          const feedback = latest ? generateFeedback(latest.scores) : null;
          return (
            <div key={t.id} className="rounded-2xl border border-linen-300 bg-white p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg text-ink-900">{t.name}</p>
                  <p className="text-xs text-ink-500">{t.department}</p>
                </div>
                {feedback && <StatusBadge status={feedback.status} />}
              </div>

              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-500">Nilai terakhir</dt>
                  <dd className="text-ink-900">{feedback ? feedback.nilai : "Belum dinilai"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-500">Penilaian Terakhir</dt>
                  <dd className="text-ink-900">{latest ? periodLabel(latest) : "-"}</dd>
                </div>
              </dl>

              <button
                onClick={() => navigate(`/supervisor/nilai/${t.id}`)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-medium text-linen-50 transition-colors hover:bg-ink-800 focus-ring"
              >
                <ClipboardPen size={15} />
                Nilai Sekarang
              </button>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
