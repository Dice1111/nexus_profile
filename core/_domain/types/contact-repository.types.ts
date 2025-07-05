import { CardModel } from "../models/card.model";
import { ContactModel } from "../models/contact.model";
import { DesignModel } from "../models/design.model";
import { InformationModel } from "../models/information.model";
import { CardWithTitleAndID } from "./card-repository.types";
import {
  IContactFilter,
  IContactSort,
} from "./search-params-handler-service.type";

export interface IContactOrganizedSearchParams {
  itemsPerPage: number;
  requestPage: number;
  whereClauseRequirement: IContactFilter;
  sortClauseRequirement: IContactSort;
}

export type ContactWithSpecificCardData = ContactModel & {
  Card: Pick<CardModel, "title">;
  ContactCard: Omit<CardModel, "createdAt" | "updatedAt"> & {
    Design: Pick<DesignModel, "profileImage">;
    Information: Pick<InformationModel, "fullName" | "occupation" | "company">;
  };
};

export interface IContactWithPaginationResponse {
  contacts: ContactWithSpecificCardData[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
}
export type CreateContactInput = Pick<ContactModel, "cardId" | "contactCardId">;

export interface IDailyFollowerCountChartResponse {
  date: string;
  count: number;
}
