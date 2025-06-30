// types/itemTypes.ts

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
