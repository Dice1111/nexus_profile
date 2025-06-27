import { CONTACT_TAG_ENUM } from "@/core/_domain/enum/contact-repository.enum";
import {
  SORTABLE_ITEMS,
  SORTABLE_ORDERS,
} from "@/core/_domain/enum/search-params-handler-service.enum";
import { InputParseError } from "@/core/_domain/errors/common.error";
import { ISearchParamsHandlerService } from "@/core/_domain/services/ISearchParamsHandler.service";
import {
  IParsedSearchParams,
  IRawSearchParams,
  ISanitizedContactSearchParams,
  ISanitizedRequestSearchParams,
} from "@/core/_domain/types/search-params-handler-service.type";
import {
  validSortFieldsSet,
  validSortOrdersSet,
  validTagsSet,
} from "@/lib/utils";

export class SearchParamsHandlerService implements ISearchParamsHandlerService {
  private static readonly DEFAULT_PAGE_NO: number = 1;
  private static readonly DEFAULT_SORT_ITEM: SORTABLE_ITEMS =
    SORTABLE_ITEMS.CREATED_AT;
  private static readonly DEFAULT_SORT_ORDER: SORTABLE_ORDERS =
    SORTABLE_ORDERS.DESC;

  sanitizeRawSearchParamsForContact(
    data: IParsedSearchParams
  ): ISanitizedContactSearchParams {
    return {
      cardId: data.cardId,
      search: data.search?.trim() || undefined,
      page: Math.max(
        SearchParamsHandlerService.DEFAULT_PAGE_NO,
        Number(data.page) || SearchParamsHandlerService.DEFAULT_PAGE_NO
      ),
      filters: this.normalizedFilters(data.filters),
      sortItem: validSortFieldsSet.has(data.sortItem as SORTABLE_ITEMS)
        ? (data.sortItem as SORTABLE_ITEMS)
        : SearchParamsHandlerService.DEFAULT_SORT_ITEM,
      sortOrder: validSortOrdersSet.has(data.sortOrder as SORTABLE_ORDERS)
        ? (data.sortOrder as SORTABLE_ORDERS)
        : SearchParamsHandlerService.DEFAULT_SORT_ORDER,
    };
  }

  sanitizeRawSearchParamsForRequest(
    data: IParsedSearchParams
  ): ISanitizedRequestSearchParams {
    return {
      cardId: data.cardId,
      search: data.search?.trim() || undefined,
      page: Math.max(
        SearchParamsHandlerService.DEFAULT_PAGE_NO,
        Number(data.page) || SearchParamsHandlerService.DEFAULT_PAGE_NO
      ),
      sortItem: validSortFieldsSet.has(data.sortItem as SORTABLE_ITEMS)
        ? (data.sortItem as SORTABLE_ITEMS)
        : SearchParamsHandlerService.DEFAULT_SORT_ITEM,
      sortOrder: validSortOrdersSet.has(data.sortOrder as SORTABLE_ORDERS)
        ? (data.sortOrder as SORTABLE_ORDERS)
        : SearchParamsHandlerService.DEFAULT_SORT_ORDER,
    };
  }

  parseSearchParams(params: IRawSearchParams): IParsedSearchParams {
    if (
      !params.cardId ||
      typeof params.cardId !== "string" ||
      params.cardId.trim() === ""
    ) {
      throw new InputParseError("Invalid card ID");
    }

    return {
      cardId: params.cardId,
      search:
        typeof params.search === "string" && params.search.trim() !== ""
          ? params.search
          : undefined,
      page:
        typeof params.page === "string" && params.page.trim() !== ""
          ? params.page
          : SearchParamsHandlerService.DEFAULT_PAGE_NO.toString(),
      filters: Array.isArray(params.filter)
        ? params.filter
        : params.filter
        ? [params.filter]
        : undefined,
      sortItem:
        typeof params.sortItem === "string" && params.sortItem.trim() !== ""
          ? params.sortItem
          : SearchParamsHandlerService.DEFAULT_SORT_ITEM,
      sortOrder:
        typeof params.sortOrder === "string"
          ? params.sortOrder
          : SearchParamsHandlerService.DEFAULT_SORT_ORDER,
    };
  }

  private normalizedFilters = (
    input?: string[]
  ): CONTACT_TAG_ENUM[] | undefined => {
    if (!input || input.length === 0) return undefined;

    const filtered = input.filter((tag): tag is CONTACT_TAG_ENUM =>
      validTagsSet.has(tag as CONTACT_TAG_ENUM)
    );

    return filtered.length > 0 ? filtered : undefined;
  };
}
