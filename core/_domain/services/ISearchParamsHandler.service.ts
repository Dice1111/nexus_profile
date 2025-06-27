import {
  IParsedSearchParams,
  IRawSearchParams,
  ISanitizedContactSearchParams,
  ISanitizedRequestSearchParams,
} from "../types/search-params-handler-service.type";

export interface ISearchParamsHandlerService {
  sanitizeRawSearchParamsForContact(
    parsedSearchParams: IParsedSearchParams
  ): ISanitizedContactSearchParams;
  sanitizeRawSearchParamsForRequest(
    parsedSearchParams: IParsedSearchParams
  ): ISanitizedRequestSearchParams;
  parseSearchParams(rawSearchParams: IRawSearchParams): IParsedSearchParams;
}
