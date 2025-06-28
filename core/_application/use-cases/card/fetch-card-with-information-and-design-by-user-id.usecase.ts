import { ICardRepository } from "@/core/_domain/repositories/ICardRepository";
import { CardWithInformationAndDesignData } from "@/core/_domain/types/card-repository.types";
import { IAuthenticationService } from "@/core/_domain/services/IAuthentication.service";

export type IFetchCardWithInformationAndDesignByUserIdUsecase = ReturnType<
  typeof fetchCardWithInformationAndDesignByUserIdUsecase
>;

export const fetchCardWithInformationAndDesignByUserIdUsecase =
  (
    cardRepository: ICardRepository,
    authenticationService: IAuthenticationService
  ) =>
  async (): Promise<CardWithInformationAndDesignData[]> => {
    const userID = await authenticationService.getSession();

    const cardData = await cardRepository.fetchWithInformationAndDesignByUserID(
      userID
    );
    return cardData;
  };
