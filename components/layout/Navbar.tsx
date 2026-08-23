"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";
import { MagneticButton } from "@/components/ui/MagneticButton";

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Always the floating pill — no separate transparent/top-of-page
           state to toggle, so the nav looks and reads the same whether the
           page behind it is a light section or the home hero's dark
           image. */}
        <div className="mx-auto flex max-w-[calc(var(--container-max)-2rem)] items-center justify-between rounded-full border border-line bg-surface/85 px-4 py-4 shadow-[var(--shadow-sm)] backdrop-blur-2xl mt-3">
          <Link
            href="/"
            className="flex translate-y-[6px] flex-col items-start gap-1 text-ink"
            aria-label="Royal Sarai Technologies — home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- plain
               <img>: next/image's optimizer rejects SVG sources unless
               images.dangerouslyAllowSVG is set, which isn't worth turning
               on for one static logo asset. */}
            <img
              src="/logo.svg"
              alt="Royal Sarai"
              width={2096}
              height={229}
              className="h-6 w-auto sm:h-7"
            />
            <span className="self-end text-[0.56rem] font-medium tracking-[0.22em] text-ink-faint sm:text-[0.62rem] sm:tracking-[0.28em]">
              TECHNOLOGIES
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {siteConfig.nav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "link-underline text-[0.78rem] font-semibold uppercase tracking-[0.09em] transition-colors hover:text-ink",
                    active ? "link-underline-active text-ink" : "text-ink-soft"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton href="/contact" variant="solid" cursorLabel="Go">
              Start a Project
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center justify-center rounded-full border border-line-strong p-2.5 text-ink lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="on-dark fixed inset-0 z-[100] flex flex-col bg-paper"
          >
            <div className="flex items-center justify-between px-[var(--edge)] py-7">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5 text-ink">
                {/* eslint-disable-next-line @next/next/no-img-element -- see header above */}
                <img src="/logo.svg" alt="Royal Sarai" width={2096} height={229} className="h-7 w-auto" />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-full border border-line-strong p-2.5 text-ink"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-[var(--edge)]">
              {siteConfig.nav.map((item, i) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-4 py-2.5 text-[clamp(2rem,7vw,3.2rem)] font-extrabold uppercase tracking-tight transition-colors hover:text-gold",
                        active ? "text-gold" : "text-ink"
                      )}
                    >
                      {item.label}
                      {active && (
                        <span className="size-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col gap-1 border-t border-line px-[var(--edge)] py-7 text-sm text-ink-soft"
            >
              <span>{siteConfig.location.city}, {siteConfig.location.country}</span>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-ink">
                {siteConfig.contact.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
