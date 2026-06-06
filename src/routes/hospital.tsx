import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/geoshield/TopNav";
import { StatCard } from "@/components/geoshield/StatCard";
import { HospitalCaseForm } from "@/components/geoshield/HospitalCaseForm";
import { CasesTable } from "@/components/geoshield/CasesTable";
import { CityTrendChart } from "@/components/geoshield/TrendChart";
import { Activity, FileText, Brain, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/hospital")({
  head: () => ({
    meta: [
      { title: "Hospital Console — GeoShield Bengaluru" },
      { name: "description", content: "Submit anonymized cases, view AI disease classifications and outbreak trends." },
    ],
  }),
  component: HospitalPage,
});

function HospitalPage() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-neon-teal font-mono">Hospital Console</div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold mt-1">Manipal Hospital · Whitefield</h1>
            <p className="text-sm text-muted-foreground">Logged in as <span className="font-mono">dr.menon@manipal.health</span></p>
          </div>
          <div className="rounded-full glass px-3 py-1.5 text-xs font-mono text-neon-green">
            ● Connected to GeoShield Network
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Cases submitted (30d)" value="284" delta="+18% vs last month" trend="up" icon={FileText} accent="blue" />
          <StatCard label="AI classification rate" value="97.2%" delta="auto-coded ICD-10" trend="up" icon={Brain} accent="teal" />
          <StatCard label="Local risk score" value="High" delta="Whitefield outbreak" trend="up" icon={AlertCircle} accent="red" />
          <StatCard label="Active patients (today)" value="46" delta="6 awaiting triage" trend="flat" icon={Activity} accent="purple" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <HospitalCaseForm />
          <CityTrendChart />
        </div>

        <CasesTable />
      </main>
    </div>
  );
}
