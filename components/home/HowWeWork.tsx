import { Reveal } from "@/components/ui/Reveal";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";

export function HowWeWork() {
  return (
    <section className="border-t border-line bg-paper py-16 lg:py-24">
      <div className="edge container-max">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
              How we work
            </span>
            <h2 className="mt-5 text-[clamp(2.2rem,4.2vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ink text-balance">
              The same disciplined process, every time.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-ink-soft lg:max-w-md">
              Six phases, one accountable team — from first conversation to a
              system that keeps evolving after launch.
            </p>
          </Reveal>
        </div>
        <div className="mt-10 lg:mt-14">
          <ProcessTimeline />
        </div>
      </div>
    </section>
  );
}
