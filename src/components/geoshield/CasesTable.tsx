import { HOSPITAL_CASES } from "@/lib/geoshield-data";
import { Database } from "lucide-react";

export function CasesTable() {
  return (
    <div className="glass rounded-2xl p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-3">
        <Database className="h-5 w-5 text-neon-teal" />
        <h3 className="font-display text-lg font-semibold">Recent Submitted Cases</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border/50">
              <th className="text-left py-2 px-2">Case ID</th>
              <th className="text-left py-2 px-2">Date</th>
              <th className="text-left py-2 px-2">AI Diagnosis</th>
              <th className="text-left py-2 px-2">ICD</th>
              <th className="text-left py-2 px-2">Area</th>
              <th className="text-left py-2 px-2">Age</th>
              <th className="text-left py-2 px-2">Severity</th>
            </tr>
          </thead>
          <tbody>
            {HOSPITAL_CASES.map((c) => (
              <tr key={c.id} className="border-b border-border/30 hover:bg-muted/30 transition">
                <td className="py-2.5 px-2 font-mono text-xs text-neon-teal">{c.id}</td>
                <td className="py-2.5 px-2 font-mono text-xs text-muted-foreground">{c.date}</td>
                <td className="py-2.5 px-2">{c.diagnosis}</td>
                <td className="py-2.5 px-2 font-mono text-xs">{c.icd}</td>
                <td className="py-2.5 px-2">{c.area}</td>
                <td className="py-2.5 px-2 font-mono text-xs">{c.age}</td>
                <td className="py-2.5 px-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
                    c.severity === "Severe" ? "bg-neon-red/15 text-neon-red border-neon-red/30"
                      : c.severity === "Moderate" ? "bg-neon-amber/15 text-neon-amber border-neon-amber/30"
                      : "bg-neon-green/15 text-neon-green border-neon-green/30"
                  }`}>{c.severity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
