export type RiskLevel = "safe" | "moderate" | "high" | "outbreak" | "emerging";

export interface Area {
  id: string;
  name: string;
  x: number; // SVG % position
  y: number;
  population: string;
  risk: RiskLevel;
  activeCases: number;
  growth: number; // percent
  primaryDisease: string;
  hospitals: number;
  emergingWarning?: string;
  recommendation: string;
  forecast: { day: string; cases: number }[];
}

export const RISK_META: Record<RiskLevel, { label: string; color: string; bg: string }> = {
  safe: { label: "Safe", color: "var(--risk-safe)", bg: "oklch(0.78 0.2 150 / 0.18)" },
  moderate: { label: "Moderate", color: "var(--risk-moderate)", bg: "oklch(0.85 0.17 95 / 0.2)" },
  high: { label: "High Risk", color: "var(--risk-high)", bg: "oklch(0.75 0.2 50 / 0.2)" },
  outbreak: { label: "Active Outbreak", color: "var(--risk-outbreak)", bg: "oklch(0.65 0.25 25 / 0.22)" },
  emerging: { label: "Emerging Threat", color: "var(--risk-emerging)", bg: "oklch(0.68 0.25 305 / 0.22)" },
};

const fc = (base: number, trend = 1.1) =>
  Array.from({ length: 7 }, (_, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    cases: Math.round(base * Math.pow(trend, i - 3) + (Math.sin(i) * base * 0.1)),
  }));

export const AREAS: Area[] = [
  { id: "whitefield", name: "Whitefield", x: 78, y: 42, population: "320K", risk: "outbreak", activeCases: 412, growth: 38, primaryDisease: "Dengue", hospitals: 14, recommendation: "Eliminate stagnant water. Use repellents. Seek care for high fever > 2 days.", forecast: fc(60, 1.18) },
  { id: "indiranagar", name: "Indiranagar", x: 60, y: 48, population: "180K", risk: "high", activeCases: 187, growth: 22, primaryDisease: "Influenza H1N1", hospitals: 9, recommendation: "Mask in crowded indoors. Vaccinate if not already.", forecast: fc(28, 1.14) },
  { id: "koramangala", name: "Koramangala", x: 56, y: 60, population: "210K", risk: "high", activeCases: 154, growth: 18, primaryDisease: "Chikungunya", hospitals: 11, recommendation: "Vector control campaigns underway. Report joint pain + rash.", forecast: fc(24, 1.12) },
  { id: "hsr", name: "HSR Layout", x: 62, y: 70, population: "190K", risk: "moderate", activeCases: 78, growth: 9, primaryDisease: "Typhoid", hospitals: 7, recommendation: "Drink boiled/filtered water. Avoid roadside ice.", forecast: fc(12, 1.08) },
  { id: "electronic-city", name: "Electronic City", x: 60, y: 88, population: "290K", risk: "emerging", activeCases: 96, growth: 41, primaryDisease: "Unknown Respiratory Cluster", hospitals: 8, emergingWarning: "Cluster of atypical pneumonia + rash in 3 hospitals — under investigation.", recommendation: "Mask up. Report fever + rash + cough immediately.", forecast: fc(15, 1.22) },
  { id: "jayanagar", name: "Jayanagar", x: 42, y: 70, population: "230K", risk: "moderate", activeCases: 64, growth: 6, primaryDisease: "Hepatitis A", hospitals: 10, recommendation: "Wash hands. Avoid contaminated water sources.", forecast: fc(10, 1.05) },
  { id: "banashankari", name: "Banashankari", x: 32, y: 76, population: "250K", risk: "safe", activeCases: 18, growth: -4, primaryDisease: "Seasonal flu", hospitals: 6, recommendation: "Maintain hygiene. No immediate concerns.", forecast: fc(4, 0.95) },
  { id: "yelahanka", name: "Yelahanka", x: 48, y: 14, population: "170K", risk: "safe", activeCases: 22, growth: -2, primaryDisease: "Seasonal flu", hospitals: 5, recommendation: "Maintain hygiene. No immediate concerns.", forecast: fc(5, 0.97) },
  { id: "hebbal", name: "Hebbal", x: 50, y: 26, population: "200K", risk: "moderate", activeCases: 71, growth: 11, primaryDisease: "Malaria", hospitals: 7, recommendation: "Use bed nets. Avoid dawn/dusk mosquito exposure.", forecast: fc(11, 1.09) },
  { id: "rajajinagar", name: "Rajajinagar", x: 36, y: 48, population: "210K", risk: "moderate", activeCases: 58, growth: 7, primaryDisease: "Tuberculosis", hospitals: 8, recommendation: "Cover coughs. Long cough > 2 weeks → screening recommended.", forecast: fc(9, 1.06) },
  { id: "malleshwaram", name: "Malleshwaram", x: 40, y: 38, population: "160K", risk: "safe", activeCases: 14, growth: -6, primaryDisease: "Seasonal flu", hospitals: 6, recommendation: "Stable. Continue routine precautions.", forecast: fc(3, 0.94) },
  { id: "marathahalli", name: "Marathahalli", x: 72, y: 54, population: "240K", risk: "high", activeCases: 168, growth: 27, primaryDisease: "Dengue", hospitals: 9, recommendation: "Eliminate stagnant water. Use repellents.", forecast: fc(26, 1.16) },
];

export interface AlertItem {
  id: string;
  level: "outbreak" | "emerging" | "advisory";
  title: string;
  area: string;
  time: string;
  detail: string;
}

export const ALERTS: AlertItem[] = [
  { id: "a1", level: "outbreak", title: "Dengue outbreak escalated", area: "Whitefield", time: "12 min ago", detail: "412 active cases. Growth +38% week-over-week. 14 hospitals reporting." },
  { id: "a2", level: "emerging", title: "Emerging respiratory cluster", area: "Electronic City", time: "37 min ago", detail: "Atypical pneumonia + rash across 3 hospitals. Pathogen unidentified. Under investigation." },
  { id: "a3", level: "outbreak", title: "Chikungunya surge", area: "Koramangala", time: "1 hr ago", detail: "154 cases. Vector control teams dispatched." },
  { id: "a4", level: "advisory", title: "Influenza H1N1 advisory", area: "Indiranagar", time: "3 hr ago", detail: "Mask advisory in indoor venues. Vaccination drive scheduled." },
  { id: "a5", level: "advisory", title: "Hepatitis A water advisory", area: "Jayanagar", time: "5 hr ago", detail: "Suspected contaminated water source. BWSSB notified." },
];

export const DISEASES = [
  "COVID-19", "Dengue", "Tuberculosis", "Malaria", "Influenza (H1N1)",
  "Chikungunya", "Typhoid", "Hepatitis A", "Hepatitis E", "Mpox", "Leptospirosis",
];

export const CITY_TREND = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`,
  dengue: Math.round(80 + i * 14 + Math.sin(i) * 18),
  flu: Math.round(60 + i * 6 + Math.cos(i) * 12),
  chikungunya: Math.round(30 + i * 8 + Math.sin(i / 2) * 8),
  emerging: Math.round(5 + i * 3 + Math.max(0, i - 8) * 6),
}));

export const DISEASE_SPLIT = [
  { name: "Dengue", value: 742, color: "oklch(0.7 0.22 30)" },
  { name: "Influenza H1N1", value: 318, color: "oklch(0.72 0.18 230)" },
  { name: "Chikungunya", value: 246, color: "oklch(0.78 0.18 190)" },
  { name: "Typhoid", value: 142, color: "oklch(0.82 0.17 95)" },
  { name: "Tuberculosis", value: 108, color: "oklch(0.68 0.12 280)" },
  { name: "Emerging Cluster", value: 96, color: "oklch(0.7 0.24 305)" },
];

export interface EmergingCluster {
  id: string;
  area: string;
  symptoms: string[];
  cases: number;
  growth: number;
  status: "Investigating" | "Monitoring" | "Escalated" | "Contained";
  severity: "Low" | "Medium" | "High" | "Critical";
  detected: string;
}

export const CLUSTERS: EmergingCluster[] = [
  { id: "EC-2041", area: "Electronic City", symptoms: ["High fever", "Rash", "Atypical pneumonia", "Joint pain"], cases: 96, growth: 41, status: "Investigating", severity: "Critical", detected: "2h ago" },
  { id: "EC-2039", area: "Whitefield + Marathahalli", symptoms: ["Fever", "Hemorrhagic signs", "Thrombocytopenia"], cases: 58, growth: 22, status: "Escalated", severity: "High", detected: "8h ago" },
  { id: "EC-2036", area: "Hebbal", symptoms: ["Persistent cough", "Night sweats", "Weight loss"], cases: 27, growth: 11, status: "Monitoring", severity: "Medium", detected: "1d ago" },
  { id: "EC-2032", area: "Koramangala", symptoms: ["Joint swelling", "Rash", "Fever"], cases: 41, growth: 14, status: "Monitoring", severity: "Medium", detected: "2d ago" },
  { id: "EC-2028", area: "Yelahanka", symptoms: ["GI distress", "Jaundice"], cases: 12, growth: 3, status: "Contained", severity: "Low", detected: "4d ago" },
];

export const HOSPITAL_CASES = [
  { id: "C-90021", date: "2026-06-05", diagnosis: "Dengue Fever", icd: "A90", area: "Whitefield", age: "25-34", severity: "Moderate" },
  { id: "C-90020", date: "2026-06-05", diagnosis: "Atypical Pneumonia (unspecified)", icd: "J18.9", area: "Electronic City", age: "35-44", severity: "Severe" },
  { id: "C-90019", date: "2026-06-05", diagnosis: "Chikungunya", icd: "A92.0", area: "Koramangala", age: "45-54", severity: "Moderate" },
  { id: "C-90018", date: "2026-06-04", diagnosis: "Influenza A H1N1", icd: "J09", area: "Indiranagar", age: "5-14", severity: "Mild" },
  { id: "C-90017", date: "2026-06-04", diagnosis: "Typhoid Fever", icd: "A01.0", area: "HSR Layout", age: "15-24", severity: "Moderate" },
];
