// types/itemTypes.ts

export type ProfileDndComponent = {
  id: string;
  card_id: string;
  type: string;
  category: string;
  display_text: string;
  value?: string;
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
  INFO = "info",
  ZOOM = "zoom",
};

export enum PROFILE_COMPONENT_CATEGORY {
  MAIL = "mail",
  LINK = "link",
  VIDEO = "video",
  MAP = "map",
  FILE = "file",
  PHONE = "phone",
  PAYMENT = "payment",
  MUSIC = "music",
  IMAGE = "img",
  TEXT = "text",
};

export type Contact = {
  contactID: string;
  userCardID: string;
  contactPersonCardID: string;
  contactPersonID: string;
  tag: CONTACT_TAG_TYPE;
  note?: string;
  created_at: Date;
  updated_at: Date;
};

export type ConnectionRequest = {
  requestID: string;
  senderCardID: string;
  recieverCardID: string;
  status: CONNECTION_REQUEST_STATUS;
  created_at: Date;
  updated_at: Date;
};

export enum CONNECTION_REQUEST_STATUS {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
};

export enum CONTACT_TAG_TYPE {
  FAMILY = "family",
  FRIEND = "friend",
  COLLEAGUE = "colleague",
  CLIENT = "client",
  SUPPLIER = "supplier",
  EMPLOYEE = "empolyee",
  INVESTOR = "investor",
  VENDOR = "vendor",
  OTHER = "Other",
};

export interface ThemeSchema {
  [key: string]: {
    imageWrapper: string;
    logoWrapper: string;
    name: string;
    title: string;
    occupation: string;
    company: string;
    quote: string;
    preferredName: string;
    message: string;
  };
};

export type ProfileCard = {
  card_id: string;
  user_id: string;
  foreground_color: string;
  background_color: string;
  wave_color: string;
  layout: string;
  wave_type: string;
  image: string;
  logo_icon: string;
  prefix: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  quote: string;
  preferred_name: string;
  pronouns: string;
  title: string;
  occupation: string;
  company: string;
  message: string;
};
