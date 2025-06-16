import { CONTACT_TAG_TYPE } from "@prisma/client";
import { CONTACT_TAG_ENUM } from "../../enum/contact-tag.enum";
import {
  IContactFilter,
  IContactSort,
} from "../../services/types/search-params-handler-service.type";

export interface IOrganizedSearchParams {
  requestPage: number;
  whereClauseRequirement: IContactFilter;
  sortClauseRequirement: IContactSort;
}

export interface IRawContact {
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

export interface IRawContactWithPaginationData {
  contacts: IRawContact[];
  itemsPerPage: number;
}

export interface IFlatContactWithPaginationData {
  contacts: IFlatContact[];
  totalPage: number;
  currentPage: number;
}

export interface IFlatContact {
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
