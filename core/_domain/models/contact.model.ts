import { CONTACT_TAG_ENUM } from "../enum/contact-repository.enum";

export interface ContactModel {
  id: number;
  cardId: string;
  contactCardId: string;
  createdAt: Date;
  updatedAt: Date;
  tag: CONTACT_TAG_ENUM;
  note: string | null;
}
