import { useEffect, useState } from "react";
import PageShell from "../../components/PageShell";
import AssessmentSummary from "../../components/AssessmentSummary";
import { useAuth } from "../../context/AuthContext";
import { fetchAssessmentsForTrainee, fetchUsers } from "../../lib/supabaseData";
import { generateFeedback } from "../../lib/scoring";
import { periodLabel } from "../../lib/months";
import StatusBadge from "../../components/StatusBadge";
import { exportAssessmentPdf } from "../../lib/pdfExport";

export default function TraineeDashboard() {
  const { user } = useAuth();
  const [showDetail, setShowDetail] = useState(false);

  const [assessments, setAssessments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [a, u] = await Promise.all([
          fetchAssessmentsForTrainee(user.id),
          fetchUsers(),
        ]);
        if (!cancelled) {
          setAssessments(a);
          setUsers(u);
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
  }, [user.id]);

  const latest = assessments[0];
  const supervisor = users.find((u) => u.id === latest?.supervisorId);

  if (loading) {
    return (
      <PageShell title={`Halo, ${user.name.split(" ")[0]}`} subtitle="Memuat data...">
        <p className="text-sm text-ink-500">Memuat data dari Supabase...</p>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell title={`Halo, ${user.name.split(" ")[0]}`} subtitle="Terjadi kesalahan">
        <p className="text-sm text-status-belum">{error}</p>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={`Halo, ${user.name.split(" ")[0]}`}
      subtitle={`${user.department} · Periode ${user.period}`}
    >
      <div className="space-y-8">
        <AssessmentSummary
          assessment={latest}
          trainee={user}
          onExportPdf={latest ? () => exportAssessmentPdf(latest, user, supervisor) : undefined}
          showRubricDetail={showDetail}
          onToggleRubricDetail={() => setShowDetail((v) => !v)}
        />

        <div className="rounded-2xl border border-linen-300 bg-white p-6">
          <p className="mb-4 font-display text-lg text-ink-900">Riwayat Penilaian</p>
          {assessments.length === 0 ? (
            <p className="text-sm text-ink-500">Belum ada riwayat penilaian.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-linen-200 text-xs uppercase tracking-wide text-ink-500">
                  <th className="py-2 font-medium">Penilaian Terakhir</th>
                  <th className="py-2 font-medium">Penilai</th>
                  <th className="py-2 font-medium">Nilai Akhir</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((a) => {
                  const penilai = users.find((u) => u.id === a.supervisorId);
                  const { status, nilai } = generateFeedback(a.scores);
                  return (
                    <tr key={a.id} className="border-b border-linen-100 last:border-none">
                      <td className="py-3 text-ink-900">{periodLabel(a)}</td>
                      <td className="py-3 text-ink-700">{penilai?.name || "-"}</td>
                      <td className="py-3 text-ink-900">{nilai}</td>
                      <td className="py-3">
                        <StatusBadge status={status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </PageShell>
  );
}
