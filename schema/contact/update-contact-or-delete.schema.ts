import { CONTACT_TAG_ENUM } from "@/core/_domain/enum/contact-tag.enum";
import { z } from "zod";

export const UpdateTagOrNoteSchema = z.object({
  contactId: z.number(),
  tag: z.nativeEnum(CONTACT_TAG_ENUM).optional(),
  note: z.string().optional(),
});

export type IUpdateTagOrNoteData = z.infer<typeof UpdateTagOrNoteSchema>;
export type IUpdateTagOrNoteSchema = typeof UpdateTagOrNoteSchema;
