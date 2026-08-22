import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  company: z.string().min(1, "Enter your company name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Select a service"),
  budget: z.string().optional(),
  message: z.string().min(20, "Tell us a little more about the project (20 characters minimum)"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
