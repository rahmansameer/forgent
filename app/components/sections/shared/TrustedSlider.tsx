"use client";

import Container from "../../ui/Container";
import Image from "next/image";

const logos = [
  "/logos/1.svg",
  "/logos/2.svg",
  "/logos/3.svg",
  "/logos/4.svg",
  "/logos/6.svg",
  "/logos/7.svg",
  "/logos/8.svg",
];

export default function TrustedCompaniesSection() {
  return (
    <section className="py-10 md:py-[60px] overflow-hidden">
      <Container>
        <p className="text-center text-gray-500 mb-10 text-md">
          Trusted by modern ecosystems
        </p>

        <div className="relative overflow-hidden max-w-5xl mx-auto">
          {/* Fades */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-10 sm:w-16 md:w-24 bg-gradient-to-r from-[#f1f2f3] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-16 md:w-24 bg-gradient-to-l from-[#f1f2f3] to-transparent z-10" />

          {/* Track */}
          <div className="flex w-max marquee-track">
            {/* First set */}
            <div className="flex items-center gap-10 pr-10">
              {logos.map((logo, i) => (
                <Logo key={`a-${i}`} src={logo} />
              ))}
            </div>

            {/* Second set (duplicate for infinite loop) */}
            <div className="flex items-center gap-10 pr-10">
              {logos.map((logo, i) => (
                <Logo key={`b-${i}`} src={logo} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Logo({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt="Company logo"
      width={140}
      height={60}
      className="h-7 w-auto object-contain brightness-0 opacity-80"
    />
  );
}
