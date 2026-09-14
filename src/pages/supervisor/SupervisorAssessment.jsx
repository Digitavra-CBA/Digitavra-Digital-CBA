import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageShell from "../../components/PageShell";
import AssessmentForm from "../../components/AssessmentForm";
import { useAuth } from "../../context/AuthContext";
import { fetchUserById, fetchAssessmentsForTrainee, upsertAssessmentRemote } from "../../lib/supabaseData";
import { nextAssessmentId } from "../../lib/storage";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function SupervisorAssessment() {
  const { traineeId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const [trainee, setTrainee] = useState(null);
  const [existing, setExisting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [t, assessments] = await Promise.all([
          fetchUserById(traineeId),
          fetchAssessmentsForTrainee(traineeId),
        ]);
        if (!cancelled) {
          setTrainee(t);
          setExisting(assessments[0] || null);
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
  }, [traineeId]);

  async function handleSubmit(payload) {
    const id = existing && existing.status === "draft" ? existing.id : nextAssessmentId();
    try {
      await upsertAssessmentRemote({
        id,
        traineeId,
        supervisorId: user.id,
        ...payload,
      });
      setSaved(true);
      setTimeout(() => navigate("/supervisor"), 1000);
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
      {error && (
        <div className="mb-6 rounded-lg bg-status-belum-soft px-4 py-3 text-sm text-status-belum">
          {error}
        </div>
      )}
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
