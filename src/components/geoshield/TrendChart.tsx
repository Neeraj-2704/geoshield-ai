import { CITY_TREND, DISEASE_SPLIT } from "@/lib/geoshield-data";
import {
  AreaChart, Area as RArea, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";

export function CityTrendChart() {
  return (
    <div className="glass rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-lg font-semibold">City-wide Disease Trends</h3>
          <p className="text-xs text-muted-foreground">14-day moving window · AI-forecasted</p>
        </div>
        <div className="hidden sm:flex gap-3 text-[10px] font-mono">
          {[
            { c: "oklch(0.7 0.22 30)", l: "Dengue" },
            { c: "oklch(0.72 0.18 230)", l: "H1N1" },
            { c: "oklch(0.78 0.18 190)", l: "Chikungunya" },
            { c: "oklch(0.7 0.24 305)", l: "Emerging" },
          ].map((x) => (
            <div key={x.l} className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full" style={{ background: x.c }} /> {x.l}
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={CITY_TREND}>
          <defs>
            {[
              ["dengue", "oklch(0.7 0.22 30)"],
              ["flu", "oklch(0.72 0.18 230)"],
              ["chikungunya", "oklch(0.78 0.18 190)"],
              ["emerging", "oklch(0.7 0.24 305)"],
            ].map(([k, c]) => (
              <linearGradient key={k} id={`g-${k}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c} stopOpacity={0.55} />
                <stop offset="100%" stopColor={c} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "oklch(0.7 0.03 250)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "oklch(0.7 0.03 250)" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "oklch(0.2 0.04 255)", border: "1px solid oklch(0.4 0.05 255)", borderRadius: 10 }} />
          <RArea type="monotone" dataKey="dengue" stroke="oklch(0.7 0.22 30)" strokeWidth={2} fill="url(#g-dengue)" />
          <RArea type="monotone" dataKey="flu" stroke="oklch(0.72 0.18 230)" strokeWidth={2} fill="url(#g-flu)" />
          <RArea type="monotone" dataKey="chikungunya" stroke="oklch(0.78 0.18 190)" strokeWidth={2} fill="url(#g-chikungunya)" />
          <RArea type="monotone" dataKey="emerging" stroke="oklch(0.7 0.24 305)" strokeWidth={2.5} fill="url(#g-emerging)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DiseaseSplitChart() {
  return (
    <div className="glass rounded-2xl p-4 sm:p-6">
      <div className="mb-2">
        <h3 className="font-display text-lg font-semibold">Active Case Distribution</h3>
        <p className="text-xs text-muted-foreground">Across all reporting hospitals</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={DISEASE_SPLIT} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3} stroke="oklch(0.16 0.03 250)" strokeWidth={2}>
            {DISEASE_SPLIT.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "oklch(0.2 0.04 255)", border: "1px solid oklch(0.4 0.05 255)", borderRadius: 10 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
