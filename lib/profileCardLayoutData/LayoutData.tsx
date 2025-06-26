import ProfileLayoutOne from "@/components/ProfileComponent/ProfileHeaderLayout/ProfileLayoutOne";
import ProfileLayoutTwo from "@/components/ProfileComponent/ProfileHeaderLayout/ProfileLayoutTwo";
import { IFetchCardWithInformationAndDesignData } from "@/core/_domain/repositories/types/card.types";
import { PROFILE_LAYOUT } from "../types/enums";

export const profileLayouts = [
  PROFILE_LAYOUT.LAYOUT_ONE,
  PROFILE_LAYOUT.LAYOUT_TWO,
  PROFILE_LAYOUT.LAYOUT_THREE,
];

// Function to Get Profile Layout Data
export const profileLayoutData = (
  profileCardData: IFetchCardWithInformationAndDesignData
) => ({
  [PROFILE_LAYOUT.LAYOUT_ONE]: (
    <ProfileLayoutOne profileData={profileCardData} />
  ),
  [PROFILE_LAYOUT.LAYOUT_TWO]: (
    <ProfileLayoutTwo profileData={profileCardData} />
  ),
  [PROFILE_LAYOUT.LAYOUT_THREE]: (
    <ProfileLayoutOne profileData={profileCardData} />
  ),
});

export enum ColorableElement {
  BACKGROUND = "BACKGROUND",
  FOREGROUND = "FOREGROUND",
  WAVE = "WAVE",
}

export const colorableElements = [
  ColorableElement.BACKGROUND,
  ColorableElement.FOREGROUND,
  //ColorableElement.WAVE,
];
