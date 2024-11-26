// types/itemTypes.ts

export type ProfileComponent = {
  id: number,
  type: PROFILE_COMPONENT_TYPE,
  category: PROFILE_COMPONENT_CATEGORY,
  value: string;
};

export enum PROFILE_COMPONENT_TYPE {
  PHONE = "phone",
  EMAIL = "email",
  IMAGE = "img",
  TEXT = "text",
  LINK = "link",
  VIDEO = "video",
  MAP = "map",
  FILE = "file",
  FACEBOOK = "facebook",
  TWITTER = "twitter",
  INSTAGRAM = "instagram",
  LINKEDIN = "linkedin",
  TIKTOK = "tiktok",
  SNAPCHAT = "snapchat",
  PINTEREST = "pinterest",
  DISCORD = "discord",
  SLACK = "slack",
  YOUTUBE = "youtube",
  TWITCH = "twitch",
  GITHUB = "github",
  TELEGRAM = "telegram",
  WHATSAPP = "whatsapp",
  SPOTIFY = "spotify",
  APPLE_MUSIC = "apple_music",
  AMAZON_MUSIC = "amazon_music",
  DRIBBBLE = "dribbble",
  BEHANCE = "behance",
  PAYPAL = "paypal",
  STRIPE = "stripe",
  AMAZON_PAY = "amazon_pay",
  APPLE_PAY = "apple_pay",
  GOOGLE_MEET = "google_meet",
  MICROSOFT_TEAMS = "microsoft_teams",
}

export enum PROFILE_COMPONENT_CATEGORY {
  MAIL = "mail",
  LINK = "link",
  VIDEO = "video",
  MAP = "map",
  FILE = "file",
  PHONE = "phone",
  PAYMENT = "payment",
  MUSIC = "music",
  IMAGE = "image",
  TEXT = "text",
}




export type Contact = {
  UserCardID: number;
  connectionID: number;
  connectedUserCardID: number;
  connectedUserID: number;
  connectedUsername: string;
  connectedUserOccupation: string;
  connectedUserCompany: string;
  connectedUserImage: string;
  connectedDate: Date;
  tag: CONTACT_TAG_TYPE;
};

export enum CONTACT_TAG_TYPE {
  FAMILY = "Family",
  FRIEND = "Friend",
  WORK = "Work",
  COLLEAGUE = "Colleague",
  OTHER = "Other",
}
