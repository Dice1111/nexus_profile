import ProfileLayoutOne from "@/components/ProfileComponent/ProfileHeaderLayout/ProfileLayoutOne";
import ProfileLayoutTwo from "@/components/ProfileComponent/ProfileHeaderLayout/ProfileLayoutTwo";
import { ProfileCard } from "../type";

export enum ProfileLayout {
  layout_one = "classic",
  layout_two = "modern",
  layout_three = "minimal",
}

export const profileLayouts = [
  ProfileLayout.layout_one,
  ProfileLayout.layout_two,
  ProfileLayout.layout_three,
];

// Function to Get Profile Layout Data
export const profileLayoutData = (profileCardData: ProfileCard) => ({
  [ProfileLayout.layout_one]: (
    <ProfileLayoutOne profileData={profileCardData} />
  ),
  [ProfileLayout.layout_two]: (
    <ProfileLayoutTwo profileData={profileCardData} />
  ),
  [ProfileLayout.layout_three]: (
    <ProfileLayoutOne profileData={profileCardData} />
  ),
});

export enum ColorableElement {
  BACKGROUND = "background",
  FOREGROUND = "foreground",
  WAVE = "wave",
}

export const colorableElements = [
  ColorableElement.BACKGROUND,
  ColorableElement.FOREGROUND,
  ColorableElement.WAVE,
];
