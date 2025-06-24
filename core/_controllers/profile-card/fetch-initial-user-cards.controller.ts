import { IFetchCardWithInformationAndDesignUsecase } from "@/core/_application/use-cases/card/fetch-card-with-information-and-design.usecase";

export const fetchInitialUserCardsController = (
    fetchCardWithInformationAndDesignUsecase: IFetchCardWithInformationAndDesignUsecase
) => async () => {

    const cardData = await fetchCardWithInformationAndDesignUsecase();
    
    return cardData;
}