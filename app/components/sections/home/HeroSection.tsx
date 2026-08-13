"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import TrustedSlider from "@/app/components/sections/shared/TrustedSlider";
import Button from "@/app/components/ui/Button";

const aiPlatforms = [
  {
    name: "ChatGPT",
    logo: "/ai/chatgpt.svg",
  },
  {
    name: "Grok",
    logo: "/ai/grok.svg",
  },
  {
    name: "Claude",
    logo: "/ai/claude.svg",
  },
  {
    name: "Gemini",
    logo: "/ai/gemini.png",
  },
  {
    name: "Perplexity",
    logo: "/ai/perplexity.svg",
  },
];

export default function HeroSection() {
  const [platformIndex, setPlatformIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const currentPlatform = aiPlatforms[platformIndex];

  function handleStartProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return;

    router.push(`/contact?email=${encodeURIComponent(trimmed)}`);
  }

  useEffect(() => {
    const currentWord = currentPlatform.name;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));

          if (displayText === currentWord) {
            setTimeout(() => {
              setIsDeleting(true);
            }, 2600);
          }
        } else {
          setDisplayText(currentWord.slice(0, displayText.length - 1));

          if (displayText.length === 0) {
            setIsDeleting(false);

            setPlatformIndex((prev) => (prev + 1) % aiPlatforms.length);
          }
        }
      },
      isDeleting ? 120 : 95,
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPlatform, platformIndex]);

  return (
    <>
      {/* HERO */}
      <section id="hero" className="relative min-h-screen overflow-hidden">
        <div
          className="absolute hidden md:flex inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "cover",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-28">
          <div className="w-full max-w-[980px] text-center -mt-20">
            {/* Heading */}
            <h1 className="font-medium tracking-[-0.065em] text-black leading-[0.97] text-[34px] sm:text-[50px] md:text-[64px]">
              Building AI Systems
              <br />
              Powered By
              <span className="inline-flex items-center justify-center gap-3 mt-2 ml-3">
                {/* Logo */}
                <span className="relative flex items-center justify-center w-[34px] h-[34px] md:w-[50px] md:h-[50px]">
                  <Image
                    key={currentPlatform.logo}
                    src={currentPlatform.logo}
                    alt={currentPlatform.name}
                    fill
                    className="object-contain transition-all duration-500 ease-in-out"
                  />
                </span>

                {/* Text */}
                <span className="inline-block text-left min-w-[200px] md:min-w-[270px]">
                  {displayText}
                  <span className="animate-pulse font-light">|</span>
                </span>
              </span>
            </h1>

            {/* Sub Heading */}
            <p className="max-w-[600px] mx-auto mt-7 text-[15px] md:text-[16px] leading-[1.75] text-black/50">
              We build AI-powered systems for business operations, sales, and
              lead generation using advanced AI models and modern technology.
            </p>

            {/* CTA */}
            <div className="max-w-[600px] mx-auto mt-10">
              <form
                onSubmit={handleStartProject}
                className="flex flex-col md:flex-row items-center gap-3 md:gap-0 bg-white border border-gray-300 rounded-xl p-1"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[50px] px-5 bg-transparent outline-none text-[15px] text-black placeholder:text-black/35"
                />

                <Button type="submit" className="w-full md:w-auto shrink-0">
                  Start Your Project
                </Button>
              </form>

              <p className="mt-5 text-[13px] text-black/60">
                Need a custom AI system for your business?{" "}
                <a href="/book-a-call" target="_blank" className="underline">
                  Book a call
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="-mt-40 relative z-20 bg-[#f1f2f3] px-6 pb-20">
        <div className="max-w-[1100px] mx-auto">
          {/* White Frame */}
          <div className="p-[8px] bg-white rounded-3xl border border-black/15">
            <div className="relative overflow-hidden rounded-2xl bg-[#b7b7b7]">
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/25 z-10" />

              {/* Video */}
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/hero-video-poster.webp"
                className="w-full h-full object-cover"
              >
                <source
                  src="https://res.cloudinary.com/dqdlakwqs/video/upload/f_auto,q_auto:best/v1775742376/video_kvymlx.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Center Button */}
              <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
                <Link
                  href="/book-a-call"
                  target="_blank"
                  className="flex items-center gap-2 md:gap-3 px-5 sm:px-7 md:px-10 h-12 sm:h-14 md:h-[65px] rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-white text-sm sm:text-base md:text-[20px] font-normal transition-all duration-300 hover:bg-white/15 whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />

                  <span>Schedule a Call</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <TrustedSlider />
      </section>
    </>
  );
}
