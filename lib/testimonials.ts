export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
}

/**
 * No client testimonials exist yet — inventing quotes, names or companies
 * is off the table. These entries are sample copy only, rendered through
 * <Testimonials placeholder /> so the layout (and the auto-scrolling loop)
 * is proven out and ready: once real feedback exists, replace this array's
 * contents (or fetch it from a CMS) and drop the `placeholder` prop.
 */
export const sampleTestimonials: TestimonialItem[] = [
  {
    quote:
      "Sample layout copy — this is where a client's own words about the engagement, the outcome and working with the team will go once a project has shipped.",
    name: "Client Name",
    role: "Title / Role",
    company: "Company Name",
  },
  {
    quote:
      "A second sample entry, sized to show how a longer quote reflows across the card — replace with real feedback once available.",
    name: "Client Name",
    role: "Title / Role",
    company: "Company Name",
  },
  {
    quote: "A short sample quote for layout variety.",
    name: "Client Name",
    role: "Title / Role",
    company: "Company Name",
  },
  {
    quote:
      "A fourth placeholder entry — mid-length, to show how the carousel paces itself once there are enough real quotes to loop through.",
    name: "Client Name",
    role: "Title / Role",
    company: "Company Name",
  },
  {
    quote:
      "Sample copy reserved for a client testimonial about a specific service — web, security, systems or networks — once that feedback exists.",
    name: "Client Name",
    role: "Title / Role",
    company: "Company Name",
  },
  {
    quote: "Another short-form sample, for pacing variety in the loop.",
    name: "Client Name",
    role: "Title / Role",
    company: "Company Name",
  },
];
