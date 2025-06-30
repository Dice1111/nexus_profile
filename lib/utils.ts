import { CONTACT_TAG_ENUM } from "@/core/_domain/enum/contact-repository.enum";
import {
  SORTABLE_ITEMS,
  SORTABLE_ORDERS,
} from "@/core/_domain/enum/search-params-handler-service.enum";
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

export const validTags = Object.values(CONTACT_TAG_ENUM) as CONTACT_TAG_ENUM[];
export const validTagsSet = new Set(Object.values(CONTACT_TAG_ENUM));
export const validSortFieldsSet = new Set(Object.values(SORTABLE_ITEMS));
export const validSortOrdersSet = new Set(Object.values(SORTABLE_ORDERS));

export const URL_FILTER = "filter";
export const URL_PAGE = "page";
export const URL_SORT_IEM = "sortItem";
export const URL_SORT_ORDER = "sortOrder";
export const URL_SEARCH = "search";
export const URL_CARD_ID = "cardId";

export const ITEMS_PER_PAGE: number = 10;
