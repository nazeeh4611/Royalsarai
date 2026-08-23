import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const columns = [
  {
    heading: "Services",
    links: siteConfig.licensedActivities.map((a) => ({
      label: a.label,
      href: `/services/${a.slug}`,
    })),
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Industries", href: "/industries" },
      { label: "Global Presence", href: "/global-presence" },
      { label: "Insights", href: "/insights" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="on-dark bg-paper pt-24 text-ink">
      <div className="edge container-max">
        <div className="grid gap-16 border-b border-line pb-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex translate-y-[2px] flex-col items-start gap-1" aria-label="Royal Sarai Technologies — home">
              {/* eslint-disable-next-line @next/next/no-img-element -- same
                 plain <img> as Navbar.tsx: next/image's optimizer rejects
                 SVG sources unless images.dangerouslyAllowSVG is set. */}
              <img src="/logo.svg" alt="Royal Sarai" width={2096} height={229} className="h-8 w-auto" />
              <span className="self-end text-[0.6rem] font-medium tracking-[0.3em] text-ink-faint">
                TECHNOLOGIES
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-soft">
              A Dubai-based technology company delivering web design, cyber
              security, computer systems and IT network services — engineered
              locally, built for businesses operating across borders.
            </p>
            <Link
              href="/contact"
              className="link-underline mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:text-ink/70"
            >
              Start a conversation
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
                {col.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-ink-soft">
              <li>{siteConfig.location.city}, {siteConfig.location.country}</li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-ink">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.contact.phoneHref} className="transition-colors hover:text-ink">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Licensed by
            the Dubai Department of Economy &amp; Tourism — License No.{" "}
            {siteConfig.registration.licenseNumber}.
          </p>
          <Link href="/privacy-policy" className="link-underline transition-colors hover:text-ink">
            Privacy Policy
          </Link>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="overflow-hidden border-t border-line py-4"
      >
        <div
          className="marquee-track flex w-max items-center"
          style={{ animationDuration: "42s" }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="mx-6 flex shrink-0 select-none items-center gap-6 whitespace-nowrap text-[7.6vw] font-extrabold uppercase leading-none tracking-[-0.02em] text-ink"
            >
              Royal Sarai Technologies
              <span className="size-[0.9vw] shrink-0 rounded-full bg-ink/30" />
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
