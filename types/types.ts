// types/itemTypes.ts

import {
  CONNECTION_REQUEST_STATUS,
  CONTACT_TAG_TYPE,
  PROFILE_COMPONENT_CATEGORY,
  PROFILE_COMPONENT_TYPE,
} from "./enums";

export type ProfileDndComponent = {
  id: string;
  card_id: string;
  type: PROFILE_COMPONENT_TYPE;
  category: PROFILE_COMPONENT_CATEGORY;
  display_text: string; //need to check wheather it is nullable or not
  value: string;
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
}

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

export interface ContactWithDetails extends Contact {
  contactPersonFullname: string;
  contactPersonOccupation: string;
  contactPersonCompany: string;
  contactPersonImage: string;
}

export interface ConnectionRequestWithDetails extends ConnectionRequest {
  senderFullname: string;
  senderOccupation: string;
  senderCompany: string;
  senderImage: string;
}
