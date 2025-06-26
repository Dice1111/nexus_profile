export interface InformationModel {
  id: number;
  cardId: string;
  title: string | null;
  fullName: string;
  occupation: string | null;
  company: string | null;
  message: string | null;
  quote: string | null;
  prefix: string | null;
  suffix: string | null;
  preferredName: string | null;
  pronouns: string | null;
  createdAt: Date;
  updatedAt: Date;
}
