import type { SceneVariant } from "@/components/media/AbstractScene";

export type InsightBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string };

export interface InsightArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: "Cyber Security" | "Web Development" | "IT Infrastructure";
  publishedAt: string;
  readingTime: string;
  relatedServiceSlug: string;
  scene: { variant: SceneVariant; tone: "indigo" | "violet" | "gold" | "blue" };
  body: InsightBlock[];
}

export const insightsArticles: InsightArticle[] = [
  {
    slug: "security-architecture-before-first-line-of-code",
    title: "Why security architecture should start before the first line of code",
    excerpt:
      "Bolting security onto a finished system is expensive and incomplete. Here's what changes when access control and data handling are design decisions, not a final review.",
    category: "Cyber Security",
    publishedAt: "2026-06-08",
    readingTime: "6 min read",
    relatedServiceSlug: "data-management-cyber-security",
    scene: { variant: "mesh", tone: "gold" },
    body: [
      {
        type: "paragraph",
        text: "Most security work happens too late. A system gets built, it goes into production, and only then does someone ask who can access what, how data is stored, and what happens if a credential leaks. By that point, the answers are constrained by decisions that were never made with security in mind.",
      },
      { type: "heading", text: "Security is an architecture decision, not a feature" },
      {
        type: "paragraph",
        text: "Access control, data segmentation and audit logging are structural. Retrofitting them into a system that wasn't designed to support them usually means workarounds — a permissions layer bolted on top of a database that has no concept of ownership, or logging added after the fact that misses the events that actually matter. The result technically satisfies a checklist without actually reducing risk.",
      },
      {
        type: "paragraph",
        text: "Designing with security in from the start means asking a small set of questions before any code is written: who should be able to see this data, what happens if this component is compromised, and how would we know. Those questions shape the schema, the API boundaries and the deployment model — not just the login page.",
      },
      { type: "heading", text: "What this looks like in practice" },
      {
        type: "paragraph",
        text: "In practice, it means role-based access control designed alongside the data model, not added afterward. It means encrypting sensitive fields at rest because the schema was designed to make that straightforward, not because a compliance review flagged it six months post-launch. And it means a monitoring plan that exists before the system does — so when something unusual happens, there's already a way to see it.",
      },
      {
        type: "paragraph",
        text: "None of this requires a business to be a large enterprise before it's worth doing. The size of the system matters less than the sensitivity of what it holds. A small platform handling customer payment details carries real risk regardless of company size — and the fix is cheapest when it's a design decision, not a remediation project.",
      },
    ],
  },
  {
    slug: "website-rebuild-vs-redesign",
    title: "Choosing between a website rebuild and a redesign",
    excerpt:
      "Not every underperforming website needs to be thrown away. A practical way to decide whether the problem is the design, the codebase, or both.",
    category: "Web Development",
    publishedAt: "2026-05-14",
    readingTime: "5 min read",
    relatedServiceSlug: "web-design-development",
    scene: { variant: "stack", tone: "indigo" },
    body: [
      {
        type: "paragraph",
        text: "A website that isn't performing gets blamed on the design. Sometimes that's right — but often the design is fine and the problem is underneath it: a slow, hard-to-maintain codebase that makes every change expensive, or a content structure that was never built for how the business actually operates today.",
      },
      { type: "heading", text: "Signs it's a redesign, not a rebuild" },
      {
        type: "paragraph",
        text: "If the site loads reasonably fast, the codebase is current and maintainable, and the main issue is that the visual design and messaging feel dated or unclear, that's a redesign problem. The underlying system is sound; what's on top of it needs work. This is usually the faster, lower-risk path.",
      },
      { type: "heading", text: "Signs it's a rebuild" },
      {
        type: "paragraph",
        text: "If every content update requires a developer, the site is built on a stack that's no longer actively maintained, performance is poor regardless of what's changed on the surface, or the architecture doesn't support what the business needs now — multi-language, e-commerce, an integration that didn't exist when the site was built — a redesign alone won't fix it. The foundation itself needs to change.",
      },
      {
        type: "paragraph",
        text: "The two are not mutually exclusive, and in most real engagements they overlap: a rebuild is also a chance to reconsider the design, and a redesign often surfaces technical debt worth addressing at the same time. The useful exercise isn't picking one label — it's being honest about which problems are cosmetic and which are structural before committing budget to either.",
      },
      {
        type: "paragraph",
        text: "A short technical and content audit before scoping either option usually pays for itself: it turns a vague sense that 'the website needs work' into a concrete list of what's actually broken, what's outdated, and what would genuinely move the needle.",
      },
    ],
  },
  {
    slug: "what-network-resilience-means-for-a-growing-business",
    title: "What network resilience actually means for a growing business",
    excerpt:
      "Network infrastructure is invisible until it fails. A practical look at what resilience means beyond just 'more bandwidth'.",
    category: "IT Infrastructure",
    publishedAt: "2026-03-22",
    readingTime: "5 min read",
    relatedServiceSlug: "it-network-services",
    scene: { variant: "mesh", tone: "violet" },
    body: [
      {
        type: "paragraph",
        text: "\"Resilient network\" often gets reduced to a single question: is the internet connection fast enough? Speed matters, but it's rarely what causes an outage that actually disrupts a business. The more common failure points are single points of failure, unmonitored hardware, and a network that was sized for the business as it existed a few years ago.",
      },
      { type: "heading", text: "The real failure points" },
      {
        type: "paragraph",
        text: "A single switch with no redundancy. A wireless network that wasn't designed for the number of devices now connected to it. Firewall rules nobody has reviewed since they were first configured. None of these show up as a problem on a normal day — they show up as a problem on the day something changes, and by then it's an outage, not a maintenance item.",
      },
      { type: "heading", text: "What resilience looks like" },
      {
        type: "paragraph",
        text: "Resilience is less about a single expensive upgrade and more about a handful of unglamorous practices done consistently: redundancy at the points that would take down the whole network if they failed, monitoring that surfaces a problem before it becomes an outage, and a network design that was actually sized for current usage rather than usage from several years ago.",
      },
      {
        type: "paragraph",
        text: "It also means having a plan for growth before growth forces the issue — a new office, a new team, a jump in remote access — rather than discovering the network's limits at the worst possible moment. For most growing businesses, an honest audit of what's actually installed and how it's configured is a more useful starting point than a bigger internet plan.",
      },
    ],
  },
];

export function getInsightBySlug(slug: string) {
  return insightsArticles.find((a) => a.slug === slug);
}
