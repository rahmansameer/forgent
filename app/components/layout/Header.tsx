"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/app/components/ui/Button";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
    fixed top-0 left-0 right-0 z-50

    ${
      !isHomePage || scrolled || open
        ? "bg-white border-b border-gray-200"
        : "bg-transparent"
    }
  `}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="h-[70px] flex items-center">
          {/* Logo */}
          <div className="flex-1">
            <Link href="/" className="w-fit">
              <Image
                src="/nav-logo.png"
                alt="Forgent"
                width={160}
                height={40}
                className="h-9 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center gap-14">
            <Link
              href="/"
              className="text-[16px] font-medium text-gray-900 hover:text-black transition-colors"
            >
              Home
            </Link>

            <Link
              href="/#services"
              className="text-[16px] font-medium text-gray-900 hover:text-black transition-colors"
            >
              Services
            </Link>

            <Link
              href="/#pricing"
              className="text-[16px] font-medium text-gray-900 hover:text-black transition-colors"
            >
              Pricing
            </Link>

            <Link
              href="/#faqs"
              className="text-[16px] font-medium text-gray-900 hover:text-black transition-colors"
            >
              FAQs
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex flex-1 justify-end">
            <Link href="/book-a-call" target="_blank" rel="noopener noreferrer">
              <Button>Book a Call</Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="
              lg:hidden
              ml-auto
              h-10
              w-10
              flex
              items-center
              justify-center
            "
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle Menu"
          >
            <i
              className={`fa-solid ${
                open ? "fa-xmark" : "fa-bars"
              } text-xl text-gray-700 transition-all duration-200`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            lg:hidden
            overflow-hidden
            transition-all
            duration-300
            ease-in-out
            ${open ? "max-h-[500px]" : "max-h-0"}
          `}
        >
          <div className="py-3">
            <div className="flex flex-col">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="
                  px-2
                  py-4
                  text-base
                  font-medium
                  text-gray-900
                "
              >
                Home
              </Link>

              <Link
                href="/#services"
                onClick={() => setOpen(false)}
                className="
                  px-2
                  py-4
                  text-base
                  font-medium
                  text-gray-900
                "
              >
                Services
              </Link>

              <Link
                href="/#pricing"
                onClick={() => setOpen(false)}
                className="
                  px-2
                  py-4
                  text-base
                  font-medium
                  text-gray-900
                "
              >
                Pricing
              </Link>

              <Link
                href="/#faqs"
                onClick={() => setOpen(false)}
                className="
                  px-2
                  py-4
                  text-base
                  font-medium
                  text-gray-900
                "
              >
                FAQs
              </Link>

              <div className="pt-4 pb-2">
                <Link
                  href="/book-a-call"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full">Book a Call</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
