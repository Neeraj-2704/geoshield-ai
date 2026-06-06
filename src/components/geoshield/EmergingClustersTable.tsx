import { CLUSTERS } from "@/lib/geoshield-data";
import { Sparkles, Search, Download } from "lucide-react";
import { motion } from "framer-motion";

const severityStyle: Record<string, string> = {
  Low: "bg-neon-green/15 text-neon-green border-neon-green/30",
  Medium: "bg-neon-amber/15 text-neon-amber border-neon-amber/30",
  High: "bg-neon-red/15 text-neon-red border-neon-red/30",
  Critical: "bg-neon-purple/15 text-neon-purple border-neon-purple/30",
};
const statusStyle: Record<string, string> = {
  Investigating: "text-neon-purple",
  Monitoring: "text-neon-teal",
  Escalated: "text-neon-red",
  Contained: "text-neon-green",
};

export function EmergingClustersTable() {
  return (
    <div className="glass rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-neon-purple" />
            Emerging Threat Monitor
          </h3>
          <p className="text-xs text-muted-foreground">Unknown symptom clusters flagged by the AI engine</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              placeholder="Search clusters..."
              className="rounded-lg glass-strong pl-8 pr-3 py-1.5 text-xs w-44 outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary/15 text-primary border border-primary/30 px-3 py-1.5 text-xs hover:bg-primary/25 transition">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border/50">
              <th className="text-left py-2 px-2 font-medium">Cluster ID</th>
              <th className="text-left py-2 px-2 font-medium">Location</th>
              <th className="text-left py-2 px-2 font-medium">Symptom Group</th>
              <th className="text-right py-2 px-2 font-medium">Cases</th>
              <th className="text-right py-2 px-2 font-medium">Growth</th>
              <th className="text-left py-2 px-2 font-medium">Status</th>
              <th className="text-left py-2 px-2 font-medium">Severity</th>
              <th className="text-right py-2 px-2 font-medium">Detected</th>
            </tr>
          </thead>
          <tbody>
            {CLUSTERS.map((c, i) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-border/30 hover:bg-muted/30 transition"
              >
                <td className="py-3 px-2 font-mono text-xs text-neon-teal">{c.id}</td>
                <td className="py-3 px-2">{c.area}</td>
                <td className="py-3 px-2">
                  <div className="flex flex-wrap gap-1">
                    {c.symptoms.map((s) => (
                      <span key={s} className="rounded-md bg-muted/50 px-1.5 py-0.5 text-[10px]">{s}</span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-2 text-right font-mono">{c.cases}</td>
                <td className="py-3 px-2 text-right font-mono text-neon-red">+{c.growth}%</td>
                <td className={`py-3 px-2 font-medium ${statusStyle[c.status]}`}>{c.status}</td>
                <td className="py-3 px-2">
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${severityStyle[c.severity]}`}>
                    {c.severity}
                  </span>
                </td>
                <td className="py-3 px-2 text-right text-xs text-muted-foreground font-mono">{c.detected}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
