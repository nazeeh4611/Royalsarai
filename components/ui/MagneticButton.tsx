"use client";

import Link from "next/link";
import { useCallback, useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCursor } from "@/components/cursor/CustomCursor";

type Variant = "solid" | "outline" | "ghost";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  cursorLabel?: string;
  showArrow?: boolean;
  strength?: number;
}

const variantClasses: Record<Variant, string> = {
  solid:
    "bg-ink text-paper transition-colors duration-200 hover:bg-blue hover:text-white focus-visible:bg-blue focus-visible:text-white",
  outline:
    "border border-line text-ink bg-paper transition-colors duration-200 hover:bg-gold hover:border-blue/30",
  ghost: "text-ink bg-transparent transition-colors duration-200 hover:text-blue",
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  cursorLabel,
  showArrow = true,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { setLabel } = useCursor();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 16 });
  const sy = useSpring(my, { stiffness: 180, damping: 16 });

  const onMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - (r.left + r.width / 2)) * strength);
      my.set((e.clientY - (r.top + r.height / 2)) * strength);
    },
    [mx, my, strength]
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
    if (cursorLabel) setLabel(null);
  }, [mx, my, cursorLabel, setLabel]);

  const onEnter = useCallback(() => {
    if (cursorLabel) setLabel(cursorLabel);
  }, [cursorLabel, setLabel]);

  const isFilled = variant !== "ghost";

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className={cn(
        "group inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors duration-200",
        isFilled && "rounded-[var(--radius-sm)] px-[18px] py-[10px]",
        variantClasses[variant],
        className
      )}
    >
      {children}
      {showArrow && (
        <ArrowUpRight
          className="size-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      )}
    </motion.span>
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onEnter}
      className="inline-block"
    >
      {href ? (
        <Link href={href} className="inline-block">
          {inner}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className="inline-block">
          {inner}
        </button>
      )}
    </div>
  );
}
