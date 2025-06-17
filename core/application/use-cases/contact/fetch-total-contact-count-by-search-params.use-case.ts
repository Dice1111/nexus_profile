import { IContactRepository } from "@/core/domain/repositories/IContactRepository";

import {
  IContactFilter,
  ISanitizedSearchParams,
} from "@/core/domain/services/types/search-params-handler-service.type";

export type IFetchTotalContactCountBySearchParamsUseCase = ReturnType<
  typeof fetchTotalContactCountBySearchParamsUseCase
>;

export const fetchTotalContactCountBySearchParamsUseCase =
  (contactRepository: IContactRepository) =>
  async (sanitizedSearchParams: ISanitizedSearchParams): Promise<number> => {
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
