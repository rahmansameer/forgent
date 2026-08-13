export interface CompanySize {
  value: string;
  label: string;
}

export interface Country {
  value: string;
  label: string;
}

export interface BudgetRange {
  value: string;
  label: string;
}

export interface Timeline {
  value: string;
  label: string;
}

export interface ReferralSource {
  value: string;
  label: string;
}

export interface ServiceOption {
  id: string;
  label: string;
}

export interface FormData {
  fullName: string;
  email: string;
  companyName: string;
  website: string;
  companySize: string;
  country: string;
  services: string[];
  projectDescription: string;
  budget: string;
  timeline: string;
  referralSource: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  companyName?: string;
  projectDescription?: string;
  budget?: string;
  timeline?: string;
}

export type Step = 1 | 2 | 3;
