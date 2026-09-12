import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageShell from "../../components/PageShell";
import AssessmentForm from "../../components/AssessmentForm";
import { useAuth } from "../../context/AuthContext";
import { USERS } from "../../lib/mockData";
import { loadAssessments, nextAssessmentId, upsertAssessment } from "../../lib/storage";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function SupervisorAssessment() {
  const { traineeId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const trainee = USERS.find((u) => u.id === traineeId);
  const assessments = loadAssessments();
  const existing = useMemo(
    () =>
      assessments
        .filter((a) => a.traineeId === traineeId)
        .sort((a, b) => (a.date < b.date ? 1 : -1))[0],
    [traineeId] // eslint-disable-line react-hooks/exhaustive-deps
  );

  function handleSubmit(payload) {
    const list = loadAssessments();
    const id = existing && existing.status === "draft" ? existing.id : nextAssessmentId(list);
    upsertAssessment({
      id,
      traineeId,
      supervisorId: user.id,
      ...payload,
    });
    setSaved(true);
    setTimeout(() => navigate("/supervisor"), 1000);
  }

  if (!trainee) {
    return (
      <PageShell title="Trainee tidak ditemukan">
        <button onClick={() => navigate("/supervisor")} className="text-sm text-brass-600 hover:underline">
          Kembali ke daftar trainee
        </button>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={`Penilaian: ${trainee.name}`}
      subtitle="Isi rubrik penilaian sesuai unjuk kerja yang diamati langsung."
      actions={
        <button
          onClick={() => navigate("/supervisor")}
          className="flex items-center gap-2 rounded-lg border border-linen-300 bg-white px-3.5 py-2 text-sm text-ink-700 hover:border-brass-400 focus-ring"
        >
          <ArrowLeft size={15} />
          Kembali
        </button>
      }
    >
      {saved && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-status-kompeten-soft px-4 py-3 text-sm text-status-kompeten">
          <CheckCircle2 size={16} />
          Penilaian berhasil disimpan.
        </div>
      )}
      <AssessmentForm trainee={trainee} penilai={user} initial={existing} onSubmit={handleSubmit} />
    </PageShell>
  );
}
