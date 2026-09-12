import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/PageShell";
import StatusBadge from "../../components/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { USERS } from "../../lib/mockData";
import { loadAssessments } from "../../lib/storage";
import { generateFeedback } from "../../lib/scoring";
import { periodLabel } from "../../lib/months";

export default function SupervisorHistory() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [traineeFilter, setTraineeFilter] = useState("all");

  const myTrainees = USERS.filter((u) => u.role === "trainee" && u.supervisorId === user.id);

  const rows = useMemo(() => {
    return loadAssessments()
      .filter((a) => a.supervisorId === user.id)
      .filter((a) => traineeFilter === "all" || a.traineeId === traineeFilter)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [user.id, traineeFilter]);

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
                const trainee = USERS.find((u) => u.id === a.traineeId);
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