import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CONTACT_TAG_ENUM } from "@/core/domain/enum/contact-tag.enum";
import { CONTACT_TAG_TYPE } from "@prisma/client";
import {
  SORTABLE_ITEMS,
  SORTABLE_ORDERS,
} from "@/core/domain/enum/search-params-handler-service.enum";

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

export const Contact_Tag = Object.values(
  CONTACT_TAG_TYPE
) as CONTACT_TAG_TYPE[];

export const validTagsSet = new Set(Object.values(CONTACT_TAG_ENUM));
export const validSortFieldsSet = new Set(Object.values(SORTABLE_ITEMS));
export const validSortOrdersSet = new Set(Object.values(SORTABLE_ORDERS));
