import ProfileLayoutOne from "@/components/ProfileComponent/ProfileHeaderLayout/ProfileLayoutOne";
import ProfileLayoutTwo from "@/components/ProfileComponent/ProfileHeaderLayout/ProfileLayoutTwo";
import { PROFILE_LAYOUT } from "@/core/_domain/enum/design-repository.enum";
import { IFetchDesignData } from "@/core/_domain/types/design-repository.types";
import { IFetchInformationData } from "@/core/_domain/types/information-repository.types";

export const profileLayouts = [
  PROFILE_LAYOUT.LAYOUT_ONE,
  PROFILE_LAYOUT.LAYOUT_TWO,
  PROFILE_LAYOUT.LAYOUT_THREE,
];

// Function to Get Profile Layout Data
export const profileLayoutData = (
  design: IFetchDesignData,
  information: IFetchInformationData
) => ({
  [PROFILE_LAYOUT.LAYOUT_ONE]: (
    <ProfileLayoutOne design={design} information={information} />
  ),
  [PROFILE_LAYOUT.LAYOUT_TWO]: (
    <ProfileLayoutTwo design={design} information={information} />
  ),
  [PROFILE_LAYOUT.LAYOUT_THREE]: (
    <ProfileLayoutOne design={design} information={information} />
  ),
});

// export enum ColorableElement {
//   BACKGROUND = "BACKGROUND",
//   FOREGROUND = "FOREGROUND",
//   WAVE = "WAVE",
// }

// export const colorableElements = [
//   ColorableElement.BACKGROUND,
//   ColorableElement.FOREGROUND,
//   //ColorableElement.WAVE,
// ];
