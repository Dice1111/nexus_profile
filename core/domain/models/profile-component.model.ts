import {
  PROFILE_COMPONENT_CATEGORY,
  PROFILE_COMPONENT_TYPE,
} from "@/lib/types/enums";

export interface ProfileComponentModel {
  id: number;
  cardId: string;
  value: string;
  label: string;
  createdAt: Date;
  updatedAt: Date;
  type: PROFILE_COMPONENT_TYPE;
  category: PROFILE_COMPONENT_CATEGORY;
}
