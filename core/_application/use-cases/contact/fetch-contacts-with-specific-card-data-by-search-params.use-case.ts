import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";
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
  (contactRepository: IContactRepository) =>
  async (
    sanitizedSearchParams: ISanitizedContactSearchParams,
    itemsPerPage: number
  ): Promise<ContactWithSpecificCardData[]> => {
    const whereClauseRequirement: IContactFilter = {
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
