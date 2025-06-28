import { ICardRepository } from "@/core/_domain/repositories/ICardRepository";
import { CardWithTitleAndID } from "@/core/_domain/types/card-repository.types";
import { IAuthenticationService } from "@/core/_domain/services/IAuthentication.service";

export const fetchCardsTitleAndNameUseCaseByUserId =
  (
    cardRepository: ICardRepository,
    authenticationService: IAuthenticationService
  ) =>
  async (): Promise<CardWithTitleAndID[]> => {
    const userID = await authenticationService.getSession();
    const cards = await cardRepository.fetchByUserID(userID);
    return cards;
  };
