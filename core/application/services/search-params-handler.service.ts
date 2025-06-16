import { CONTACT_TAG_ENUM } from "@/core/domain/enum/contact-tag.enum";
import {
  SORTABLE_ITEMS,
  SORTABLE_ORDERS,
} from "@/core/domain/enum/search-params-handler-service.enum";
import { InputParseError } from "@/core/domain/errors/common.error";
import { ISearchParamsHandlerService } from "@/core/domain/services/ISearchParamsHandler.service";
import {
  IRawSearchParams,
  ISanitizedSearchParams,
} from "@/core/domain/services/types/search-params-handler-service.type";
import {
  validSortFieldsSet,
  validSortOrdersSet,
  validTagsSet,
} from "@/lib/utils";

export class SearchParamsHandler implements ISearchParamsHandlerService {
  private static readonly DEFAULT_PAGE_NO = "1";
  private static readonly DEFAULT_SORT_ITEM = SORTABLE_ITEMS.CREATED_AT;
  private static readonly DEFAULT_SORT_ORDER = SORTABLE_ORDERS.DESC;

  sanitizeRawSearchParams(data: IRawSearchParams): ISanitizedSearchParams {
    return {
      cardId: data.cardId,
      search: data.search?.trim() || undefined,
      page: data.page?.trim() || SearchParamsHandler.DEFAULT_PAGE_NO,
      filters: this.normalizedFilters(data.filters),
      sortItem: validSortFieldsSet.has(data.sortItem as SORTABLE_ITEMS)
        ? (data.sortItem as SORTABLE_ITEMS)
        : SearchParamsHandler.DEFAULT_SORT_ITEM,
      sortOrder: validSortOrdersSet.has(data.sortOrder as SORTABLE_ORDERS)
        ? (data.sortOrder as SORTABLE_ORDERS)
        : SearchParamsHandler.DEFAULT_SORT_ORDER,
    };
  }

  parseSearchParams(
    params: Record<string, string | string[] | undefined>
  ): IRawSearchParams {
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
          : SearchParamsHandler.DEFAULT_PAGE_NO,
      filters: Array.isArray(params.filter)
        ? params.filter
        : params.filter
        ? [params.filter]
        : undefined,
      sortItem:
        typeof params.sortItem === "string" && params.sortItem.trim() !== ""
          ? params.sortItem
          : SearchParamsHandler.DEFAULT_SORT_ITEM,
      sortOrder:
        typeof params.sortOrder === "string"
          ? params.sortOrder
          : SearchParamsHandler.DEFAULT_SORT_ORDER,
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
