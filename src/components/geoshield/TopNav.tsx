import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Shield, Hospital, Landmark, Radar } from "lucide-react";

const links = [
  { to: "/", label: "Public", icon: Shield },
  { to: "/hospital", label: "Hospital", icon: Hospital },
  { to: "/government", label: "Government", icon: Landmark },
  { to: "/emerging-threats", label: "Emerging Threats", icon: Radar },
];

export function TopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-40 glass-strong border-b border-border/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon-blue to-neon-teal blur-md opacity-60 group-hover:opacity-100 transition" />
            <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-teal">
              <Activity className="h-5 w-5 text-background" />
            </div>
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-semibold tracking-tight">
              Geo<span className="text-gradient">Shield</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Bengaluru · Biosurveillance
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-primary/15 text-primary glow-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
            </span>
            <span className="font-mono text-muted-foreground">Live · 12 hospitals</span>
          </div>
        </div>
      </div>
      <nav className="md:hidden flex overflow-x-auto gap-1 px-4 pb-2">
        {links.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                active ? "bg-primary/15 text-primary" : "text-muted-foreground bg-muted/30"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
