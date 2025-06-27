"use server";

import { IFetchDesignData } from "@/core/_domain/types/design-repository.types";
import { IFetchInformationData } from "@/core/_domain/types/information-repository.types";
import { IFetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";
import { buildFetchProfileCardDataController } from "@/core/_factory/controller-factory/card/build-fetch-profile-card-data-controller";

export async function fetchCardDataAction(cardId: string): Promise<{
  information: IFetchInformationData | null;
  design: IFetchDesignData | null;
  profileComponents: IFetchProfileComponentData[];
}> {
  try {
    const fetchProfileCardDataController =
      buildFetchProfileCardDataController();

    const data = await fetchProfileCardDataController(cardId);

    return data;
  } catch (error) {
    console.log("action_error", error);
    throw error;
  }
}
