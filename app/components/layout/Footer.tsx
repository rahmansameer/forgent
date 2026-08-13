"use client";
import Image from "next/image";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus("idle");

    // Simulated subscription — no backend call.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setStatus("success");
    setEmail("");
    setLoading(false);
  }

  return (
    <footer className=" bg-black text-white">
      <Container>
        <div className="py-20 text-gray-100">
          <div className="flex flex-col gap-10 md:flex-row justify-between">
            <div className="flex flex-col gap-5 max-w-md" id="newsletter">
              <h1 className="text-[26px] font-medium text-white">
                Join Our Newsletter
              </h1>

              <form
                onSubmit={handleSubmit}
                className="border border-[#434446] w-full rounded-lg flex gap-3 items-center p-1 bg-[#22252A]"
              >
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent focus:outline-none px-3 text-[16px] text-white placeholder:text-gray-400"
                />

                <Button type="submit" className="h-[44px] px-5 rounded-md">
                  {loading
                    ? "Subscribing..."
                    : status === "success"
                      ? "Subscribed"
                      : "Subscribe"}
                </Button>
              </form>
            </div>

            <div>
              <h4 className="text-[17px] font-normal mb-4">Explore</h4>
              <ul className="space-y-3 font-light text-[16px] text-[#CCCCCC]">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/#services">Services</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[17px] font-normal mb-4">Resources</h4>
              <ul className="space-y-3 font-light text-[16px] text-[#CCCCCC]">
                <li>
                  <Link href="/">Playbooks</Link>
                </li>
                <li>
                  <Link href="/">Case Studies</Link>
                </li>
                <li>
                  <Link href="/">Newsletter</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[17px] font-normal mb-4">Policies</h4>
              <ul className="space-y-3 font-light text-[16px] text-[#CCCCCC]">
                <li>
                  <Link href="/legal/privacy-policy">Privacy</Link>
                </li>
                <li>
                  <Link href="/legal/terms-of-service">Terms</Link>
                </li>
                <li>
                  <Link href="/legal/refund-policy">Refund</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="h-px w-full bg-[#434446] my-10"></div>

          <div className="flex flex-wrap md:flex-row gap-8 justify-between items-center">
            <p className="text-[15px] text-gray-400">
              © 2026, Forgent Systems LLC, All Rights Reserved.
            </p>

            <div className="flex gap-6 text-gray-400 text-[22px]">
              <a href="mailto:hello@forgentsystems.com" className="transition">
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a target="_blank" rel="noopener noreferrer" href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a target="_blank" rel="noopener noreferrer" href="#">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a target="_blank" rel="noopener noreferrer" href="#">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/10" />

          <Image
            src="/letter-logo.png"
            alt="Logo"
            width={2000}
            height={500}
            className="w-full h-auto object-contain opacity-15"
            priority
          />
        </div>
      </Container>
    </footer>
  );
}
