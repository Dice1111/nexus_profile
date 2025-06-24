import {
  IRequestFilter,
  IRequestSort,
} from "../../services/types/search-params-handler-service.type";

export interface IRequestOrganizedSearchParams {
  itemsPerPage: number;
  requestPage: number;
  whereClauseRequirement: IRequestFilter;
  sortClauseRequirement: IRequestSort;
}

export interface IRawRequestWithSpecificCardData {
  id: number;
  cardId: string;
  senderCardId: string;
  createdAt: Date;
  updatedAt: Date;
  SenderCard: {
    Information: {
      fullName: string;
      occupation: string | null;
      company: string | null;
    } | null;
  };
}
export interface IRequestWithSpecificCardData {
  id: number;
  cardId: string;
  senderCardId: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  occupation: string | null;
  company: string | null;
}

export interface IRequestWithPaginationData {
  requests: IRequestWithSpecificCardData[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
}
