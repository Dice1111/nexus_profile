import { z } from "zod";

export const AcceptRequestSchema = z.object({
  requestId: z.number(),
  cardId: z.string().uuid(),
  senderCardId: z.string().uuid(),
});

export type IAcceptRequestData = z.infer<typeof AcceptRequestSchema>;
export type IAcceptRequestSchema = typeof AcceptRequestSchema;
