import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"; // Fallback for local development

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
