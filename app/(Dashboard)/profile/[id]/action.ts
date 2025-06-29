"use server";

import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";
import { FetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";
import { buildFetchProfileCardDataController } from "@/core/_factory/controller-factory/card/build-fetch-profile-card-data-controller";

export interface IFetchCardDataActionState {
  profileData: {
    information: FetchInformationData | null;
    design: FetchDesignData | null;
    profileComponents: FetchProfileComponentData[];
  };
  success: boolean;
}

export async function fetchCardDataAction(
  cardId: string
): Promise<IFetchCardDataActionState> {
  try {
    const fetchProfileCardDataController =
      buildFetchProfileCardDataController();

    const data = await fetchProfileCardDataController(cardId);

    return { profileData: data, success: true };
  } catch (error) {
    console.log("action_error", error);
    throw error;
  }
}
