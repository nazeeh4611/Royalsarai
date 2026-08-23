import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { insightsArticles } from "@/lib/insights-content";
import type { MediaId } from "@/lib/media";

export function InsightsPreview() {
  const articles = insightsArticles.slice(0, 3);

  return (
    <section className="border-t border-line bg-paper py-14 lg:py-20">
      <div className="edge container-max">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
              Insights
            </span>
            <h2 className="mt-3 text-[clamp(1.6rem,2.6vw,2.2rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">
              Practical thinking on technology and security
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/insights"
              className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-ink/70"
            >
              All insights
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
          {articles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.05} className="w-[78vw] shrink-0 snap-start sm:w-auto">
              <Link
                href={`/insights/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface transition-colors hover:border-ink-faint/40"
              >
                <div className="aspect-[16/10] w-full">
                  <MediaFrame
                    id={`insight-${article.slug}` as MediaId}
                    scene={article.scene.variant}
                    tone={article.scene.tone}
                    rounded="none"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
                    {article.category}
                  </span>
                  <h3 className="mt-2 text-base font-bold leading-snug text-ink">
                    {article.title}
                  </h3>
                  <span className="mt-3 text-xs text-ink-faint">
                    {article.readingTime}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
