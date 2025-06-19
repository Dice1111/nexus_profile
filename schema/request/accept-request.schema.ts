import { z } from "zod";

export const AcceptRequestSchema = z.object({
  requestId: z.number().refine((val) => !isNaN(val), {
    message: "Request ID must be a number",
  }),
  cardId: z.string().uuid({ message: "Card ID must be a valid UUID" }),
  senderCardId: z
    .string()
    .uuid({ message: "Sender Card ID must be a valid UUID" }),
});

export type IAcceptRequestData = z.infer<typeof AcceptRequestSchema>;
export type IAcceptRequestSchema = typeof AcceptRequestSchema;
