import Container from "../../ui/Container";
import {
  ArrowRight,
  Briefcase,
  Workflow,
  Settings,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const features = [
  {
    title: "Planning",
    description:
      "We start by understanding your business, goals, and the processes you want to improve.",
    icon: Briefcase,
    large: true,
  },
  {
    title: "Setup & Integration",
    description:
      "We build the system and connect it with the tools your team already uses.",
    icon: Workflow,
    large: true,
  },
  {
    title: "Configuration",
    description:
      "Every system is set up around your workflow, requirements, and team.",
    icon: Settings,
  },
  {
    title: "Review & Testing",
    description:
      "Every workflow is reviewed and tested before launch to ensure reliable performance.",
    icon: ShieldCheck,
  },
  {
    title: "Support",
    description:
      "We're available after launch to help with updates, questions, and improvements.",
    icon: Headphones,
  },
];

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  large?: boolean;
};

function FeatureCard({
  title,
  description,
  icon: Icon,
  large,
}: FeatureCardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-gray-200
        bg-[#f7f8f9]
        p-6
        transition-colors
        duration-300
        ${large ? "min-h-[230px] lg:col-span-3" : "min-h-[230px] lg:col-span-2"}
      `}
    >
      {/* Icon */}
      <div className="mb-6">
        <Icon className="h-[24px] w-[24px] text-primary" strokeWidth={2.1} />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-[22px] leading-[26px] font-medium tracking-[-0.03em] text-black">
          {title}
        </h3>

        <p className="mt-3 max-w-[470px] text-[15px] leading-[26px] font-normal text-[#6b7280]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function WhatYouGet() {
  return (
    <section className="bg-[#f1f2f3] py-6 md:py-8">
      <div className="mx-5 rounded-3xl border border-gray-200 bg-white py-20 md:py-28">
        <Container>
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[30px] md:text-[38px] leading-[1.1] font-semibold text-black">
              What every project includes
            </h2>

            <p className="mt-4 text-[16px] leading-[1.7] text-black/60">
              Everything included to keep your project moving forward.
            </p>
          </div>

          {/* Grid */}
          <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                large={feature.large}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
