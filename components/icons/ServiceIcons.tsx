import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Web Design & Development — layered browser frame with a grid layout */
export function WebDesignIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="9" width="36" height="27" rx="4" stroke="currentColor" />
      <path d="M6 16.5H42" stroke="currentColor" />
      <circle cx="11" cy="12.7" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12.7" r="1" fill="currentColor" stroke="none" />
      <path d="M17 23H37" stroke="currentColor" opacity="0.55" />
      <path d="M17 28.5H31" stroke="currentColor" opacity="0.55" />
      <rect x="11" y="21.2" width="4" height="9.5" rx="1" stroke="currentColor" opacity="0.85" />
    </svg>
  );
}

/** Data Management & Cyber Security — shield with a data lattice */
export function CyberSecurityIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M24 6.5L39 12v10.5C39 32 32.8 38.6 24 41.5C15.2 38.6 9 32 9 22.5V12L24 6.5Z"
        stroke="currentColor"
      />
      <path d="M17.5 22.5L22 27L31 17" stroke="currentColor" opacity="0.9" />
      <circle cx="17.5" cy="22.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="31" cy="17" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Computer Systems & Software — interconnected device nodes */
export function SystemsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="10" width="18" height="12" rx="2.5" stroke="currentColor" />
      <path d="M13 26.5H19" stroke="currentColor" />
      <path d="M16 22V26.5" stroke="currentColor" />
      <rect x="28" y="24" width="13" height="14" rx="2.5" stroke="currentColor" opacity="0.9" />
      <path d="M32 30.5H37M32 34H37" stroke="currentColor" opacity="0.7" />
      <path d="M25 16H28.5" stroke="currentColor" opacity="0.6" />
      <circle cx="30.5" cy="16" r="2" stroke="currentColor" opacity="0.6" />
    </svg>
  );
}

/** IT Network Services — hub and spoke mesh */
export function NetworkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="4.2" stroke="currentColor" />
      <circle cx="24" cy="8.5" r="2.6" stroke="currentColor" opacity="0.85" />
      <circle cx="39" cy="18" r="2.6" stroke="currentColor" opacity="0.85" />
      <circle cx="39" cy="33" r="2.6" stroke="currentColor" opacity="0.85" />
      <circle cx="9" cy="33" r="2.6" stroke="currentColor" opacity="0.85" />
      <circle cx="9" cy="18" r="2.6" stroke="currentColor" opacity="0.85" />
      <path
        d="M24 19.8V11M27.5 21.5L36.7 19.2M27 27L36.7 31.3M21 27.3L11.3 31.3M21 21.3L11.3 19.2"
        stroke="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}
