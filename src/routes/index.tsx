import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/geoshield/TopNav";
import { Hero } from "@/components/geoshield/Hero";
import { BengaluruMap } from "@/components/geoshield/BengaluruMap";
import { AlertCenter } from "@/components/geoshield/AlertCenter";
import { CityTrendChart, DiseaseSplitChart } from "@/components/geoshield/TrendChart";
import { StatCard } from "@/components/geoshield/StatCard";
import { Activity, AlertTriangle, Hospital, Sparkles, Users, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GeoShield Bengaluru — AI Biosurveillance & Outbreak Detection" },
      { name: "description", content: "AI-powered biosecurity surveillance, GIS risk mapping, and emerging disease detection for Bengaluru." },
      { property: "og:title", content: "GeoShield Bengaluru — AI Biosurveillance" },
      { property: "og:description", content: "Real-time city-wide outbreak intelligence, emerging threat detection and predictive analytics." },
    ],
  }),
  component: PublicDashboard,
});

function PublicDashboard() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
        <Hero />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Active cases (city)" value="1,652" delta="+12.4% wow" trend="up" icon={Activity} accent="blue" />
          <StatCard label="Active outbreaks" value="3" delta="Whitefield, Koramangala…" trend="up" icon={AlertTriangle} accent="red" />
          <StatCard label="Emerging clusters" value="2" delta="under investigation" trend="up" icon={Sparkles} accent="purple" />
          <StatCard label="Reporting hospitals" value="92" delta="of 104 onboarded" trend="flat" icon={Hospital} accent="teal" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><BengaluruMap /></div>
          <AlertCenter />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><CityTrendChart /></div>
          <DiseaseSplitChart />
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <InfoCard icon={Users} title="For Citizens" body="Check your area's risk, get GPS-based alerts within 2–10 km, and receive personalized health advisories." />
          <InfoCard icon={Hospital} title="For Hospitals" body="Submit anonymized cases. Our AI engine classifies the diagnosis, surfaces pathogens, and detects clusters across the network." />
          <InfoCard icon={Shield} title="For Government" body="City-wide heatmaps, outbreak forecasts and emerging threat dashboards to coordinate emergency response." />
        </div>

        <Footer />
      </main>
    </div>
  );
}

function InfoCard({ icon: Icon, title, body }: { icon: typeof Users; title: string; body: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-neon-blue/30 to-neon-teal/20 text-neon-teal mb-3">
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="font-display text-base font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1">{body}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="pt-6 pb-10 text-center text-xs text-muted-foreground">
      <div className="font-mono">GeoShield Bengaluru · v0.1 · Demo data · Built for resilient public health</div>
    </footer>
  );
}
