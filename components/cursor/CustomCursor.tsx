"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorState {
  setLabel: (label: string | null) => void;
}

const CursorContext = createContext<CursorState>({ setLabel: () => {} });

export function useCursor() {
  return useContext(CursorContext);
}

/**
 * Mounts once in the root layout. Renders nothing on touch devices or when
 * the visitor prefers reduced motion — the native cursor is left untouched
 * in both cases.
 */
export function CursorProvider({ children }: { children: ReactNode }) {
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 700, damping: 44, mass: 0.35 });
  const dotY = useSpring(y, { stiffness: 700, damping: 44, mass: 0.35 });
  const ringX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    // One-time capability detection on mount — window/matchMedia are
    // unavailable during SSR, so this can't be derived any other way.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  return (
    <CursorContext.Provider value={{ setLabel }}>
      {children}
      {enabled && (
        <>
          <motion.div
            aria-hidden
            style={{ x: dotX, y: dotY }}
            className="pointer-events-none fixed left-0 top-0 z-[999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
          >
            <motion.span
              animate={{ scale: pressed ? 0.6 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="block h-2 w-2 rounded-full bg-white"
            />
          </motion.div>

          <motion.div
            aria-hidden
            style={{ x: ringX, y: ringY }}
            className="pointer-events-none fixed left-0 top-0 z-[998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
          >
            <motion.div
              animate={{
                width: label ? 88 : pressed ? 28 : 42,
                height: label ? 88 : pressed ? 28 : 42,
                opacity: label ? 1 : 0.7,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="flex items-center justify-center rounded-full border border-white text-[10px] font-semibold uppercase tracking-[0.16em] text-white"
            >
              {label}
            </motion.div>
          </motion.div>
        </>
      )}
    </CursorContext.Provider>
  );
}
