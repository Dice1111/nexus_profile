import { IFetchCardWithInformationAndDesignByUserIdUsecase } from "@/core/_application/use-cases/card/fetch-card-with-information-and-design-by-user-id.usecase";

export const fetchInitialUserCardsController = (
    fetchCardWithInformationAndDesignUsecase: IFetchCardWithInformationAndDesignByUserIdUsecase
) => async () => {

    const cardData = await fetchCardWithInformationAndDesignUsecase();
    
    return cardData;
}