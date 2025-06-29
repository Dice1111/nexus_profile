import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type SignInData = z.infer<typeof signInSchema>;
export type SignInSchema = typeof signInSchema;
