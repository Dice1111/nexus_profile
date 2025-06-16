import {
  IParsedSearchParams,
  IRawSearchParams,
  ISanitizedSearchParams,
} from "./types/search-params-handler-service.type";

export interface ISearchParamsHandlerService {
  sanitizeRawSearchParams(
    parsedSearchParams: IParsedSearchParams
  ): ISanitizedSearchParams;
  parseSearchParams(rawSearchParams: IRawSearchParams): IParsedSearchParams;
}
