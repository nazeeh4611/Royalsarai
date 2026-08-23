"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function CallWidget() {
  const [open, setOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    // One-time capability detection on mount — matchMedia is unavailable
    // during SSR, so this can't be derived any other way.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const hoverHandlers = canHover
    ? {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
      }
    : {};

  return (
    <div
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end sm:bottom-7 sm:right-7"
      {...hoverHandlers}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-[19rem] max-w-[calc(100vw-2.5rem)] origin-bottom-right rounded-[var(--radius-lg)] border border-line bg-surface p-5 shadow-[var(--shadow-lg)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-full bg-ink text-paper">
                  <Phone className="size-[18px]" strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold text-ink">
                  Royal Sarai Technologies
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex size-7 shrink-0 items-center justify-center rounded-full text-ink-faint transition-colors hover:text-ink"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Prefer to talk? Give us a call — we&rsquo;re happy to help.
            </p>

            <a
              href={siteConfig.contact.phoneHref}
              className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-indigo"
            >
              Call Now
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Call us"
        className="relative flex size-14 items-center justify-center rounded-full bg-ink text-paper shadow-[var(--shadow-lg)] transition-transform duration-300 hover:scale-105"
      >
        {!open && (
          <span
            aria-hidden="true"
            className="breathe-ring absolute inset-0 rounded-full border-2 border-ink"
          />
        )}
        <Phone className="size-6" strokeWidth={2} />
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 size-3 rounded-full border-2 border-paper bg-blue"
        />
      </button>
    </div>
  );
}
