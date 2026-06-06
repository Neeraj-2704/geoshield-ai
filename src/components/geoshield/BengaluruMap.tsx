import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AREAS, RISK_META, type Area } from "@/lib/geoshield-data";
import { MapPin, AlertTriangle, TrendingUp, Building2, Clock, Sparkles } from "lucide-react";
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip,
} from "recharts";

const RADII = [2, 5, 10] as const;

export function BengaluruMap() {
  const [selected, setSelected] = useState<Area | null>(AREAS[0]);
  const [radius, setRadius] = useState<(typeof RADII)[number]>(5);

  return (
    <div className="glass rounded-2xl p-4 sm:p-6">
      <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-neon-teal" />
            Live Bengaluru Risk Map
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Tap an area to see disease intelligence · GPS-aware nearby alerts
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-full glass-strong p-1">
          {RADII.map((r) => (
            <button
              key={r}
              onClick={() => setRadius(r)}
              className={`rounded-full px-3 py-1 text-xs font-mono transition ${
                radius === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r} km
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* Map */}
        <div className="lg:col-span-3 relative aspect-[4/3] rounded-xl overflow-hidden grid-bg border border-border/40 bg-background/40">
          {/* Faux geographic outline */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <defs>
              <radialGradient id="cityGlow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="oklch(0.72 0.18 220 / 0.18)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill="url(#cityGlow)" />
            <path
              d="M20,30 Q15,55 25,80 Q45,95 70,88 Q92,78 88,50 Q85,22 60,12 Q35,8 20,30 Z"
              fill="oklch(0.22 0.04 255 / 0.5)"
              stroke="oklch(0.72 0.18 220 / 0.35)"
              strokeWidth="0.3"
              strokeDasharray="1 1"
            />
          </svg>

          {AREAS.map((a) => {
            const meta = RISK_META[a.risk];
            const isSelected = selected?.id === a.id;
            return (
              <button
                key={a.id}
                onClick={() => setSelected(a)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${a.x}%`, top: `${a.y}%` }}
                aria-label={a.name}
              >
                {(a.risk === "outbreak" || a.risk === "emerging") && (
                  <span
                    className="absolute inset-0 m-auto h-5 w-5 rounded-full animate-pulse-ring"
                    style={{ background: meta.color }}
                  />
                )}
                <span
                  className="relative block rounded-full border-2 border-background/60 transition-all"
                  style={{
                    width: isSelected ? 22 : 16,
                    height: isSelected ? 22 : 16,
                    background: meta.color,
                    boxShadow: `0 0 16px ${meta.color}`,
                  }}
                />
                <span className={`absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium transition ${
                  isSelected ? "bg-foreground/90 text-background" : "bg-background/70 text-foreground/80 opacity-0 group-hover:opacity-100"
                }`}>
                  {a.name}
                </span>
              </button>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1.5 glass-strong rounded-lg p-2 text-[10px]">
            {(Object.keys(RISK_META) as Array<keyof typeof RISK_META>).map((k) => (
              <div key={k} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: RISK_META[k].color }} />
                <span className="text-muted-foreground">{RISK_META[k].label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="glass-strong rounded-xl p-4 h-full flex flex-col"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Area</div>
                    <h4 className="font-display text-xl font-semibold">{selected.name}</h4>
                    <div className="text-xs text-muted-foreground font-mono">pop. {selected.population}</div>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ background: RISK_META[selected.risk].bg, color: RISK_META[selected.risk].color }}
                  >
                    {RISK_META[selected.risk].label}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <Mini label="Active" value={selected.activeCases} icon={AlertTriangle} />
                  <Mini label="Growth" value={`${selected.growth > 0 ? "+" : ""}${selected.growth}%`} icon={TrendingUp} />
                  <Mini label="Hospitals" value={selected.hospitals} icon={Building2} />
                </div>

                <div className="mt-3 rounded-lg bg-muted/30 p-2.5 text-xs">
                  <div className="text-muted-foreground text-[10px] uppercase tracking-wider">Primary disease</div>
                  <div className="font-medium mt-0.5">{selected.primaryDisease}</div>
                </div>

                {selected.emergingWarning && (
                  <div className="mt-2 rounded-lg border border-neon-purple/40 bg-neon-purple/10 p-2.5 text-xs">
                    <div className="flex items-center gap-1.5 text-neon-purple font-semibold text-[10px] uppercase tracking-wider">
                      <Sparkles className="h-3 w-3" /> Emerging Disease Alert
                    </div>
                    <p className="mt-1 text-foreground/85">{selected.emergingWarning}</p>
                  </div>
                )}

                <div className="mt-3 flex-1 min-h-[100px]">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">7-day forecast</div>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={selected.forecast}>
                      <defs>
                        <linearGradient id="fg" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="oklch(0.78 0.16 190)" />
                          <stop offset="100%" stopColor="oklch(0.7 0.24 305)" />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" tick={{ fontSize: 10, fill: "oklch(0.7 0.03 250)" }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{ background: "oklch(0.2 0.04 255)", border: "1px solid oklch(0.4 0.05 255)", borderRadius: 8, fontSize: 12 }}
                      />
                      <Line type="monotone" dataKey="cases" stroke="url(#fg)" strokeWidth={2.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-2 rounded-lg bg-gradient-to-br from-neon-teal/10 to-transparent border border-neon-teal/20 p-2.5 text-xs">
                  <div className="text-neon-teal text-[10px] uppercase tracking-wider font-semibold">Health recommendation</div>
                  <p className="mt-1 text-foreground/85">{selected.recommendation}</p>
                </div>

                <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Updated 2 min ago</span>
                  <span>radius: {radius} km</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Mini({ label, value, icon: Icon }: { label: string; value: string | number; icon: typeof MapPin }) {
  return (
    <div className="rounded-lg bg-background/40 border border-border/40 p-2">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="font-display text-base font-semibold mt-0.5">{value}</div>
    </div>
  );
}
