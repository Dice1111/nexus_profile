import { PROFILE_LAYOUT } from "../enum/design-repository.enum";

export interface DesignModel {
  id: number;
  cardId: string;
  foregroundColor: string;
  backgroundColor: string;
  profileImage: string | null;
  logoImage: string | null;
  layout: PROFILE_LAYOUT;
  createdAt: Date;
  updatedAt: Date;
}
