import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchWithTryCatch<T, A>(
  fetchFunction: (arg?: A) => Promise<T>,
  argument?: A
): Promise<T> {
  try {
    return await fetchFunction(argument);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(String(error));
    }
  }
}
