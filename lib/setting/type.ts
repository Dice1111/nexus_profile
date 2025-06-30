import { TOGGLE_TYPE } from "./enum";

export interface SettingToggleProps {
  label: string;
  description?: string; // Optional description
  initialState?: boolean;
  purpose: TOGGLE_TYPE;
}
