import { z } from "zod";

export const updateUsernameSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export type UpdateUsernameData = z.infer<typeof updateUsernameSchema>;
export type UpdateUsernameSchema = typeof updateUsernameSchema;
