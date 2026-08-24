import type {
  CompanySize,
  Country,
  BudgetRange,
  Timeline,
  ReferralSource,
  ServiceOption,
} from "./types";

export const WEB3FORMS_ACCESS_KEY = "d28605ac-6c74-4f08-98ce-2cc786b69d84";

export const COMPANY_SIZES: CompanySize[] = [
  { value: "", label: "Select company size" },
  { value: "just-me", label: "Just Me" },
  { value: "2-10", label: "2–10" },
  { value: "11-50", label: "11–50" },
  { value: "51-200", label: "51–200" },
  { value: "200+", label: "200+" },
];

export const COUNTRIES: Country[] = [
  { value: "", label: "Select country" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "NL", label: "Netherlands" },
  { value: "SG", label: "Singapore" },
  { value: "IN", label: "India" },
  { value: "BR", label: "Brazil" },
  { value: "JP", label: "Japan" },
  { value: "KR", label: "South Korea" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "ZA", label: "South Africa" },
  { value: "NG", label: "Nigeria" },
  { value: "MX", label: "Mexico" },
  { value: "ES", label: "Spain" },
  { value: "IT", label: "Italy" },
  { value: "SE", label: "Sweden" },
  { value: "OTHER", label: "Other" },
];

export const SERVICES: ServiceOption[] = [
  { id: "ai-automation", label: "AI Automation" },
  { id: "lead-generation", label: "Lead Generation" },
  { id: "sales-automation", label: "Sales Automation" },
  { id: "crm-automation", label: "CRM Automation" },
  { id: "workflow-automation", label: "Workflow Automation" },
  { id: "other", label: "Other" },
];

export const BUDGET_RANGES: BudgetRange[] = [
  { value: "", label: "Select budget" },
  { value: "less-than-2k", label: "Less than $2k" },
  { value: "2k-5k", label: "$2k–5k" },
  { value: "5k-10k", label: "$5k–10k" },
  { value: "10k+", label: "$10k+" },
];

export const TIMELINES: Timeline[] = [
  { value: "", label: "Select timeline" },
  { value: "asap", label: "ASAP" },
  { value: "within-30", label: "Within 30 days" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "just-exploring", label: "Just Exploring" },
];

export const REFERRAL_SOURCES: ReferralSource[] = [
  { value: "", label: "Select source" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "cold_email", label: "Cold Email" },
  { value: "google", label: "Google" },
  { value: "referral", label: "Referral" },
  { value: "other", label: "Other" },
];

export const TOTAL_STEPS = 3;
