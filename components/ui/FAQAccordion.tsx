"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { Stagger } from "@/components/ui/Reveal";

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({
  items,
  className,
  defaultOpen = 0,
}: {
  items: FAQItem[];
  className?: string;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <Stagger className={cn("flex flex-col border-t border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} data-reveal className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="text-base font-semibold text-ink sm:text-lg">
                {item.question}
              </span>
              <Plus
                className={cn(
                  "size-5 shrink-0 text-ink-faint transition-transform duration-300",
                  isOpen && "rotate-45 text-blue"
                )}
              />
            </button>
            <div
              className="grid transition-all duration-400 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-sm leading-relaxed text-ink-soft">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </Stagger>
  );
}
