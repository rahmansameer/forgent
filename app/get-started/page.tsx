"use client";

import { Suspense, useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { FormData, FormErrors, Step } from "./types";
import { validateStep, hasErrors } from "./utils";
import {
  WEB3FORMS_ACCESS_KEY,
  SERVICES,
  COMPANY_SIZES,
  COUNTRIES,
  BUDGET_RANGES,
  TIMELINES,
  REFERRAL_SOURCES,
  TOTAL_STEPS,
} from "./constants";
import StepContainer from "./components/StepContainer";
import StepHeader from "./components/StepHeader";
import FormCard from "./components/FormCard";
import Input from "./components/Input";
import Select from "./components/Select";
import Textarea from "./components/Textarea";
import Button from "../components/ui/Button";
import SectionDivider from "./components/SectionDivider";
import SuccessState from "./components/SuccessState";

const INITIAL_FORM_DATA: FormData = {
  fullName: "",
  email: "",
  companyName: "",
  website: "",
  companySize: "",
  country: "",
  services: [],
  projectDescription: "",
  budget: "",
  timeline: "",
  referralSource: "",
};

function OnboardingForm() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    ...INITIAL_FORM_DATA,
    email: emailFromUrl,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (emailFromUrl) {
      setFormData((prev) => ({ ...prev, email: emailFromUrl }));
    }
  }, [emailFromUrl]);

  const updateField = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    },
    [],
  );

  const toggleService = useCallback((serviceId: string) => {
    setFormData((prev) => {
      const services = prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId];
      return { ...prev, services };
    });
  }, []);

  const handleNext = useCallback(() => {
    const stepErrors = validateStep(step, formData);
    if (hasErrors(stepErrors)) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS) as Step);
  }, [step, formData]);

  const handleBack = useCallback(() => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1) as Step);
  }, []);

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);

    try {
      const form = new FormData();
      form.append("access_key", WEB3FORMS_ACCESS_KEY);
      form.append("subject", "New Project Inquiry");
      form.append("from_name", "Get Started Form");
      form.append("Full Name", formData.fullName);
      form.append("Email", formData.email);
      form.append("Company Name", formData.companyName);
      form.append("Website", formData.website);
      form.append("Company Size", formData.companySize);
      form.append("Country", formData.country);
      form.append("Services", formData.services.join(", "));
      form.append("Project Description", formData.projectDescription);
      form.append("Budget", formData.budget);
      form.append("Timeline", formData.timeline);
      form.append("Referral Source", formData.referralSource);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [formData]);

  const handleReset = useCallback(() => {
    setStep(1);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSubmitted(false);
  }, []);

  if (submitted) {
    return (
      <StepContainer currentStep={TOTAL_STEPS} totalSteps={TOTAL_STEPS}>
        <FormCard>
          <SuccessState />
        </FormCard>
      </StepContainer>
    );
  }

  return (
    <StepContainer currentStep={step} totalSteps={TOTAL_STEPS}>
      <FormCard>
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <StepHeader title="Let's get to know your business" />

            <div className="flex flex-col gap-5">
              <Input
                label="Full Name *"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                error={errors.fullName}
                autoComplete="name"
              />
              <Input
                label="Email *"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                error={errors.email}
                autoComplete="email"
              />
              <Input
                label="Company Name *"
                placeholder="Acme Inc."
                value={formData.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                error={errors.companyName}
                autoComplete="organization"
              />
              <Input
                label="Website"
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => updateField("website", e.target.value)}
                autoComplete="url"
              />
              <Select
                label="Company Size"
                options={COMPANY_SIZES}
                value={formData.companySize}
                onChange={(e) => updateField("companySize", e.target.value)}
              />
              <Select
                label="Country"
                options={COUNTRIES}
                value={formData.country}
                onChange={(e) => updateField("country", e.target.value)}
              />
            </div>

            <SectionDivider />

            <div className="flex justify-end">
              <Button onClick={handleNext}>Continue</Button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <StepHeader title="What do you need help with?" />

            <fieldset>
              <legend className="sr-only">Services you need help with</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((service) => {
                  const isSelected = formData.services.includes(service.id);
                  return (
                    <label
                      key={service.id}
                      htmlFor={`service-${service.id}`}
                      className={`group relative flex items-center gap-4 p-4 rounded-[10px] border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "border-[#0150FF] bg-[#0150FF]/[0.03] shadow-[0_0_0_1px_rgba(1,80,255,0.08)]"
                          : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:bg-[#FAFAFA]"
                      }`}
                    >
                      <input
                        id={`service-${service.id}`}
                        type="checkbox"
                        className="sr-only"
                        checked={isSelected}
                        onChange={() => toggleService(service.id)}
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                          isSelected
                            ? "border-[#0150FF] bg-[#0150FF] scale-100"
                            : "border-[#D1D5DB] bg-white group-hover:border-[#9CA3AF]"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M1.5 5L4 7.5L8.5 2.5"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-[15px] select-none transition-colors duration-200 ${
                          isSelected
                            ? "text-[#111827] font-medium"
                            : "text-[#374151]"
                        }`}
                      >
                        {service.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-8">
              <Textarea
                label="Describe your project"
                placeholder="Briefly explain what you're trying to achieve..."
                value={formData.projectDescription}
                onChange={(e) =>
                  updateField("projectDescription", e.target.value)
                }
                error={errors.projectDescription}
              />
            </div>

            <SectionDivider />

            <div className="flex justify-between">
              <Button variant="secondary" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext}>Continue</Button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <StepHeader title="Project details" />

            <div className="flex flex-col gap-5">
              <Select
                label="Budget"
                options={BUDGET_RANGES}
                value={formData.budget}
                onChange={(e) => updateField("budget", e.target.value)}
                error={errors.budget}
              />
              <Select
                label="Timeline"
                options={TIMELINES}
                value={formData.timeline}
                onChange={(e) => updateField("timeline", e.target.value)}
                error={errors.timeline}
              />
              <Select
                label="How did you hear about us?"
                options={REFERRAL_SOURCES}
                value={formData.referralSource}
                onChange={(e) => updateField("referralSource", e.target.value)}
              />
            </div>

            <SectionDivider />

            <div className="flex justify-between">
              <Button variant="secondary" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleSubmit}>
                {submitting ? "Confirming..." : "Confirm"}
              </Button>
            </div>
          </div>
        )}
      </FormCard>
    </StepContainer>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingForm />
    </Suspense>
  );
}
