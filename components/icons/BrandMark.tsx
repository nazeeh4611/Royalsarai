export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="1" width="38" height="38" rx="11" stroke="currentColor" strokeOpacity="0.22" />
      <path
        d="M11 27V16.5C11 13.5 13.2 11 17 11C20.8 11 23 13.2 23 16C23 18.5 21.2 20.2 18.5 20.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M11 20.6H17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M18.5 20.6L24 27"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="28.5" cy="12" r="2.1" fill="var(--gold)" />
    </svg>
  );
}

export function WordMark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="block font-extrabold tracking-[0.02em] leading-[0.95]">
        ROYAL SARAI
      </span>
      <span className="block text-[0.6em] font-medium tracking-[0.32em] text-current/60 mt-0.5">
        TECHNOLOGIES
      </span>
    </span>
  );
}
