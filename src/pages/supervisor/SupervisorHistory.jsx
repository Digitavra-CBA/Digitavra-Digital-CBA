import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/PageShell";
import StatusBadge from "../../components/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { fetchUsers, fetchAssessments } from "../../lib/supabaseData";
import { generateFeedback } from "../../lib/scoring";
import { periodLabel } from "../../lib/months";

export default function SupervisorHistory() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [traineeFilter, setTraineeFilter] = useState("all");

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

  const myTrainees = useMemo(
    () => users.filter((u) => u.role === "trainee" && u.supervisorId === user.id),
    [users, user.id]
  );

  const rows = useMemo(() => {
    return assessments
      .filter((a) => a.supervisorId === user.id)
      .filter((a) => traineeFilter === "all" || a.traineeId === traineeFilter)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [assessments, user.id, traineeFilter]);

  if (loading) {
    return (
      <PageShell title="Riwayat Penilaian" subtitle="Memuat data...">
        <p className="text-sm text-ink-500">Memuat data dari Supabase...</p>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell title="Riwayat Penilaian" subtitle="Terjadi kesalahan">
        <p className="text-sm text-status-belum">{error}</p>
      </PageShell>
    );
  }

  return (
    <PageShell title="Riwayat Penilaian" subtitle="Penilaian yang pernah Anda buat">
      <div className="mb-5 flex items-center gap-3">
        <label className="text-sm text-ink-500">Filter trainee:</label>
        <select
          value={traineeFilter}
          onChange={(e) => setTraineeFilter(e.target.value)}
          className="rounded-lg border border-linen-300 bg-white px-3 py-1.5 text-sm text-ink-900 outline-none focus-ring"
        >
          <option value="all">Semua trainee</option>
          {myTrainees.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-linen-300 bg-white p-6">
        {rows.length === 0 ? (
          <p className="text-sm text-ink-500">Belum ada penilaian.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-linen-200 text-xs uppercase tracking-wide text-ink-500">
                <th className="py-2 font-medium">Trainee</th>
                <th className="py-2 font-medium">Penilaian Terakhir</th>
                <th className="py-2 font-medium">Nilai Akhir</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => {
                const trainee = users.find((u) => u.id === a.traineeId);
                const { status, nilai } = generateFeedback(a.scores);
                return (
                  <tr key={a.id} className="border-b border-linen-100 last:border-none">
                    <td className="py-3 text-ink-900">{trainee?.name}</td>
                    <td className="py-3 text-ink-700">{periodLabel(a)}</td>
                    <td className="py-3 text-ink-900">{nilai}</td>
                    <td className="py-3">
                      <StatusBadge status={status} />
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => navigate(`/supervisor/nilai/${a.traineeId}`)}
                        className="text-xs font-medium text-brass-600 hover:underline focus-ring"
                      >
                        Lihat / Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </PageShell>
  );
}
