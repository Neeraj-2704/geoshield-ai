import { useState } from "react";
import { DISEASES } from "@/lib/geoshield-data";
import { Brain, CheckCircle2, FlaskConical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AREAS = ["Whitefield", "Indiranagar", "Koramangala", "HSR Layout", "Electronic City", "Jayanagar", "Banashankari", "Yelahanka", "Hebbal", "Rajajinagar", "Malleshwaram", "Marathahalli"];

export function HospitalCaseForm() {
  const [submitted, setSubmitted] = useState(false);
  const [detection, setDetection] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const sym = String(data.get("symptoms") || "").toLowerCase();
    let d = "Awaiting AI classification...";
    if (sym.includes("rash") && sym.includes("fever") && sym.includes("joint")) d = "Chikungunya (high confidence 94%)";
    else if (sym.includes("hemorrhag") || (sym.includes("fever") && sym.includes("platelet"))) d = "Dengue (high confidence 91%)";
    else if (sym.includes("cough") && sym.includes("breath")) d = "Atypical Pneumonia · flagged as Emerging Cluster";
    else if (sym.includes("cough") && sym.includes("night sweat")) d = "Tuberculosis (suspected)";
    else d = DISEASES[Math.floor(Math.random() * DISEASES.length)] + " (probable)";
    setDetection(d);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <div className="glass rounded-2xl p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <FlaskConical className="h-5 w-5 text-neon-blue" />
        <h3 className="font-display text-lg font-semibold">Submit Anonymized Case</h3>
      </div>

      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
        <Field label="Diagnosis (free text)">
          <input name="diagnosis" placeholder="e.g. High fever, suspected viral" className={input} />
        </Field>
        <Field label="Pathogen (if known)">
          <input name="pathogen" placeholder="e.g. DENV-2" className={input} />
        </Field>
        <Field label="ICD-10 Code">
          <input name="icd" placeholder="A90" className={input} />
        </Field>
        <Field label="Area">
          <select name="area" className={input} defaultValue="">
            <option value="" disabled>Select area</option>
            {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </Field>
        <Field label="Age Group">
          <select name="age" className={input} defaultValue="">
            <option value="" disabled>Select</option>
            {["0-4", "5-14", "15-24", "25-34", "35-44", "45-54", "55-64", "65+"].map((a) => <option key={a}>{a}</option>)}
          </select>
        </Field>
        <Field label="Severity">
          <select name="severity" className={input} defaultValue="">
            <option value="" disabled>Select</option>
            {["Mild", "Moderate", "Severe", "Critical"].map((a) => <option key={a}>{a}</option>)}
          </select>
        </Field>
        <Field label="Symptoms (comma separated)" full>
          <textarea name="symptoms" rows={3} placeholder="High fever, rash, joint pain..." className={input + " resize-none"} />
        </Field>

        <div className="sm:col-span-2 flex items-center justify-between gap-3 flex-wrap">
          <p className="text-[11px] text-muted-foreground max-w-md">
            Patient identity is never stored. AI classifies the diagnosis and contributes to outbreak signals.
          </p>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-teal text-background font-semibold px-5 py-2.5 text-sm hover:opacity-90 transition shadow-[var(--shadow-glow)]"
          >
            <Brain className="h-4 w-4" /> Run AI Detection
          </button>
        </div>
      </form>

      <AnimatePresence>
        {submitted && detection && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl border border-neon-green/30 bg-neon-green/10 p-3 flex items-start gap-2"
          >
            <CheckCircle2 className="h-5 w-5 text-neon-green shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-neon-green">Case classified & submitted</div>
              <div className="text-xs text-foreground/80 mt-0.5">AI detection: <span className="font-mono">{detection}</span></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const input = "w-full rounded-lg bg-background/40 border border-border/50 px-3 py-2 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition placeholder:text-muted-foreground/60";

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      {children}
    </label>
  );
}
