import { ICardRepository } from "@/core/_domain/repositories/ICardRepository";
import { IFetchCardWithInformationAndDesignData } from "@/core/_domain/repositories/types/card.types";
import { IAuthenticationService } from "@/core/_domain/services/IAuthentication.service";

export type IFetchCardWithInformationAndDesignUsecase = ReturnType<typeof fetchCardWithInformationAndDesignUsecase>;

export const fetchCardWithInformationAndDesignUsecase =  (cardRepository: ICardRepository, authenticationService: IAuthenticationService ) => async(): Promise<IFetchCardWithInformationAndDesignData> => {  
    const userID =  await authenticationService.getSession();
    const cardData = await cardRepository.fetchWithInformationAndDesign(userID);  
    return cardData;
}