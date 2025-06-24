import { ICardRepository } from "@/core/_domain/repositories/ICardRepository";
import { IAuthenticationService } from "@/core/_domain/services/IAuthentication.service";


export const fetchCardsTitleAndNameUseCase = (cardRepository: ICardRepository, authenticationService: IAuthenticationService) => async () => {
    

    const userID =  await authenticationService.getSession();
    const cards = await cardRepository.fetch(userID);


    return cards;
};