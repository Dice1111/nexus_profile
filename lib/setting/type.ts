import { TOGGLE_TYPE } from "./enum";

export interface SettingToggleProps {
  label: string;
  description?: string; // Optional description
  initialState?: boolean;
  purpose: TOGGLE_TYPE;
}

export interface SettingAccountDataType {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  image?: string;
}
