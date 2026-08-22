import type { MediaId } from "@/lib/media";
import type { SceneVariant } from "@/components/media/AbstractScene";
import type { FAQItem } from "@/components/ui/FAQAccordion";

export interface ServiceContent {
  slug: string;
  name: string;
  shortLabel: string;
  eyebrow: string;
  headline: string;
  intro: string;
  media: { id: MediaId; scene: SceneVariant; tone: "indigo" | "violet" | "gold" | "blue" };
  problem: { title: string; description: string };
  solution: { title: string; description: string };
  capabilities: { title: string; description: string }[];
  technology: string[];
  businessValue: { title: string; description: string }[];
  faqs: FAQItem[];
  metaDescription: string;
}

export const servicesContent: ServiceContent[] = [
  {
    slug: "web-design-development",
    name: "Web Design & Development",
    shortLabel: "Web Design",
    eyebrow: "Web Design & Development",
    headline: "Web platforms designed and engineered as one connected system.",
    intro:
      "From marketing sites to custom web applications, we design the interface and build the engineering behind it together — so what ships matches what was designed, and performs the way it should.",
    media: { id: "service-web-hero", scene: "stack", tone: "indigo" },
    problem: {
      title: "The problem",
      description:
        "Design and development are often handled by separate teams that never fully align — resulting in sites that look good in a mockup but ship slow, break on mobile, or drift from the original design within months.",
    },
    solution: {
      title: "Our approach",
      description:
        "One team owns the interface and the code behind it. We design with real content and real constraints from the start, and build on a modern, maintainable stack so the site stays fast and easy to extend after launch.",
    },
    capabilities: [
      {
        title: "Marketing & corporate websites",
        description: "Brand-led sites built for clarity, credibility and search visibility.",
      },
      {
        title: "Web applications",
        description: "Custom, logic-driven platforms built around a specific business process.",
      },
      {
        title: "E-commerce",
        description: "Product, catalogue and checkout experiences built to convert and scale.",
      },
      {
        title: "Ongoing iteration",
        description: "Post-launch support, content updates and incremental feature work.",
      },
    ],
    technology: [
      "Next.js & React",
      "TypeScript",
      "Headless CMS integration",
      "Performance engineering",
      "Accessible, semantic markup",
      "SEO architecture",
    ],
    businessValue: [
      {
        title: "Faster load, better ranking",
        description: "Performance and SEO are engineered in from the first sprint, not patched on afterward.",
      },
      {
        title: "One codebase, less risk",
        description: "Design and engineering stay in sync, so the live site doesn't drift from what was agreed.",
      },
      {
        title: "Built to extend",
        description: "A clean architecture means new pages and features don't require a rebuild.",
      },
    ],
    faqs: [
      {
        question: "Do you design and build, or only one of the two?",
        answer:
          "Both. The same team designs the interface and writes the code that ships it, which keeps the two aligned and avoids handoff gaps.",
      },
      {
        question: "Can you work with an existing brand identity?",
        answer:
          "Yes — we design within an existing brand system when one exists, and can also establish a lightweight visual direction for a new site when it doesn't.",
      },
      {
        question: "What platform do you build on?",
        answer:
          "Primarily Next.js and React, chosen for performance, SEO support and long-term maintainability. For content-heavy sites we integrate a headless CMS so the client can edit copy without a developer.",
      },
      {
        question: "Do you handle hosting and maintenance after launch?",
        answer:
          "We can advise on and set up hosting, and offer ongoing support arrangements for updates, monitoring and iteration once the site is live.",
      },
    ],
    metaDescription:
      "Web design and development from Royal Sarai Technologies — marketing sites, web applications and e-commerce, designed and engineered as one connected system in Dubai, UAE.",
  },
  {
    slug: "data-management-cyber-security",
    name: "Data Management & Cyber Security",
    shortLabel: "Cyber Security",
    eyebrow: "Data Management & Cyber Security",
    headline: "Security and data governance built in, not bolted on.",
    intro:
      "We design access control, data handling and security architecture as part of a system from day one — so protection isn't a separate project that happens after something goes wrong.",
    media: { id: "service-cyber-hero", scene: "mesh", tone: "gold" },
    problem: {
      title: "The problem",
      description:
        "Security is frequently treated as an afterthought — added once a system is already in production, under pressure, after an incident. That approach is expensive and leaves gaps.",
    },
    solution: {
      title: "Our approach",
      description:
        "We assess how data actually moves through a business, then design access control, storage and monitoring around that reality — proportionate to the risk, not a generic checklist.",
    },
    capabilities: [
      {
        title: "Security architecture",
        description: "Access control, network segmentation and secure-by-design system planning.",
      },
      {
        title: "Data governance",
        description: "Structured, compliant handling of business and customer data.",
      },
      {
        title: "Monitoring & response planning",
        description: "Visibility into systems, with a plan for when something needs attention.",
      },
      {
        title: "Security review",
        description: "Assessment of existing systems against current risk and best practice.",
      },
    ],
    technology: [
      "Access control & identity management",
      "Encryption in transit & at rest",
      "Network segmentation",
      "Security monitoring",
      "Data governance frameworks",
      "Incident response planning",
    ],
    businessValue: [
      {
        title: "Fewer preventable incidents",
        description: "Access control and monitoring designed in reduce the most common points of failure.",
      },
      {
        title: "Data handled responsibly",
        description: "Clear governance makes it easier to meet client and regulatory expectations.",
      },
      {
        title: "A plan, not a scramble",
        description: "Response planning means an incident is handled calmly, not chaotically.",
      },
    ],
    faqs: [
      {
        question: "Can you assess a system we already have in production?",
        answer:
          "Yes — a security review of existing infrastructure is often the starting point, and we scope any recommended work from there.",
      },
      {
        question: "Is this only for large enterprises?",
        answer:
          "No. Access control, backup discipline and basic monitoring matter for a small business handling customer data just as much as a large one — we scope engagements to the size of the risk.",
      },
      {
        question: "Do you handle regulatory compliance?",
        answer:
          "We design data governance and security controls with compliance requirements in mind and work alongside a client's legal counsel where formal certification or audit sign-off is required.",
      },
      {
        question: "What happens if there's an active incident?",
        answer:
          "Get in touch directly rather than through the general enquiry form — we'll prioritise accordingly and help contain and assess the situation.",
      },
    ],
    metaDescription:
      "Data management and cyber security services from Royal Sarai Technologies — security architecture, access control and data governance built in from the start, in Dubai, UAE.",
  },
  {
    slug: "computer-systems-software",
    name: "Computer Systems & Software",
    shortLabel: "Systems & Software",
    eyebrow: "Computer Systems & Software",
    headline: "Custom systems designed around how your business actually runs.",
    intro:
      "We design and build computer systems and software around a business's real workflow — not a generic package that forces the business to adapt to the tool.",
    media: { id: "service-systems-hero", scene: "stack", tone: "blue" },
    problem: {
      title: "The problem",
      description:
        "Off-the-shelf software is fast to buy but slow to fit — teams end up working around the tool instead of the tool working for them, and integrations between disconnected systems become a permanent maintenance burden.",
    },
    solution: {
      title: "Our approach",
      description:
        "We map the actual process first, then design software and system architecture around it — including integration between the systems a business already depends on.",
    },
    capabilities: [
      {
        title: "Custom software",
        description: "Purpose-built applications designed around a specific operational need.",
      },
      {
        title: "Systems integration",
        description: "Connecting existing tools and platforms so data moves cleanly between them.",
      },
      {
        title: "Legacy modernisation",
        description: "Rebuilding or extending older systems without disrupting daily operations.",
      },
      {
        title: "Internal tooling",
        description: "Dashboards and operational tools that give a team visibility and control.",
      },
    ],
    technology: [
      "Custom application architecture",
      "API design & integration",
      "Database design",
      "Legacy system modernisation",
      "Internal tooling & dashboards",
      "Cloud & on-premise deployment",
    ],
    businessValue: [
      {
        title: "Fewer workarounds",
        description: "Software designed around the real process means less manual patchwork.",
      },
      {
        title: "Systems that talk to each other",
        description: "Integration removes duplicate data entry and disconnected records.",
      },
      {
        title: "Built to last",
        description: "Architecture decisions are made for maintainability, not just a quick launch.",
      },
    ],
    faqs: [
      {
        question: "Do you build entirely custom software, or configure existing platforms?",
        answer:
          "Both, depending on the fit. Sometimes the right answer is configuring and integrating existing platforms; sometimes it's purpose-built software. We recommend based on the actual requirement, not a default.",
      },
      {
        question: "Can you work with our existing systems rather than replacing them?",
        answer:
          "Yes — integration work is often more valuable than a full replacement, and we scope it that way when it makes sense.",
      },
      {
        question: "How do you handle systems that are business-critical and can't go down?",
        answer:
          "We plan migrations and changes in phases, with testing and rollback plans, so critical operations aren't put at risk during the transition.",
      },
    ],
    metaDescription:
      "Custom computer systems and software design from Royal Sarai Technologies — built around how your business actually operates, in Dubai, UAE.",
  },
  {
    slug: "it-network-services",
    name: "Information Technology Network Services",
    shortLabel: "IT Networks",
    eyebrow: "IT Network Services",
    headline: "Network infrastructure that keeps every system connected.",
    intro:
      "We design, deploy and manage the network infrastructure that everything else depends on — wired, wireless and cloud-connected — so the systems built on top of it stay reliable.",
    media: { id: "service-network-hero", scene: "mesh", tone: "violet" },
    problem: {
      title: "The problem",
      description:
        "Network infrastructure is invisible until it fails — and by then, every connected system and every person using it is affected at once.",
    },
    solution: {
      title: "Our approach",
      description:
        "We design network infrastructure for the load and reliability a business actually needs, deploy it properly the first time, and keep it monitored and maintained rather than waiting for something to break.",
    },
    capabilities: [
      {
        title: "Network design",
        description: "Structured wired and wireless network architecture sized to the business.",
      },
      {
        title: "Deployment",
        description: "Installation and configuration of switching, routing and wireless infrastructure.",
      },
      {
        title: "Monitoring & maintenance",
        description: "Ongoing visibility into network health, with proactive maintenance.",
      },
      {
        title: "Connectivity planning",
        description: "Planning for growth, redundancy and multi-site connectivity.",
      },
    ],
    technology: [
      "Structured cabling",
      "Enterprise wireless infrastructure",
      "Network segmentation & VLANs",
      "Firewall & routing configuration",
      "Network monitoring",
      "Multi-site connectivity",
    ],
    businessValue: [
      {
        title: "Fewer outages",
        description: "Infrastructure sized and configured correctly the first time fails less often.",
      },
      {
        title: "Visibility before failure",
        description: "Monitoring surfaces problems before they become downtime.",
      },
      {
        title: "Ready to grow",
        description: "Network design accounts for the business's next stage, not just its current one.",
      },
    ],
    faqs: [
      {
        question: "Do you work with our existing internet service provider?",
        answer:
          "Yes — we design and manage the infrastructure on top of whatever connectivity a business already has, and can advise if the underlying service itself is a limiting factor.",
      },
      {
        question: "Can you support multiple office locations?",
        answer:
          "Yes, including planning secure connectivity between sites and consistent network policy across all of them.",
      },
      {
        question: "Do you offer ongoing monitoring, or only one-off setup?",
        answer:
          "Both — we deploy infrastructure and can also take on ongoing monitoring and maintenance so issues are caught proactively.",
      },
    ],
    metaDescription:
      "IT network services from Royal Sarai Technologies — network design, deployment and management for reliable, connected business infrastructure in Dubai, UAE.",
  },
];

export function getServiceBySlug(slug: string) {
  return servicesContent.find((s) => s.slug === slug);
}
