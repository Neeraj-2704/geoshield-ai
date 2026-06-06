import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  label: string;
  value: string | number;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon: LucideIcon;
  accent?: "blue" | "teal" | "green" | "purple" | "amber" | "red";
}

const accentMap = {
  blue: "from-neon-blue/30 to-neon-blue/0 text-neon-blue",
  teal: "from-neon-teal/30 to-neon-teal/0 text-neon-teal",
  green: "from-neon-green/30 to-neon-green/0 text-neon-green",
  purple: "from-neon-purple/30 to-neon-purple/0 text-neon-purple",
  amber: "from-neon-amber/30 to-neon-amber/0 text-neon-amber",
  red: "from-neon-red/30 to-neon-red/0 text-neon-red",
};

export function StatCard({ label, value, delta, trend, icon: Icon, accent = "blue" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="glass rounded-xl p-4 relative overflow-hidden group"
    >
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br blur-2xl opacity-60 ${accentMap[accent]}`} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
          <div className="mt-1 font-display text-2xl font-semibold">{value}</div>
          {delta && (
            <div className={`mt-1 text-xs font-mono ${
              trend === "up" ? "text-neon-red" : trend === "down" ? "text-neon-green" : "text-muted-foreground"
            }`}>
              {trend === "up" ? "▲" : trend === "down" ? "▼" : "•"} {delta}
            </div>
          )}
        </div>
        <div className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${accentMap[accent]}`}>
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
    </motion.div>
  );
}
