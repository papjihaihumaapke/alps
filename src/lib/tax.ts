export const CA_PROVINCES = [
  { code: "BC", name: "British Columbia", rate: 0.12 },
  { code: "ON", name: "Ontario", rate: 0.13 },
  { code: "AB", name: "Alberta", rate: 0.05 },
  { code: "QC", name: "Quebec", rate: 0.14975 },
  { code: "MB", name: "Manitoba", rate: 0.12 },
  { code: "SK", name: "Saskatchewan", rate: 0.11 },
  { code: "NS", name: "Nova Scotia", rate: 0.15 },
  { code: "NB", name: "New Brunswick", rate: 0.15 },
  { code: "NL", name: "Newfoundland & Labrador", rate: 0.15 },
  { code: "PE", name: "Prince Edward Island", rate: 0.15 },
  { code: "YT", name: "Yukon", rate: 0.05 },
  { code: "NT", name: "Northwest Territories", rate: 0.05 },
  { code: "NU", name: "Nunavut", rate: 0.05 },
];

export const COUNTRIES = [
  { code: "HK", name: "Hong Kong", currency: "HKD" as const, shipping: 30 },
  { code: "CA", name: "Canada", currency: "CAD" as const, shipping: 0 },
  { code: "OTHER", name: "Other (quoted in 24h)", currency: "HKD" as const, shipping: 0 },
];

export function taxRate(country: string, province?: string) {
  if (country !== "CA") return 0;
  return CA_PROVINCES.find((p) => p.code === province)?.rate ?? 0.05;
}
