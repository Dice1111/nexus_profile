import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";
import { IAuthenticationService } from "@/core/_domain/services/IAuthentication.service";
import { ContactWithSpecificCardData } from "@/core/_domain/types/contact-repository.types";
import {
  IContactFilter,
  IContactSort,
  ISanitizedContactSearchParams,
} from "@/core/_domain/types/search-params-handler-service.type";

export type FetchContactsWithSpecificCardDataBySearchParamsUseCase = ReturnType<
  typeof fetchContactsWithSpecificCardDataBySearchParamsUseCase
>;

export const fetchContactsWithSpecificCardDataBySearchParamsUseCase =
  (
    contactRepository: IContactRepository,
    authservice: IAuthenticationService
  ) =>
  async (
    sanitizedSearchParams: ISanitizedContactSearchParams,
    itemsPerPage: number
  ): Promise<ContactWithSpecificCardData[]> => {
    const whereClauseRequirement: IContactFilter = {
      userId: await authservice.getSession(),
      cardId: sanitizedSearchParams.cardId,
      tags: sanitizedSearchParams.filters,
      keyword: sanitizedSearchParams.search,
    };

    const sortClauseRequirement: IContactSort = {
      item: sanitizedSearchParams.sortItem,
      order: sanitizedSearchParams.sortOrder,
    };

    const requestPage = sanitizedSearchParams.page;

    const data =
      await contactRepository.fetchWithSpecificCardDataBySearchParams({
        itemsPerPage,
        requestPage,
        whereClauseRequirement,
        sortClauseRequirement,
      });

    return data;
  };
