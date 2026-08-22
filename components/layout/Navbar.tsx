"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";
import { BrandMark } from "@/components/icons/BrandMark";
import { MagneticButton } from "@/components/ui/MagneticButton";

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Only the homepage opens on a dark, full-bleed hero — every other route's
  // PageHero is light, so dark nav text already reads fine there even before
  // any scrolling has happened. Once the user scrolls (or open) the floating
  // light surface takes over everywhere, so this only matters pre-scroll.
  const isHome = pathname === "/";
  const lightNav = isHome && !scrolled;

  useEffect(() => {
    // Two thresholds, not one: with Lenis easing the scroll position,
    // a single cutoff flips back and forth every time the eased value
    // settles near it. Entering "floating" state takes a bigger scroll
    // than leaving it, so hovering near the boundary doesn't flicker.
    let isScrolled = false;
    let frame = 0;

    const evaluate = () => {
      const y = window.scrollY;
      const next = isScrolled ? y > 12 : y > 56;
      if (next !== isScrolled) {
        isScrolled = next;
        setScrolled(next);
      }
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          style={{
            // Driven directly instead of via a Tailwind backdrop-blur-*
            // class: transitioning between "no backdrop-filter at all"
            // and "blur(24px)" can't interpolate (one side has no
            // <filter-function-list> to animate from), so the glass
            // effect used to pop in/out instead of fading. Two blur()
            // values of different amounts interpolate correctly.
            backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
            WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
          }}
          className={cn(
            // Border width and vertical padding are identical between both
            // states (only colour/margin/max-width/radius differ) so the
            // hairline never "pops" in at a different width and the logo/
            // nav never drift vertically when the state flips.
            "mx-auto flex items-center justify-between border transition-all duration-500 ease-out",
            scrolled
              ? "mt-3 max-w-[calc(var(--container-max)-2rem)] rounded-full border-line bg-surface/85 px-4 py-4 shadow-[var(--shadow-sm)]"
              : "mt-0 w-full max-w-[100vw] rounded-none border-transparent bg-transparent px-[var(--edge)] py-7 shadow-none"
          )}
        >
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2.5 transition-colors duration-300",
              lightNav ? "text-white" : "text-ink"
            )}
            aria-label="Royal Sarai Technologies — home"
          >
            <BrandMark
              className={cn(
                "h-8 w-8 transition-colors duration-300",
                lightNav ? "text-white" : "text-indigo"
              )}
            />
            <span className="hidden text-[0.78rem] leading-[1.05] sm:block">
              <span className="block font-extrabold tracking-[0.03em]">
                ROYAL SARAI
              </span>
              <span
                className={cn(
                  "block text-[0.62rem] font-medium tracking-[0.28em] transition-colors duration-300",
                  lightNav ? "text-white/65" : "text-ink-faint"
                )}
              >
                TECHNOLOGIES
              </span>
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
                    "link-underline text-[0.78rem] font-semibold uppercase tracking-[0.09em] transition-colors duration-300",
                    lightNav
                      ? cn("hover:text-white", active ? "link-underline-active text-white" : "text-white/70")
                      : cn("hover:text-ink", active ? "link-underline-active text-ink" : "text-ink-soft")
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton
              href="/contact"
              variant="solid"
              cursorLabel="Go"
              className={cn(
                "transition-colors duration-300",
                lightNav && "!bg-white !text-ink hover:!bg-white/90 focus-visible:!bg-white/90"
              )}
            >
              Start a Project
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              "flex items-center justify-center rounded-full border p-2.5 transition-colors duration-300 lg:hidden",
              lightNav ? "border-white/30 text-white" : "border-line-strong text-ink"
            )}
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
                <BrandMark className="h-8 w-8 text-gold" />
                <span className="text-[0.78rem] font-extrabold tracking-[0.03em]">
                  ROYAL SARAI
                </span>
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
