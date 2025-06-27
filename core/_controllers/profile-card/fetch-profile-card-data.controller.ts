import { IFetchDesignWithCardIdUseCase } from "@/core/_application/use-cases/card/fetch-design-with-card-id.usecase";
import { IFetchInformationWithCardIdUseCase } from "@/core/_application/use-cases/card/fetch-information-with-card-id.usecase";
import { IFetchProfileComponentsWithCardIdUseCase } from "@/core/_application/use-cases/card/fetch-profile-components-with-card-id.usecase";
import { IFetchDesignData } from "@/core/_domain/types/design-repository.types";
import { IFetchInformationData } from "@/core/_domain/types/information-repository.types";
import { IFetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";

export const fetchProfileCardDataController =
  (
    fetchInformationWithCardIdUseCase: IFetchInformationWithCardIdUseCase,
    fetchDesignWithCardIdUseCase: IFetchDesignWithCardIdUseCase,
    fetchProfileComponentsWithCardIdUseCase: IFetchProfileComponentsWithCardIdUseCase
  ) =>
  async (
    cardID: string
  ): Promise<{
    information: IFetchInformationData | null;
    design: IFetchDesignData | null;
    profileComponents: IFetchProfileComponentData[];
  }> => {
    const [information, design, profileComponents] = await Promise.all([
      fetchInformationWithCardIdUseCase(cardID),
      fetchDesignWithCardIdUseCase(cardID),
      fetchProfileComponentsWithCardIdUseCase(cardID),
    ]);

    return { information, design, profileComponents };
  };
