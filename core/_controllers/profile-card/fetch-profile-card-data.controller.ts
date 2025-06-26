import { IFetchDesignWithCardIdUseCase } from "@/core/_application/use-cases/card/fetch-design-with-card-id.usecase";
import { IFetchInformationWithCardIdUseCase } from "@/core/_application/use-cases/card/fetch-information-with-card-id.usecase";
import { IFetchProfileComponentsWithCardIdUseCase } from "@/core/_application/use-cases/card/fetch-profile-components-with-card-id.usecase";

export const fetchProfileCardDataController = (
  fetchInformationWithCardIdUseCase: IFetchInformationWithCardIdUseCase,
  fetchDesignWithCardIdUseCase: IFetchDesignWithCardIdUseCase,
  fetchProfileComponentsWithCardIdUseCase: IFetchProfileComponentsWithCardIdUseCase
) => {
  return async (cardID: string) => {
    const [information, design, profileComponents] = await Promise.all([
      fetchInformationWithCardIdUseCase(cardID),
      fetchDesignWithCardIdUseCase(cardID),
      fetchProfileComponentsWithCardIdUseCase(cardID),
    ]);

    return { information, design, profileComponents };
  };
};
