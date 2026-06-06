import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/geoshield/TopNav";
import { StatCard } from "@/components/geoshield/StatCard";
import { BengaluruMap } from "@/components/geoshield/BengaluruMap";
import { CityTrendChart, DiseaseSplitChart } from "@/components/geoshield/TrendChart";
import { EmergingClustersTable } from "@/components/geoshield/EmergingClustersTable";
import { AlertCenter } from "@/components/geoshield/AlertCenter";
import { Activity, Hospital, Users, Sparkles, ShieldAlert, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/government")({
  head: () => ({
    meta: [
      { title: "Government Command Center — GeoShield Bengaluru" },
      { name: "description", content: "City-wide outbreak monitoring, predictive analytics and emergency response coordination." },
    ],
  }),
  component: GovernmentPage,
});

function GovernmentPage() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-neon-purple font-mono">Command Center</div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold mt-1">BBMP · Public Health Operations</h1>
            <p className="text-sm text-muted-foreground">City-wide biosurveillance · classified internal view</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-neon-red/15 text-neon-red border border-neon-red/30 px-4 py-2 text-sm font-semibold hover:bg-neon-red/25 transition">
            <ShieldAlert className="h-4 w-4" /> Activate Emergency Protocol
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Total active cases" value="1,652" delta="12 wards" trend="up" icon={Activity} accent="blue" />
          <StatCard label="Hospitals reporting" value="92 / 104" delta="88% participation" trend="up" icon={Hospital} accent="teal" />
          <StatCard label="Population at risk" value="2.4M" delta="High+Outbreak zones" trend="up" icon={Users} accent="amber" />
          <StatCard label="Emerging threats" value="2" delta="Critical: 1" trend="up" icon={Sparkles} accent="purple" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><BengaluruMap /></div>
          <AlertCenter />
        </div>

        <EmergingClustersTable />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><CityTrendChart /></div>
          <DiseaseSplitChart />
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-neon-teal" />
            <h3 className="font-display text-lg font-semibold">AI Emergency Response Recommendations</h3>
          </div>
          <ol className="space-y-2 text-sm">
            {[
              "Deploy vector-control teams to Whitefield & Marathahalli within 24h (dengue +38%).",
              "Quarantine evaluation for Electronic City emerging respiratory cluster — request sequencing from NIV.",
              "Pre-position oseltamivir stocks in Indiranagar / Koramangala for H1N1 surge.",
              "Issue water-quality bulletin in Jayanagar; coordinate with BWSSB.",
              "Open 2 fever clinics in Whitefield with 50-bed isolation capacity.",
            ].map((r, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg bg-muted/20 p-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-gradient-to-br from-neon-blue to-neon-teal text-background font-mono text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-foreground/90">{r}</span>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}
