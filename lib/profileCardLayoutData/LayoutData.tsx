import ProfileLayoutOne from "@/components/ProfileComponent/ProfileHeaderLayout/ProfileLayoutOne";
import ProfileLayoutTwo from "@/components/ProfileComponent/ProfileHeaderLayout/ProfileLayoutTwo";
import { PROFILE_LAYOUT } from "@/core/_domain/enum/design-repository.enum";

// Function to Get Profile Layout Data
export const getProfileLayoutComponent = (layout: PROFILE_LAYOUT) => {
  switch (layout) {
    case PROFILE_LAYOUT.LAYOUT_ONE:
      return <ProfileLayoutOne />;
    case PROFILE_LAYOUT.LAYOUT_TWO:
      return <ProfileLayoutTwo />;
    case PROFILE_LAYOUT.LAYOUT_THREE:
      return <ProfileLayoutOne />;
    default:
      return null; // or a default layout/component
  }
};

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
