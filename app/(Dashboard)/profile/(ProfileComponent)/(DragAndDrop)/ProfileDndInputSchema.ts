import { PROFILE_COMPONENT_CATEGORY, PROFILE_COMPONENT_TYPE } from "@/lib/type";
import { z } from "zod";

// Zod schema for dynamic validation
// Define Zod schema with type-specific validation
export const profileDndInputSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    card_id: z.string(),
    type: z.literal(PROFILE_COMPONENT_TYPE.EMAIL),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.MAIL),
    display_text: z.string().optional(),
    value: z.string().email("Invalid email address"),
  }),
  z.object({
    id: z.string(),
    card_id: z.string(),
    type: z.literal(PROFILE_COMPONENT_TYPE.PHONE),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.PHONE),
    display_text: z.string().optional(),
    value: z.string().regex(/^\d{10,15}$/, "Invalid phone number"),
  }),
  z.object({
    id: z.string(),
    card_id: z.string(),
    type: z.literal(PROFILE_COMPONENT_TYPE.LINK),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string().url("Invalid URL"),
  }),
  z.object({
    id: z.string(),
    card_id: z.string(),
    type: z.literal(PROFILE_COMPONENT_TYPE.TEXT),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.TEXT),
    display_text: z.string().optional(),
    value: z.string().min(1, "Text cannot be empty"),
  }),
  z.object({
    id: z.string(),
    card_id: z.string(),
    type: z.literal(PROFILE_COMPONENT_TYPE.IMAGE),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.IMAGE),
    display_text: z.string().optional(),
    value: z.string().min(1, "Image URL cannot be empty"),
  }),
  z.object({
    id: z.string(),
    card_id: z.string(),
    type: z.literal(PROFILE_COMPONENT_TYPE.YOUTUBE),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.VIDEO),
    display_text: z.string().optional(),
    value: z.string().min(1, "YouTube URL cannot be empty"),
  }),
  z.object({
    id: z.string(),
    card_id: z.string(),
    type: z.literal(PROFILE_COMPONENT_TYPE.MAP),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.MAP),
    display_text: z.string().optional(),
    value: z.string().min(1, "GoogleMap URL cannot be empty"),
  }),
  z.object({
    id: z.string(),
    card_id: z.string(),
    type: z.literal(PROFILE_COMPONENT_TYPE.DISCORD),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string().min(1, "Discord URL cannot be empty"),
  }),
]);
  
  