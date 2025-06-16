export const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_URL;

export const unloadthingAppId = process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID;
