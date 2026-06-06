import { motion } from "framer-motion";
import { Activity, Shield, Brain, Radar } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-10 grid-bg">
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-neon-blue/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-neon-purple/15 blur-3xl" />
      <div className="relative max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-mono text-neon-teal mb-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-neon-teal opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-teal" />
          </span>
          AI Biosurveillance · Online
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-4xl sm:text-6xl font-semibold leading-[1.05] tracking-tight"
        >
          A <span className="text-gradient">city-scale immune system</span><br />
          for Bengaluru.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl"
        >
          GeoShield fuses hospital case data, GIS, and an AI disease intelligence engine to detect outbreaks
          — and emerging unknown pathogens — across 12 wards in real time.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 flex flex-wrap gap-2"
        >
          {[
            { icon: Shield, label: "GIS Risk Mapping" },
            { icon: Brain, label: "NLP Diagnosis Engine" },
            { icon: Radar, label: "Emerging Threat Monitor" },
            { icon: Activity, label: "Predictive Outbreak Forecasting" },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs">
              <Icon className="h-3.5 w-3.5 text-neon-teal" />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
