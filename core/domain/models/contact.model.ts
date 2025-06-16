import { CONTACT_TAG_TYPE } from "@/lib/types/enums";

export interface ContactModel {
  id: number;
  cardId: string;
  contactCardId: string;
  createdAt: Date;
  updatedAt: Date;
  tag: CONTACT_TAG_TYPE;
  note: string | null;
}
