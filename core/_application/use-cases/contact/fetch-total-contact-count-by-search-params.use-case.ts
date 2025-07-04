import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";

import {
  IContactFilter,
  ISanitizedContactSearchParams,
} from "@/core/_domain/types/search-params-handler-service.type";

export type FetchTotalContactCountBySearchParamsUseCase = ReturnType<
  typeof fetchTotalContactCountBySearchParamsUseCase
>;

export const fetchTotalContactCountBySearchParamsUseCase =
  (contactRepository: IContactRepository) =>
  async (
    sanitizedSearchParams: ISanitizedContactSearchParams
  ): Promise<number> => {
    const whereClauseRequirement: IContactFilter = {
      cardId: sanitizedSearchParams.cardId,
      tags: sanitizedSearchParams.filters,
      keyword: sanitizedSearchParams.search,
    };

    const totalContactCount =
      await contactRepository.fetchTotalCountBySearchParams(
        whereClauseRequirement
      );

    return totalContactCount;
  };
