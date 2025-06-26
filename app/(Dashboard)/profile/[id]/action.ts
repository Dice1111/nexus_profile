"use server";

import { DesignModel } from "@/core/_domain/models/design.model";
import { InformationModel } from "@/core/_domain/models/information.model";
import { ProfileComponentModel } from "@/core/_domain/models/profile-component.model";
import { buildFetchProfileCardDataController } from "@/core/_factory/controller-factory/card/build-fetch-profile-card-data-controller";

export async function fetchCardDataAction(cardID: string): Promise<{
  information: InformationModel;
  design: DesignModel;
  profileComponents: ProfileComponentModel[];
}> {
  try {
    const fetchProfileCardDataController =
      buildFetchProfileCardDataController();

    const data = await fetchProfileCardDataController(cardID);

    return data;
  } catch (error) {
    throw error;
  }
}
