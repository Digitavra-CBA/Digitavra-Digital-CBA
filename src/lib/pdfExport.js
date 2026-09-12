import { jsPDF } from "jspdf";
import { ALL_INDICATORS } from "./rubric";
import { categoryBreakdown, generateFeedback } from "./scoring";
import { periodLabel } from "./months";

export function exportAssessmentPdf(assessment, trainee, penilai) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const { opening, focus, followUp, status, nilai } = generateFeedback(assessment.scores);
  const breakdown = categoryBreakdown(assessment.scores);

  const marginX = 48;
  let y = 56;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Lembar Rekapitulasi Skor — Digital CBA", marginX, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Job Performance Table Set-Up Restaurant · SOP No. 002/F&B/PnP", marginX, y);
  y += 28;

  doc.setFontSize(11);
  const rows = [
    ["Nama Peserta Trainee", trainee?.name || "-"],
    ["Periode", periodLabel(assessment)],
    ["Nama Penilai", penilai?.name || "-"],
    ["Jabatan Penilai", penilai?.position || "-"],
  ];
  rows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}`, marginX, y);
    doc.setFont("helvetica", "normal");
    doc.text(`: ${value}`, marginX + 150, y);
    y += 16;
  });

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`Nilai Akhir: ${nilai}`, marginX, y);
  doc.text(`Status: ${status.label}`, marginX + 220, y);
  y += 22;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  breakdown.forEach((b) => {
    doc.text(`${b.category}: ${b.raw}/${b.max} (${b.percent}%)`, marginX, y);
    y += 14;
  });

  y += 14;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Rincian Indikator", marginX, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  ALL_INDICATORS.forEach((ind) => {
    if (y > 760) {
      doc.addPage();
      y = 56;
    }
    doc.text(`${ind.category} — ${ind.name}`, marginX, y);
    doc.text(`${assessment.scores[ind.id] || 0}/4`, 500, y);
    y += 13;
  });

  y += 14;
  if (y > 700) {
    doc.addPage();
    y = 56;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Feedback Sistem", marginX, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  [opening, focus, followUp].forEach((line) => {
    const wrapped = doc.splitTextToSize(line, 500);
    doc.text(wrapped, marginX, y);
    y += wrapped.length * 12 + 4;
  });

  doc.save(`Rekap-Penilaian-${trainee?.name || "trainee"}-${assessment.date}.pdf`);
}