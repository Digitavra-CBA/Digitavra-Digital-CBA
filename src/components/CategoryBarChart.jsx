import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function CategoryBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ece4d3" vertical={false} />
        <XAxis
          dataKey="category"
          tick={{ fill: "#5a6b78", fontSize: 12 }}
          axisLine={{ stroke: "#ddd0b3" }}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: "#5a6b78", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          cursor={{ fill: "rgba(169,130,61,0.08)" }}
          formatter={(value) => [`${value}%`, "Pencapaian"]}
          contentStyle={{
            borderRadius: 10,
            border: "1px solid #ece4d3",
            fontSize: 13,
          }}
        />
        <Bar dataKey="percent" fill="#a9823d" radius={[6, 6, 0, 0]} maxBarSize={56} />
      </BarChart>
    </ResponsiveContainer>
  );
}
