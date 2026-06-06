import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/geoshield/TopNav";
import { StatCard } from "@/components/geoshield/StatCard";
import { EmergingClustersTable } from "@/components/geoshield/EmergingClustersTable";
import { Sparkles, Radar, AlertTriangle, Brain } from "lucide-react";
import { CLUSTERS } from "@/lib/geoshield-data";
import { motion } from "framer-motion";

export const Route = createFileRoute("/emerging-threats")({
  head: () => ({
    meta: [
      { title: "Emerging Threat Monitor — GeoShield Bengaluru" },
      { name: "description", content: "AI-detected unknown disease clusters and emerging pathogens across Bengaluru." },
    ],
  }),
  component: EmergingPage,
});

function EmergingPage() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
        <section className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-10">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-neon-purple/25 blur-3xl" />
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-mono text-neon-purple mb-3">
              <Radar className="h-3.5 w-3.5" /> Emerging Threat Monitor · Live
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight">
              Watching for the <span className="text-gradient">next unknown.</span>
            </h1>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Our anomaly engine continuously scans symptom clusters across hospitals. When unusual
              combinations spike across multiple locations, we flag them — before they have a name.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Active clusters" value={CLUSTERS.length} delta="2 critical / 1 escalated" trend="up" icon={Sparkles} accent="purple" />
          <StatCard label="Symptom signals scanned" value="48,219" delta="last 24h" trend="up" icon={Radar} accent="teal" />
          <StatCard label="AI confidence (avg)" value="86.4%" delta="across detections" trend="flat" icon={Brain} accent="blue" />
          <StatCard label="Public health alerts issued" value="7" delta="this week" trend="up" icon={AlertTriangle} accent="amber" />
        </div>

        <EmergingClustersTable />

        <div className="grid md:grid-cols-2 gap-6">
          {CLUSTERS.slice(0, 2).map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 border border-neon-purple/30"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-neon-purple font-mono">Cluster {c.id}</div>
                  <h3 className="font-display text-xl font-semibold mt-1">{c.area}</h3>
                </div>
                <span className="rounded-full bg-neon-purple/15 text-neon-purple border border-neon-purple/30 text-[10px] font-semibold px-2 py-0.5">
                  {c.severity}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <Tile label="Cases" value={c.cases.toString()} />
                <Tile label="Growth" value={`+${c.growth}%`} />
                <Tile label="Status" value={c.status} small />
              </div>
              <div className="mt-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Symptom cluster</div>
                <div className="flex flex-wrap gap-1.5">
                  {c.symptoms.map((s) => (
                    <span key={s} className="rounded-md bg-neon-purple/10 border border-neon-purple/20 text-foreground/90 px-2 py-0.5 text-xs">{s}</span>
                  ))}
                </div>
              </div>
              <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-neon-purple to-neon-blue text-background font-semibold py-2 text-sm hover:opacity-90 transition">
                Open Investigation
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

function Tile({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="rounded-lg bg-background/40 border border-border/40 p-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`font-display font-semibold ${small ? "text-sm" : "text-lg"}`}>{value}</div>
    </div>
  );
}
