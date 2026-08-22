import Image from "next/image";
import { cn } from "@/lib/cn";

export type BackgroundVariant = "orbs" | "network" | "circuit" | "grid";

interface AbstractBackgroundProps {
  variant: BackgroundVariant;
  /** Real photo path, once available — drops in without restructuring the
   * calling section. Falls back to the generated abstract composition. */
  src?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Full-bleed section backdrop: glowing colour-blocked orbs plus a themed
 * line-art layer (grid / circuit / network / particle field), all drawn
 * from the design tokens in globals.css. Renders a real next/image instead
 * once `src` is supplied — the section around it never needs to change.
 */
export function AbstractBackground({
  variant,
  src,
  alt = "",
  priority,
  className,
}: AbstractBackgroundProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn("object-cover", className)}
        sizes="100vw"
      />
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: "var(--indigo-dark)" }} />
      <div
        className="absolute -left-[10%] -top-[25%] h-[70%] w-[60%] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--violet) 60%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute -right-[15%] top-[25%] h-[65%] w-[55%] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--gold) 45%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-[25%] left-[15%] h-[55%] w-[55%] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--blue) 42%, transparent), transparent 70%)",
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 800"
        aria-hidden="true"
      >
        {variant === "grid" && <GridPattern />}
        {variant === "circuit" && <CircuitPattern />}
        {variant === "network" && <NetworkPattern />}
        {variant === "orbs" && <DotField />}
      </svg>
    </div>
  );
}

function GridPattern() {
  const vertical = Array.from({ length: 21 }, (_, i) => i * 60);
  const horizontal = Array.from({ length: 14 }, (_, i) => i * 60);
  return (
    <g style={{ stroke: "var(--ink)", strokeOpacity: 0.14 }}>
      {vertical.map((x) => (
        <line key={`v${x}`} x1={x} y1={0} x2={x} y2={800} />
      ))}
      {horizontal.map((y) => (
        <line key={`h${y}`} x1={0} y1={y} x2={1200} y2={y} />
      ))}
      <circle cx="480" cy="300" r="5" style={{ fill: "var(--gold)", stroke: "none" }} />
      <circle cx="900" cy="540" r="4" style={{ fill: "var(--gold)", stroke: "none", opacity: 0.7 }} />
      <circle cx="240" cy="620" r="3.5" style={{ fill: "var(--ink)", stroke: "none", opacity: 0.4 }} />
    </g>
  );
}

function CircuitPattern() {
  const traces = [
    "M0 120 H260 V300 H540",
    "M1200 200 H900 V80 H620",
    "M0 460 H180 V620 H460 V740",
    "M1200 640 H960 V420 H700",
    "M340 800 V600 H60",
    "M860 0 V180 H1080 V360",
  ];
  const nodes = [
    [540, 300],
    [620, 80],
    [460, 620],
    [700, 420],
    [1080, 360],
    [260, 120],
  ];
  return (
    <g fill="none">
      {traces.map((d, i) => (
        <path
          key={i}
          d={d}
          style={{ stroke: "var(--ink)", strokeOpacity: 0.18, strokeWidth: 1.5 }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 2 === 0 ? 5 : 3.5}
          style={{ fill: "var(--gold)", opacity: i % 2 === 0 ? 0.95 : 0.55 }}
        />
      ))}
    </g>
  );
}

function NetworkPattern() {
  const nodes: [number, number][] = [
    [600, 400],
    [280, 220],
    [920, 200],
    [180, 560],
    [1020, 580],
    [600, 100],
    [600, 700],
    [400, 460],
    [820, 440],
  ];
  const [hub] = nodes;
  return (
    <g>
      {nodes.slice(1).map(([x, y], i) => (
        <line
          key={i}
          x1={hub[0]}
          y1={hub[1]}
          x2={x}
          y2={y}
          style={{ stroke: "var(--ink)", strokeOpacity: 0.2, strokeWidth: 1 }}
        />
      ))}
      <line
        x1={nodes[1][0]}
        y1={nodes[1][1]}
        x2={nodes[5][0]}
        y2={nodes[5][1]}
        style={{ stroke: "var(--ink)", strokeOpacity: 0.14, strokeWidth: 1 }}
      />
      <line
        x1={nodes[3][0]}
        y1={nodes[3][1]}
        x2={nodes[7][0]}
        y2={nodes[7][1]}
        style={{ stroke: "var(--ink)", strokeOpacity: 0.14, strokeWidth: 1 }}
      />
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 0 ? 8 : 4}
          style={{ fill: i === 0 ? "var(--gold)" : "var(--ink)", opacity: i === 0 ? 1 : 0.55 }}
        />
      ))}
    </g>
  );
}

function DotField() {
  const dots = Array.from({ length: 60 }, (_, i) => {
    const x = (i * 137) % 1200;
    const y = (i * 271) % 800;
    return { x, y, r: 1.5 + ((i * 7) % 3), accent: i % 9 === 0 };
  });
  return (
    <g>
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.accent ? d.r + 2.5 : d.r}
          style={{
            fill: d.accent ? "var(--gold)" : "var(--ink)",
            opacity: d.accent ? 0.85 : 0.22,
          }}
        />
      ))}
    </g>
  );
}
