import { supabase } from "./supabaseClient";

// ---- mapping helpers: DB pakai snake_case, kode React pakai camelCase ----

function mapUserRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    password: row.password,
    role: row.role,
    name: row.name,
    department: row.department,
    period: row.period,
    position: row.position,
    supervisorId: row.supervisor_id,
  };
}

function mapAssessmentRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    traineeId: row.trainee_id,
    supervisorId: row.supervisor_id,
    lastEditedBy: row.last_edited_by,
    periodeMulai: row.periode_mulai,
    periodeSelesai: row.periode_selesai,
    date: row.date,
    scores: row.scores || {},
    notes: row.notes || {},
    status: row.status,
  };
}

function toAssessmentRow(assessment) {
  return {
    id: assessment.id,
    trainee_id: assessment.traineeId,
    supervisor_id: assessment.supervisorId || null,
    last_edited_by: assessment.lastEditedBy || null,
    periode_mulai: assessment.periodeMulai || null,
    periode_selesai: assessment.periodeSelesai || null,
    date: assessment.date || null,
    scores: assessment.scores || {},
    notes: assessment.notes || {},
    status: assessment.status || "draft",
  };
}

// ---- Users ----

export async function fetchUsers() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return (data || []).map(mapUserRow);
}

export async function fetchUserById(id) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return mapUserRow(data);
}

export async function fetchUserByUsername(username) {
  // ilike = pencarian case-insensitive, setara .toLowerCase() di versi lama
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .ilike("username", username)
    .maybeSingle();
  if (error) throw error;
  return mapUserRow(data);
}

// ---- Assessments ----

export async function fetchAssessments() {
  const { data, error } = await supabase
    .from("assessments")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapAssessmentRow);
}

export async function fetchAssessmentsForTrainee(traineeId) {
  const { data, error } = await supabase
    .from("assessments")
    .select("*")
    .eq("trainee_id", traineeId)
    .order("date", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapAssessmentRow);
}

export async function upsertAssessmentRemote(assessment) {
  const row = toAssessmentRow(assessment);
  const { data, error } = await supabase
    .from("assessments")
    .upsert(row)
    .select()
    .single();
  if (error) throw error;
  return mapAssessmentRow(data);
}