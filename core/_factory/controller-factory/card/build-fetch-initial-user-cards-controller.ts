import { fetchCardWithInformationAndDesignUsecase } from "@/core/_application/use-cases/card/fetch-card-with-information-and-design.usecase";
import { fetchInitialUserCardsController } from "@/core/_controllers/profile-card/fetch-initial-user-cards.controller";

import { CardRepository } from "@/core/_infrastructure/repositories/card.repository";
import { AuthenticationService } from "@/core/_infrastructure/services/authentication.service";


export function buildFetchInitialUserCardsController() {

    const cardRepository = new CardRepository();
    const authenticationService = new AuthenticationService();
    const fetchInitialUserCards = fetchCardWithInformationAndDesignUsecase(cardRepository,authenticationService);

    return fetchInitialUserCardsController(fetchInitialUserCards);

}