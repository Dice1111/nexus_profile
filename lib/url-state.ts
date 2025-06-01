import { ReadonlyURLSearchParams } from "next/navigation";

export const URL_FILTER = "filter";
export const URL_PAGE = "page";
export const URL_SORT_IEM = "sortItem";
export const URL_SORT_ORDER = "sortOrder";
export const URL_SEARCH = "search";

export interface SearchParams {
  search?: string;
  page?: string;
  filter?: string[];
  sortItem?: string;
  sortOrder?: string;
}

export function parseSearchParams(
  params: Record<string, string | string[] | undefined>
): SearchParams {
  return {
    search:
      typeof params.search === "string" && params.search !== ""
        ? params.search
        : undefined,
    page: typeof params.page === "string" ? params.page : undefined,
    filter: Array.isArray(params.filter)
      ? params.filter
      : params.filter
      ? [params.filter]
      : undefined,
    sortItem: typeof params.sortItem === "string" ? params.sortItem : undefined,
    sortOrder:
      typeof params.sortOrder === "string" ? params.sortOrder : undefined,
  };
}

export function parseReadonlySearchParams(
  params: ReadonlyURLSearchParams
): SearchParams {
  const rawSearch = params.get(URL_SEARCH);
  const rawPage = params.get(URL_PAGE);
  const rawFilter = params.getAll(URL_FILTER); // always returns string[]
  const rawSortItem = params.get(URL_SORT_IEM);
  const rawSortOrder = params.get(URL_SORT_ORDER);

  return {
    search: rawSearch?.trim() !== "" ? rawSearch?.trim() : undefined,

    page: rawPage?.trim() !== "" ? rawPage?.trim() : undefined,

    filter:
      rawFilter.length > 0
        ? rawFilter.map((f) => f.trim()).filter((v): v is string => v !== "")
        : undefined,
    sortItem: rawSortItem?.trim() !== "" ? rawSortItem?.trim() : undefined,
    sortOrder: rawSortOrder?.trim() !== "" ? rawSortOrder?.trim() : undefined,
  };
}

export function stringifySearchParams(params: SearchParams): string {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      urlParams.append(key, value);
    }
  });
  return urlParams.toString();
}
