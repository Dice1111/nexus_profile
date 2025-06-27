export interface DesignModel {
  id: number;
  cardId: string;
  foregroundColor: string;
  backgroundColor: string;
  profileImage: string | null;
  logoImage: string | null;
  layout: string;
  createdAt: Date;
  updatedAt: Date;
}
