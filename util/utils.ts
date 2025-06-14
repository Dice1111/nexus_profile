import { CONTACT_TAG_TYPE } from "@/lib/types/enums";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_URL;

export const tagOptions = Object.values(CONTACT_TAG_TYPE) as CONTACT_TAG_TYPE[];

export const unloadthingAppId = process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID;

// Contact Page Item Count Per Page
export const ITEMS_PER_PAGE = 10;
