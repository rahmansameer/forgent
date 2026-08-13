"use client";

import { useState } from "react";
import Container from "../../ui/Container";

const faqs = [
  {
    q: "What can you help automate?",
    a: "We help businesses automate lead generation, cold email outreach, sales operations, and internal workflows with custom AI automation systems.",
  },
  {
    q: "Can you work with our existing tools?",
    a: "Yes. We can connect and automate workflows using the tools your team already uses whenever possible.",
  },
  {
    q: "How much does a project cost?",
    a: "Pricing depends on the scope, complexity, and requirements of the project. We'll provide a clear quote after learning more about your needs.",
  },
  {
    q: "How long does a project take?",
    a: "Timelines vary depending on the project. Smaller automation projects can be completed quickly, while larger systems may take longer.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. We provide ongoing support, updates, and improvements after your system goes live.",
  },
  {
    q: "How do we get started?",
    a: (
      <>
        <a href="/book-a-call" target="_blank" className="underline">
          Book a call
        </a>{" "}
        or{" "}
        <a href="/contact" className="underline">
          contact us
        </a>{" "}
        with your requirements. We'll review your needs and recommend the best
        approach.
      </>
    ),
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="py-20 md:py-25 bg-[#f1f2f3]">
      <Container>
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.1] text-gray-900">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-[16px] text-gray-600 leading-[1.7]">
            Can't find what you're looking for?{" "}
            <a className="underline" href="/contact">
              Talk to us
            </a>
          </p>
        </div>
        {/* FAQ Grid */}
        <div className="mt-6 columns-1 lg:columns-2 gap-6">
          {faqs.map((faq, i) => {
            const open = openIndex === i;

            return (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white px-4 py-5 break-inside-avoid mb-6"
              >
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <p className="font-medium text-md text-gray-900">{faq.q}</p>
                  <i
                    className={`fa-solid fa-chevron-up text-gray-400 transition-transform ${
                      open ? "" : "-rotate-180"
                    }`}
                  />
                </button>

                {open && (
                  <div className="text-sm font-normal mt-6 text-gray-700 leading-[1.7]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
