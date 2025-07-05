import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";
import { IAuthenticationService } from "@/core/_domain/services/IAuthentication.service";

import {
  IContactFilter,
  ISanitizedContactSearchParams,
} from "@/core/_domain/types/search-params-handler-service.type";

export type FetchTotalContactCountBySearchParamsUseCase = ReturnType<
  typeof fetchTotalContactCountBySearchParamsUseCase
>;

export const fetchTotalContactCountBySearchParamsUseCase =
  (
    contactRepository: IContactRepository,
    authservice: IAuthenticationService
  ) =>
  async (
    sanitizedSearchParams: ISanitizedContactSearchParams
  ): Promise<number> => {
    const whereClauseRequirement: IContactFilter = {
      userId: await authservice.getSession(),
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
