// types/itemTypes.ts

export type Item = {
  id: number;
  title: string;
  value: string;
  type: ITEM_TYPE;
};

export enum ITEM_TYPE {
  PHONE = "phone",
  EMAIL = "email",
  IMAGE = "img",
  TEXT = "text",
  LINK = "link",
  VIDEO = "video",
  MAP = "map",
  FILE = "file",
  SOCIAL = "social",
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
