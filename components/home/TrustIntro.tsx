import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

export function TrustIntro() {
  return (
    <section className="border-y border-line bg-paper py-24 lg:py-32">
      <div className="edge container-max grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">
              What we&rsquo;re licensed to deliver
            </span>
            <p className="mt-5 max-w-md text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-[1.3] tracking-[-0.01em] text-ink text-balance">
              We don&rsquo;t chase every technology trend. Our practice sits
              inside four disciplines — a business&rsquo;s web presence, its
              data, its systems, and the network that carries them all.
            </p>
          </Reveal>
          <Reveal variant="pop" delay={0.15}>
            <div className="mt-10 flex items-baseline gap-3">
              <Counter
                to={4}
                pad
                className="text-[clamp(2.2rem,3.6vw,3rem)] font-bold tracking-[-0.02em] text-blue"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">
                Licensed technology
                <br />
                disciplines, one practice
              </span>
            </div>
          </Reveal>
        </div>

        <Stagger className="flex flex-col">
          {siteConfig.licensedActivities.map((activity, i) => (
            <Link
              key={activity.slug}
              href={`/services/${activity.slug}`}
              data-reveal
              className="group flex items-center justify-between gap-6 border-b border-line py-6 first:border-t"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-sm text-ink-faint">
                  0{i + 1}
                </span>
                <span className="text-lg font-semibold text-ink transition-colors group-hover:text-blue sm:text-xl">
                  {activity.label}
                </span>
              </div>
              <ArrowUpRight className="size-5 shrink-0 -translate-x-1 text-ink-faint opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-blue" />
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
