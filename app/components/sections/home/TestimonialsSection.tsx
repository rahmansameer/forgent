"use client";

import { useState } from "react";
import Image from "next/image";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  image?: string; // leave undefined/empty to use default-profile.png
};

const DEFAULT_AVATAR = "/default-profile.png";

const testimonialsRow1: Testimonial[] = [
  {
    id: "r1-1",
    name: "Michael Carter",
    role: "Founder, ScaleFlow",
    text: "Working with forgent made our day-to-day operations much easier. They built a system that fit our workflow perfectly, and we've already noticed a big improvement in how efficiently our team works.",
    image: "/testimonial-profile1.png",
  },
  {
    id: "r1-2",
    name: "Emily Thompson",
    role: "Operations Manager, BrightCore",
    text: "The whole experience was smooth from start to finish. Communication was clear, deadlines were met, and the automation they built has saved our team several hours every single week.",
  },
  {
    id: "r1-3",
    name: "James Wilson",
    role: "CEO, Nova Digital",
    text: "We had several repetitive tasks slowing us down. After everything was automated, our team could focus on more important work instead of doing the same things over and over again.",
  },
  {
    id: "r1-4",
    name: "Sophia Bennett",
    role: "Marketing Director, Elevate Studio",
    text: "They understood our business quickly and built exactly what we needed. The new workflow has been reliable, easy to use, and has made our internal process much more organized.",
  },
];

const testimonialsRow2: Testimonial[] = [
  {
    id: "r2-1",
    name: "Daniel Harris",
    role: "Founder, Horizon Labs",
    text: "Great communication throughout the project and everything was delivered on time. The final system worked exactly as discussed and integrated nicely with our existing tools.",
  },
  {
    id: "r2-2",
    name: "Olivia Parker",
    role: "COO, Nexora",
    text: "We wanted a simpler way to manage several manual processes, and that's exactly what we got. The automations have been reliable and have reduced a lot of unnecessary work for our team.",
  },
  {
    id: "r2-3",
    name: "Ryan Mitchell",
    role: "Founder, PixelNest",
    text: "It was refreshing to work with a team that actually listened to what we needed. The solution felt custom to our business rather than something built from a generic template.",
  },
  {
    id: "r2-4",
    name: "Charlotte Adams",
    role: "Owner, Craftly Co.",
    text: "The results have been better than we expected. Our workflow is faster, everything is easier to track, and we've been able to save a lot of time every week since the launch.",
  },
];
function Avatar({ src, alt }: { src?: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(
    src && src.length > 0 ? src : DEFAULT_AVATAR,
  );

  return (
    <div className="relative h-[46px] w-[46px] shrink-0 overflow-hidden rounded-full bg-[#e5e5e5]">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="46px"
        className="object-cover"
        onError={() => setImgSrc(DEFAULT_AVATAR)}
      />
    </div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div
      className="flex w-[360px] shrink-0 flex-col gap-4 rounded-2xl border bg-[#F7F8F9] hover:cursor-pointer p-6"
      style={{ borderColor: "#dddddd" }}
    >
      <div className="flex items-center gap-3">
        <Avatar src={item.image} alt={item.name} />
        <div className="flex flex-col gap-2">
          <span className="text-[16px] font-medium leading-tight text-[#333333]">
            {item.name}
          </span>
          <span className="text-[12px] font-normal leading-tight text-[#333333]">
            {item.role}
          </span>
        </div>
      </div>
      <p className="text-[16px] leading-relaxed text-[#333333]">{item.text}</p>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: Testimonial[];
  direction: "left" | "right";
}) {
  // duplicate the list so the CSS animation loops seamlessly
  const looped = [...items, ...items];

  return (
    <div className="group relative w-full overflow-hidden">
      <div
        className={`flex w-max gap-6 ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        } group-hover:[animation-play-state:paused]`}
      >
        {looped.map((item, idx) => (
          <TestimonialCard key={`${item.id}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="w-full py-20" style={{ backgroundColor: "#F1F2F3" }}>
      <div className="mx-auto max-w-[980px] text-center">
        <h2 className="text-[30px] md:text-[38px] leading-[1.1] font-semibold text-black">
          Trusted by Growing Businesses
        </h2>

        <p className="mt-4 text-[16px] leading-[1.7] text-black/60">
          Read what our clients say about the results we've delivered.
        </p>
      </div>

      <div className="flex flex-col gap-6 mt-20">
        <MarqueeRow items={testimonialsRow1} direction="left" />
        <MarqueeRow items={testimonialsRow2} direction="right" />
      </div>

      <style jsx global>{`
        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left,
          .animate-marquee-right {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
