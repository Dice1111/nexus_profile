"use server";

import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";
import { FetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";
import { buildFetchProfileCardDataController } from "@/core/_factory/controller-factory/card/build-fetch-profile-card-data-controller";

export async function fetchCardDataAction(cardId: string): Promise<{
  information: FetchInformationData | null;
  design: FetchDesignData | null;
  profileComponents: FetchProfileComponentData[];
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
