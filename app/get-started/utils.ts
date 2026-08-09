import type { FormData, FormErrors } from "./types";

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validateStep(
  step: number,
  data: FormData
): FormErrors {
  const errors: FormErrors = {};

  if (step === 1) {
    if (!data.fullName.trim()) {
      errors.fullName = "Full name is required.";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required.";
    } else if (!validateEmail(data.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!data.companyName.trim()) {
      errors.companyName = "Company name is required.";
    }
  }

  if (step === 2) {
    if (!data.projectDescription.trim()) {
      errors.projectDescription = "Please describe your project.";
    }
  }

  if (step === 3) {
    if (!data.budget) {
      errors.budget = "Please select a budget range.";
    }
    if (!data.timeline) {
      errors.timeline = "Please select a timeline.";
    }
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
