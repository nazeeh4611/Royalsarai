import type { Metadata } from "next";
import { MagneticButton } from "@/components/ui/MagneticButton";

// 404s aren't real content — keeping them out of the index avoids search
// engines crawling/ranking a page whose only job is to say "not found".
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="edge container-max flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
        404
      </span>
      <h1 className="mt-6 text-[clamp(2.3rem,5vw,3.6rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink">
        Page not found
      </h1>
      <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <div className="mt-9">
        <MagneticButton href="/" cursorLabel="Go">
          Back to homepage
        </MagneticButton>
      </div>
    </section>
  );
}
