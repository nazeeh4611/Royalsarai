const gradients: Record<string, [string, string]> = {
  indigo: ["#170f52", "#3b2fd9"],
  violet: ["#170f52", "#8b5cf6"],
  gold: ["#170f52", "#00d4ff"],
  blue: ["#170f52", "#2f5bff"],
};

export type SceneVariant = "skyline" | "grid" | "mesh" | "waves" | "stack";

interface AbstractSceneProps {
  variant: SceneVariant;
  alt: string;
  tone?: keyof typeof gradients;
}

/**
 * Custom illustrated placeholder used wherever real photography would
 * otherwise sit. Each variant renders a distinct abstract composition so
 * repeated use across pages doesn't read as one recycled graphic. The
 * `alt` text is preserved for assistive tech / SEO exactly as it would be
 * on a real <Image>, so nothing needs to change once real photos land.
 */
export function AbstractScene({ variant, alt, tone = "indigo" }: AbstractSceneProps) {
  const [from, to] = gradients[tone];

  return (
    <div
      role="img"
      aria-label={alt}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(155deg, ${from}, ${to})` }}
    >
      <svg viewBox="0 0 400 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {variant === "skyline" && <SkylineArt />}
        {variant === "grid" && <GridArt />}
        {variant === "mesh" && <MeshArt />}
        {variant === "waves" && <WavesArt />}
        {variant === "stack" && <StackArt />}
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_10%_0%,rgba(255,255,255,0.14),transparent)]" />
    </div>
  );
}

function SkylineArt() {
  const bars = [
    { x: 30, w: 34, h: 170 },
    { x: 74, w: 26, h: 230 },
    { x: 110, w: 40, h: 130 },
    { x: 160, w: 22, h: 280 },
    { x: 192, w: 30, h: 190 },
    { x: 232, w: 44, h: 240 },
    { x: 286, w: 24, h: 150 },
    { x: 320, w: 34, h: 210 },
  ];
  return (
    <g>
      <line x1="0" y1="330" x2="400" y2="330" stroke="#ffffff" strokeOpacity="0.16" />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={330 - b.h}
          width={b.w}
          height={b.h}
          rx="2"
          fill="#ffffff"
          fillOpacity={0.08 + (i % 3) * 0.05}
        />
      ))}
      <circle cx="340" cy="70" r="3" fill="#00d4ff" />
    </g>
  );
}

function GridArt() {
  const cells = [];
  for (let x = 20; x < 380; x += 40) {
    for (let y = 20; y < 380; y += 40) {
      cells.push({ x, y });
    }
  }
  return (
    <g>
      {cells.map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={c.y}
          width="18"
          height="18"
          rx="3"
          fill="#ffffff"
          fillOpacity={(i * 37) % 5 === 0 ? 0.28 : 0.07}
        />
      ))}
      <rect x="180" y="180" width="18" height="18" rx="3" fill="#00d4ff" fillOpacity="0.9" />
    </g>
  );
}

function MeshArt() {
  const nodes = [
    [200, 200],
    [90, 110],
    [310, 100],
    [70, 300],
    [330, 300],
    [200, 60],
    [200, 340],
  ];
  return (
    <g>
      {nodes.slice(1).map(([x, y], i) => (
        <line key={i} x1="200" y1="200" x2={x} y2={y} stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 7 : 4} fill={i === 0 ? "#00d4ff" : "#ffffff"} fillOpacity={i === 0 ? 1 : 0.6} />
      ))}
    </g>
  );
}

function WavesArt() {
  return (
    <g fill="none" stroke="#ffffff">
      <path d="M-20 140C60 100 120 180 200 140S340 80 420 120" strokeOpacity="0.2" strokeWidth="1.5" />
      <path d="M-20 200C60 160 120 240 200 200S340 140 420 180" strokeOpacity="0.28" strokeWidth="1.5" />
      <path d="M-20 260C60 220 120 300 200 260S340 200 420 240" strokeOpacity="0.16" strokeWidth="1.5" />
      <circle cx="300" cy="150" r="3" fill="#00d4ff" stroke="none" />
    </g>
  );
}

function StackArt() {
  return (
    <g>
      <rect x="90" y="230" width="220" height="70" rx="14" fill="#ffffff" fillOpacity="0.09" />
      <rect x="110" y="180" width="220" height="70" rx="14" fill="#ffffff" fillOpacity="0.14" />
      <rect x="70" y="130" width="220" height="70" rx="14" fill="#ffffff" fillOpacity="0.22" />
      <circle cx="260" cy="120" r="3" fill="#00d4ff" />
    </g>
  );
}
