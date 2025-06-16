import {
  IRawSearchParams,
  ISanitizedSearchParams,
} from "./types/search-params-handler-service.type";

export interface ISearchParamsHandlerService {
  sanitizeRawSearchParams(data: IRawSearchParams): ISanitizedSearchParams;
  parseSearchParams(
    params: Record<string, string | string[] | undefined>
  ): IRawSearchParams;
}
