const REPEATS = 8;

/** Decorative, continuously-scrolling wordmark band used as a section
 * divider. Purely a typographic brand moment — hidden from assistive tech
 * since it repeats the same text with no additional meaning. */
export function WordmarkMarquee() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-line bg-paper-dim py-9 lg:py-11"
    >
      <div className="marquee-track flex w-max items-center">
        {Array.from({ length: REPEATS }).map((_, i) => (
          <span
            key={i}
            className="mx-8 flex shrink-0 items-center gap-8 text-[clamp(1.6rem,3.8vw,3rem)] font-extrabold uppercase leading-none tracking-[-0.01em] text-ink/85"
          >
            Royal Sarai Technologies
            <span className="size-2 shrink-0 rounded-full bg-ink/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
