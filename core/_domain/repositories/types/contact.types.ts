import { CONTACT_TAG_TYPE } from "@prisma/client";
import { CONTACT_TAG_ENUM } from "../../enum/contact-tag.enum";
import { ContactModel } from "../../models/contact.model";
import {
  IContactFilter,
  IContactSort,
} from "../../services/types/search-params-handler-service.type";

export interface IContactOrganizedSearchParams {
  itemsPerPage: number;
  requestPage: number;
  whereClauseRequirement: IContactFilter;
  sortClauseRequirement: IContactSort;
}

export interface IContactWithSpecificCardData {
  id: number;
  cardId: string;
  contactCardId: string;
  tag: CONTACT_TAG_ENUM;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  contactCardTitle: string | null;
  contactCardUserId: string;
  fullName: string;
  occupation: string | null;
  company: string | null;
}

export interface IRawContactWithSpecificCardData {
  id: number;
  cardId: string;
  contactCardId: string;
  createdAt: Date;
  updatedAt: Date;
  tag: CONTACT_TAG_TYPE;
  note: string | null;
  ContactCard: {
    id: string;
    title: string | null;
    userId: string;
    Information: {
      fullName: string;
      occupation: string | null;
      company: string | null;
    } | null;
  };
}

export interface IContactWithPaginationData {
  contacts: IContactWithSpecificCardData[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
}
type BaseContact = Omit<
  ContactModel,
  "id" | "note" | "tag" | "createdAt" | "updatedAt"
>;
export interface ICreateContactData extends BaseContact {}

export interface IDailyFollowerCountChartData {
  date: string;
  count: number;
}
