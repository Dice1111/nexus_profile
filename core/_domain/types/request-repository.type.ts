import { CardModel } from "../models/card.model";
import { DesignModel } from "../models/design.model";
import { InformationModel } from "../models/information.model";
import { RequestModel } from "../models/request.model";
import {
  IRequestFilter,
  IRequestSort,
} from "./search-params-handler-service.type";

export interface IRequestOrganizedSearchParams {
  itemsPerPage: number;
  requestPage: number;
  whereClauseRequirement: IRequestFilter;
  sortClauseRequirement: IRequestSort;
}

export type RequestWithSpecificCardData = RequestModel & {
  Card: Pick<CardModel, "title">;
  SenderCard: {
    Information: Pick<InformationModel, "fullName" | "occupation" | "company">;
    Design: Pick<DesignModel, "profileImage">;
  };
};

export interface IRequestWithPaginationData {
  requests: RequestWithSpecificCardData[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
}
