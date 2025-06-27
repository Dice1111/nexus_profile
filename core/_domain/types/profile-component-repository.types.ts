import {
  PROFILE_COMPONENT_CATEGORY,
  PROFILE_COMPONENT_TYPE,
} from "../enum/profile-component-repository.enum";

export interface IFetchProfileComponentData {
  id: number;
  cardId: string;
  value: string;
  label: string;
  type: PROFILE_COMPONENT_TYPE;
  category: PROFILE_COMPONENT_CATEGORY;
  position: number;
}
