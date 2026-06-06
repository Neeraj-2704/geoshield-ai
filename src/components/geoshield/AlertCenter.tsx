import { ALERTS } from "@/lib/geoshield-data";
import { Bell, Siren, Sparkles, Info } from "lucide-react";
import { motion } from "framer-motion";

const ICONS = {
  outbreak: { Icon: Siren, color: "text-neon-red", bg: "bg-neon-red/15", border: "border-neon-red/30" },
  emerging: { Icon: Sparkles, color: "text-neon-purple", bg: "bg-neon-purple/15", border: "border-neon-purple/30" },
  advisory: { Icon: Info, color: "text-neon-teal", bg: "bg-neon-teal/15", border: "border-neon-teal/30" },
};

export function AlertCenter() {
  return (
    <div className="glass rounded-2xl p-4 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5 text-neon-amber" />
          Real-Time Alert Center
        </h3>
        <span className="rounded-full bg-neon-red/15 text-neon-red text-[10px] font-mono px-2 py-0.5 border border-neon-red/30">
          {ALERTS.length} live
        </span>
      </div>
      <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
        {ALERTS.map((a, i) => {
          const { Icon, color, bg, border } = ICONS[a.level];
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-xl ${bg} ${border} border p-3 hover:translate-x-0.5 transition`}
            >
              <div className="flex items-start gap-3">
                <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-background/40 ${color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold truncate">{a.title}</h4>
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">{a.time}</span>
                  </div>
                  <div className={`text-[10px] uppercase tracking-wider ${color} font-semibold mt-0.5`}>{a.area}</div>
                  <p className="text-xs text-foreground/80 mt-1 leading-relaxed">{a.detail}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
