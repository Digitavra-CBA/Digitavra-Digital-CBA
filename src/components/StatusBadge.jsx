// ini statusbadge
const STYLES = {
  sangat: "bg-status-sangat-soft text-status-sangat border-status-sangat/30",
  kompeten: "bg-status-kompeten-soft text-status-kompeten border-status-kompeten/30",
  cukup: "bg-status-cukup-soft text-status-cukup border-status-cukup/30",
  belum: "bg-status-belum-soft text-status-belum border-status-belum/30",
};

const DOT = {
  sangat: "bg-status-sangat",
  kompeten: "bg-status-kompeten",
  cukup: "bg-status-cukup",
  belum: "bg-status-belum",
};

export default function StatusBadge({ status, size = "md" }) {
  if (!status) return null;
  const pad = size === "lg" ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border font-medium tracking-wide ${pad} ${STYLES[status.color]}`}
    >
      <span className={`h-2 w-2 rounded-full ${DOT[status.color]}`} />
      {status.label}
    </span>
  );
}
