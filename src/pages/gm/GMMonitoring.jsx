import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/PageShell";
import StatusBadge from "../../components/StatusBadge";
import { USERS } from "../../lib/mockData";
import { loadAssessments } from "../../lib/storage";
import { generateFeedback, STATUS_LEVELS } from "../../lib/scoring";
import { periodStartLabel, periodEndLabel } from "../../lib/months";
import { Search } from "lucide-react";

export default function GMMonitoring() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [supervisorFilter, setSupervisorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const trainees = USERS.filter((u) => u.role === "trainee");
  const supervisors = USERS.filter((u) => u.role === "supervisor");
  const assessments = loadAssessments();

  const rows = useMemo(() => {
    return trainees
      .map((t) => {
        const latest = assessments
          .filter((a) => a.traineeId === t.id)
          .sort((a, b) => (a.date < b.date ? 1 : -1))[0];
        const feedback = latest ? generateFeedback(latest.scores) : null;
        const supervisor = USERS.find((u) => u.id === t.supervisorId);
        return { trainee: t, latest, feedback, supervisor };
      })
      .filter((r) => r.trainee.name.toLowerCase().includes(query.toLowerCase()))
      .filter((r) => supervisorFilter === "all" || r.supervisor?.id === supervisorFilter)
      .filter((r) => statusFilter === "all" || r.feedback?.status.key === statusFilter);
  }, [trainees, assessments, query, supervisorFilter, statusFilter]); // eslint-disable-line

  return (
    <PageShell title="Monitoring Trainee" subtitle="Seluruh hasil penilaian trainee pada kompetensi Table Set-Up">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-linen-300 bg-white px-3 py-2">
          <Search size={15} className="text-ink-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama trainee..."
            className="w-48 text-sm text-ink-900 outline-none"
          />
        </div>
        <select
          value={supervisorFilter}
          onChange={(e) => setSupervisorFilter(e.target.value)}
          className="rounded-lg border border-linen-300 bg-white px-3 py-2 text-sm text-ink-900 outline-none focus-ring"
        >
          <option value="all">Semua supervisor</option>
          {supervisors.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-linen-300 bg-white px-3 py-2 text-sm text-ink-900 outline-none focus-ring"
        >
          <option value="all">Semua status</option>
          {STATUS_LEVELS.map((s) => (
            <option key={s.key} value={s.key}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-linen-300 bg-white p-6">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-linen-200 text-xs uppercase tracking-wide text-ink-500">
              <th className="py-2 font-medium">Trainee</th>
              <th className="py-2 font-medium">Supervisor</th>
              <th className="py-2 font-medium">Nilai Akhir</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium">Periode Mulai</th>
              <th className="py-2 font-medium">Periode Selesai</th>
              <th className="py-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ trainee, latest, feedback, supervisor }) => (
              <tr key={trainee.id} className="border-b border-linen-100 last:border-none">
                <td className="py-3 text-ink-900">{trainee.name}</td>
                <td className="py-3 text-ink-700">{supervisor?.name || "-"}</td>
                <td className="py-3 text-ink-900">{feedback ? feedback.nilai : "-"}</td>
                <td className="py-3">
                  {feedback ? <StatusBadge status={feedback.status} /> : (
                    <span className="text-xs text-ink-500">Belum dinilai</span>
                  )}
                </td>
                <td className="py-3 text-ink-700">{latest ? periodStartLabel(latest) : "-"}</td>
                <td className="py-3 text-ink-700">{latest ? periodEndLabel(latest) : "-"}</td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => navigate(`/gm/trainee/${trainee.id}`)}
                    className="text-xs font-medium text-brass-600 hover:underline focus-ring"
                  >
                    Lihat Detail
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-sm text-ink-500">
                  Tidak ada data yang cocok dengan filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}
