import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { STATUS_LEVELS } from "../lib/scoring";

const COLOR_HEX = {
  sangat: "#1f5c63",
  kompeten: "#3f6b52",
  cukup: "#a3721c",
  belum: "#a23e34",
};

export default function StatusDistributionChart({ counts }) {
  const data = STATUS_LEVELS.map((s) => ({
    name: s.label,
    value: counts[s.key] || 0,
    key: s.key,
  })).filter((d) => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="flex h-[220px] items-center justify-center text-sm text-ink-500">
        Belum ada data penilaian.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={54} outerRadius={82} paddingAngle={3}>
          {data.map((d) => (
            <Cell key={d.key} fill={COLOR_HEX[d.key]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #ece4d3", fontSize: 13 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
