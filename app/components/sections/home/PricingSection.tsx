"use client";

import { Star } from "lucide-react";
import clsx from "clsx";
import Container from "../../ui/Container";
import Link from "next/link";
import Button from "@/app/components/ui/Button";

const pricingPlans = [
  {
    name: "Starter",
    description:
      "For businesses implementing their first AI system and automating key processes.",
    price: "$800+",
    badge: "",
    highlighted: false,
    features: [
      "Discovery & Planning",
      "Custom AI System",
      "AI Model Integration",
      "Business Automation",
      "Testing & Deployment",
    ],
  },
  {
    name: "Growth",
    description:
      "For businesses scaling with AI across sales, operations, and customer support.",
    price: "$1,500+",
    badge: "Most Popular",
    highlighted: true,
    features: [
      "Everything in Starter",
      "AI Agents",
      "Multi-System Automation",
      "CRM & App Integrations",
      "Advanced Workflows",
      "Performance Optimization",
    ],
  },
  {
    name: "Enterprise",
    description:
      "For businesses needing fully custom AI solutions and enterprise automation.",
    price: "Custom",
    badge: "",
    highlighted: false,
    features: [
      "Custom AI Strategy",
      "Enterprise AI Systems",
      "Complex Automations",
      "Custom Integrations",
      "Dedicated Implementation",
      "Long-Term Partnership",
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#f3f3f3] py-24 md:py-28">
      <Container>
        <div className="mx-auto max-w-[980px] text-center">
          <h2 className="text-[30px] md:text-[38px] leading-[1.1] font-semibold text-black">
            Flexible pricing for every stage
          </h2>

          <p className="mt-4 text-[16px] leading-[1.7] text-black/60">
            Everything you need to grow faster with AI and automation.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 xl:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </Container>
    </section>
  );
}

type PricingCardProps = {
  plan: {
    name: string;
    description: string;
    price: string;
    badge: string;
    highlighted: boolean;
    features: string[];
  };
};

function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={clsx(
        "relative rounded-2xl border p-8",
        plan.highlighted
          ? "border-black bg-black text-white shadow-2xl"
          : "border-[#dddddd] bg-white text-black",
      )}
    >
      <div className="flex items-center gap-3">
        <h3
          className={clsx(
            "text-[32px]",
            plan.highlighted ? "text-white" : "text-black",
          )}
        >
          {plan.name}
        </h3>

        {plan.badge && (
          <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] text-white">
            <Star className="h-3 w-3 fill-white" />
            {plan.badge}
          </div>
        )}
      </div>

      <p
        className={clsx(
          "mt-5 text-[14px] leading-[1.45]",
          plan.highlighted ? "text-white/70" : "text-[#5f5f5f]",
        )}
      >
        {plan.description}
      </p>

      <div className="mt-12">
        <div className="text-[26px] leading-none font-medium">{plan.price}</div>
      </div>

      {plan.highlighted ? (
        <Link href="/book-a-call" className="mt-8 block">
          <Button className="w-full h-[52px]">Book a call</Button>
        </Link>
      ) : (
        <Link
          href="/book-a-call"
          className="mt-8 flex w-full items-center justify-center rounded-lg border border-[#9fc2ff] h-[52px] bg-white text-[14px] font-medium text-primary transition-all hover:bg-[#f5f9ff]"
        >
          Book a call
        </Link>
      )}

      <div className="relative my-10 flex items-center">
        <div
          className={clsx(
            "h-px flex-1",
            plan.highlighted ? "bg-white/20" : "bg-[#e8e8e8]",
          )}
        />

        <span
          className={clsx(
            "px-4 text-[12px] font-normal whitespace-nowrap",
            plan.highlighted ? "text-white/70" : "text-[#9a9a9a]",
          )}
        >
          What’s included in every project
        </span>

        <div
          className={clsx(
            "h-px flex-1",
            plan.highlighted ? "bg-white/20" : "bg-[#e8e8e8]",
          )}
        />
      </div>

      <ul className="space-y-2">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-4">
            <svg
              className={clsx(
                "mt-1 h-5 w-5 flex-shrink-0",
                plan.highlighted ? "text-white" : "text-[#7b7b7b]",
              )}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.42 0l-3.2-3.2a1 1 0 111.42-1.42l2.49 2.49 6.49-6.49a1 1 0 011.42 0z"
                clipRule="evenodd"
              />
            </svg>

            <span
              className={clsx(
                "text-[14px]",
                plan.highlighted ? "text-white/90" : "text-[#232323]",
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
