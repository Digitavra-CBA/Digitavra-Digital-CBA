import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageShell from "../../components/PageShell";
import AssessmentSummary from "../../components/AssessmentSummary";
import AssessmentForm from "../../components/AssessmentForm";
import { useAuth } from "../../context/AuthContext";
import { fetchUsers, fetchAssessmentsForTrainee, upsertAssessmentRemote } from "../../lib/supabaseData";
import { nextAssessmentId } from "../../lib/storage";
import { exportAssessmentPdf } from "../../lib/pdfExport";
import { ArrowLeft, Pencil, CheckCircle2 } from "lucide-react";

export default function GMTraineeDetail() {
  const { traineeId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [users, setUsers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [u, a] = await Promise.all([fetchUsers(), fetchAssessmentsForTrainee(traineeId)]);
      setUsers(u);
      setAssessments(a);
    } catch (err) {
      setError(err.message || "Gagal memuat data dari Supabase.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traineeId]);

  const trainee = users.find((u) => u.id === traineeId);
  const latest = assessments[0]; // fetchAssessmentsForTrainee sudah urut terbaru duluan
  const supervisor = users.find((u) => u.id === latest?.supervisorId);

  async function handleSubmit(payload) {
    const id = latest ? latest.id : nextAssessmentId();
    try {
      await upsertAssessmentRemote({
        id,
        traineeId,
        supervisorId: latest?.supervisorId || null,
        lastEditedBy: user.id,
        ...payload,
      });
      await loadData();
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message || "Gagal menyimpan penilaian.");
    }
  }

  if (loading) {
    return (
      <PageShell title="Memuat..." subtitle="Mengambil data trainee">
        <p className="text-sm text-ink-500">Memuat data dari Supabase...</p>
      </PageShell>
    );
  }

  if (!trainee) {
    return (
      <PageShell title="Trainee tidak ditemukan">
        <button onClick={() => navigate("/gm/monitoring")} className="text-sm text-brass-600 hover:underline">
          Kembali ke monitoring
        </button>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={trainee.name}
      subtitle={`${trainee.department} · Periode ${trainee.period}`}
      actions={
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/gm/monitoring")}
            className="flex items-center gap-2 rounded-lg border border-linen-300 bg-white px-3.5 py-2 text-sm text-ink-700 hover:border-brass-400 focus-ring"
          >
            <ArrowLeft size={15} />
            Kembali
          </button>
          <button
            onClick={() => setEditing((v) => !v)}
            className="flex items-center gap-2 rounded-lg bg-ink-900 px-3.5 py-2 text-sm font-medium text-linen-50 hover:bg-ink-800 focus-ring"
          >
            <Pencil size={15} />
            {editing ? "Batal Edit" : "Edit Penilaian"}
          </button>
        </div>
      }
    >
      {error && (
        <div className="mb-6 rounded-lg bg-status-belum-soft px-4 py-3 text-sm text-status-belum">
          {error}
        </div>
      )}

      {saved && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-status-kompeten-soft px-4 py-3 text-sm text-status-kompeten">
          <CheckCircle2 size={16} />
          Perubahan skor berhasil disimpan oleh General Manager.
        </div>
      )}

      {editing ? (
        <AssessmentForm
          trainee={trainee}
          penilai={supervisor || user}
          initial={latest}
          onSubmit={handleSubmit}
          submitLabel="Simpan Perubahan"
        />
      ) : (
        <AssessmentSummary
          assessment={latest}
          trainee={trainee}
          onExportPdf={latest ? () => exportAssessmentPdf(latest, trainee, supervisor) : undefined}
          showRubricDetail={showDetail}
          onToggleRubricDetail={() => setShowDetail((v) => !v)}
        />
      )}
    </PageShell>
  );
}
