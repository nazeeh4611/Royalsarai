import { Reveal } from "@/components/ui/Reveal";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";

export function HowWeWork() {
  return (
    <section className="border-t border-line bg-paper py-16 lg:py-24">
      <div className="edge container-max">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
            How we work
          </span>
          <h2 className="mt-5 text-[clamp(2.2rem,4.2vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-ink text-balance">
            The same disciplined process, every time.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Six phases, one accountable team — from first conversation to a
            system that keeps evolving after launch.
          </p>
        </Reveal>
        <div className="mt-10 lg:mt-14">
          <ProcessTimeline />
        </div>
      </div>
    </section>
  );
}
