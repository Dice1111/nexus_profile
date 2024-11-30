import { z } from "zod";

// Zod schema for dynamic validation
export const profileComponentSchema = z.discriminatedUnion("type", [
    z.object({
      id: z.string(),
      type: z.literal("email"),
      value: z.string().email("Invalid email address"),
      display_text: z.string().optional(),
      category: z.literal("mail"),
    }),
    z.object({
      id: z.string(),
      type: z.literal("phone"),
      value: z.string().regex(/^\d{10,15}$/, "Invalid phone number"),
      display_text: z.string().optional(),
      category: z.literal("phone"),
    }),
    z.object({
      id: z.string(),
      type: z.literal("url"),
      value: z.string().url("Invalid URL"),
      display_text: z.string().optional(),
      category: z.literal("URL"),
    }),
    z.object({
      id: z.string(),
      type: z.literal("text"),
      value: z.string().min(1, "Text cannot be empty"),
      display_text: z.string().optional(),
      category: z.literal("text"),
    }),
    z.object({
        id: z.string(),
        type: z.literal("img"),
        value: z.string().min(1, "Text cannot be empty"),
        display_text: z.string().optional(),
        category: z.literal("img"),
      }),
  ]);
  
  