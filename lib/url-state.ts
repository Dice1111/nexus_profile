import { ReadonlyURLSearchParams } from "next/navigation";

export interface SearchParams {
  search?: string;
  page?: string;
  filter?: string[];
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
    filter: Array.isArray(params.filter) ? params.filter : undefined,
  };
}

export function parseReadonlySearchParams(
  params: ReadonlyURLSearchParams
): SearchParams {
  const rawSearch = params.get("search");
  const rawPage = params.get("page");
  const rawFilter = params.getAll("filter");

  return {
    search:
      typeof rawSearch === "string" && rawSearch.trim() !== ""
        ? rawSearch.trim()
        : undefined,
    page:
      typeof rawPage === "string" && rawPage.trim() !== ""
        ? rawPage.trim()
        : undefined,
    filter:
      Array.isArray(rawFilter) && rawFilter.length > 0
        ? rawFilter.filter(
            (v): v is string => typeof v === "string" && v.trim() !== ""
          )
        : undefined,
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
