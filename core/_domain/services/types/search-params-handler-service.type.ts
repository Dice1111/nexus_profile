import { CONTACT_TAG_ENUM } from "../../enum/contact-tag.enum";
import {
  SORTABLE_ITEMS,
  SORTABLE_ORDERS,
} from "../../enum/search-params-handler-service.enum";

export interface IRawSearchParams {
  [key: string]: string | string[] | undefined;
}

export interface IParsedSearchParams {
  cardId: string;
  search?: string;
  page: string;
  filters?: string[];
  sortItem: string;
  sortOrder: string;
}

export interface ISanitizedContactSearchParams {
  cardId: string;
  search?: string;
  page: number;
  filters?: CONTACT_TAG_ENUM[];
  sortItem: SORTABLE_ITEMS;
  sortOrder: SORTABLE_ORDERS;
}

export interface ISanitizedRequestSearchParams {
  cardId: string;
  search?: string;
  page: number;
  sortItem: SORTABLE_ITEMS;
  sortOrder: SORTABLE_ORDERS;
}

export interface IRequestFilter {
  cardId: string;
  keyword?: string;
}

export interface IRequestSort {
  item: SORTABLE_ITEMS;
  order: SORTABLE_ORDERS;
}

export interface IContactFilter {
  cardId: string;
  tags?: CONTACT_TAG_ENUM[];
  keyword?: string;
}

export interface IContactSort {
  item: SORTABLE_ITEMS;
  order: SORTABLE_ORDERS;
}
