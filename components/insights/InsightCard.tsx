import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AbstractScene } from "@/components/media/AbstractScene";
import type { InsightArticle } from "@/lib/insights-content";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function InsightCard({ article }: { article: InsightArticle }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      data-reveal
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="aspect-[16/10] w-full">
        <AbstractScene
          variant={article.scene.variant}
          tone={article.scene.tone}
          alt={article.title}
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-indigo">
          {article.category}
        </span>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">
          {article.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {article.excerpt}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-faint">
          <span>
            {formatDate(article.publishedAt)} · {article.readingTime}
          </span>
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo" />
        </div>
      </div>
    </Link>
  );
}
