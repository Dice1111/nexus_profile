"use server";

import { CardWithInformationAndDesignData } from "@/core/_domain/types/card-repository.types";
import { buildFetchInitialUserCardsController } from "@/core/_factory/controller-factory/card/build-fetch-initial-user-cards-controller";

export interface IGetUserInitialCardsDataActionState {
  success: boolean;
  data: CardWithInformationAndDesignData[];
}

export async function getUserInitialCardsDataAction(): Promise<IGetUserInitialCardsDataActionState> {
  try {
    const fetchInitialUserCardsController =
      buildFetchInitialUserCardsController();
    const data = await fetchInitialUserCardsController();

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    throw error;
  }
}
