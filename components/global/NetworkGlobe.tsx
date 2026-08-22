"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const nodes = [
  { x: 620, y: 120 },
  { x: 760, y: 260 },
  { x: 130, y: 180 },
  { x: 90, y: 420 },
  { x: 700, y: 470 },
  { x: 250, y: 500 },
  { x: 500, y: 90 },
];

export function NetworkGlobe() {
  const rotorRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(rotorRef.current, {
        rotate: 360,
        transformOrigin: "400px 300px",
        duration: 90,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" aria-hidden="true">
      <circle cx="400" cy="300" r="220" stroke="currentColor" strokeOpacity="0.12" fill="none" />
      <circle cx="400" cy="300" r="150" stroke="currentColor" strokeOpacity="0.16" fill="none" />
      <ellipse cx="400" cy="300" rx="220" ry="80" stroke="currentColor" strokeOpacity="0.1" fill="none" />

      <g ref={rotorRef}>
        {nodes.map((n, i) => (
          <line
            key={i}
            x1="400"
            y1="300"
            x2={n.x}
            y2={n.y}
            stroke="#c6a568"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="3.5" fill="#f9f6f0" fillOpacity="0.7" />
        ))}
      </g>

      <circle cx="400" cy="300" r="9" fill="#c6a568" />
      <text
        x="400"
        y="330"
        textAnchor="middle"
        fill="currentColor"
        fontSize="11"
        letterSpacing="2"
        opacity="0.7"
      >
        DUBAI
      </text>
    </svg>
  );
}
