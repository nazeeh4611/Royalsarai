"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { MagneticButton } from "@/components/ui/MagneticButton";

const budgets = [
  "Under AED 20,000",
  "AED 20,000 – 75,000",
  "AED 75,000 – 200,000",
  "AED 200,000+",
  "Not sure yet",
];

const fieldClasses =
  "w-full rounded-[var(--radius-sm)] border border-line-strong bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-indigo";
const labelClasses = "text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint";

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") ?? "";
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: preselectedService },
  });

  useEffect(() => {
    if (preselectedService) setValue("service", preselectedService);
  }, [preselectedService, setValue]);

  async function onSubmit() {
    // No backend endpoint is wired up yet — this simulates submission so
    // the UI and success state can be reviewed end to end. Before launch,
    // replace this with a real API route (e.g. an email-sending endpoint).
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <CheckCircle2 className="size-10 text-indigo" strokeWidth={1.5} />
        <h3 className="mt-6 text-xl font-bold text-ink">Message received</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
          Thanks for reaching out. We&rsquo;ll review your project details
          and reply to the email address you provided.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>Full name</label>
          <input id="name" className={cn(fieldClasses, "mt-2")} {...register("name")} />
          {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="company" className={labelClasses}>Company</label>
          <input id="company" className={cn(fieldClasses, "mt-2")} {...register("company")} />
          {errors.company && <p className="mt-1.5 text-xs text-red-600">{errors.company.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>Email</label>
          <input id="email" type="email" className={cn(fieldClasses, "mt-2")} {...register("email")} />
          {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>Phone (optional)</label>
          <input id="phone" className={cn(fieldClasses, "mt-2")} {...register("phone")} />
        </div>
        <div>
          <label htmlFor="service" className={labelClasses}>Service</label>
          <select id="service" className={cn(fieldClasses, "mt-2")} {...register("service")}>
            <option value="">Select a service</option>
            {siteConfig.licensedActivities.map((a) => (
              <option key={a.slug} value={a.slug}>{a.label}</option>
            ))}
            <option value="other">Not sure / other</option>
          </select>
          {errors.service && <p className="mt-1.5 text-xs text-red-600">{errors.service.message}</p>}
        </div>
        <div>
          <label htmlFor="budget" className={labelClasses}>Estimated budget (optional)</label>
          <select id="budget" className={cn(fieldClasses, "mt-2")} {...register("budget")}>
            <option value="">Prefer not to say</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>Project requirements</label>
        <textarea
          id="message"
          rows={5}
          className={cn(fieldClasses, "mt-2 resize-none")}
          placeholder="What are you trying to build, and what problem does it solve?"
          {...register("message")}
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      <div className="mt-2">
        <MagneticButton onClick={handleSubmit(onSubmit)} cursorLabel="Send">
          {isSubmitting ? "Sending..." : "Send message"}
        </MagneticButton>
      </div>
    </form>
  );
}
