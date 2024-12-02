import ProfileLayoutOne from "@/components/ProfileComponent/ProfileHeaderLayout/ProfileLayoutOne";
import ProfileLayoutTwo from "@/components/ProfileComponent/ProfileHeaderLayout/ProfileLayoutTwo";

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

export const profileLayoutData = {
  [ProfileLayout.layout_one]: <ProfileLayoutOne />,
  [ProfileLayout.layout_two]: <ProfileLayoutTwo />,
  [ProfileLayout.layout_three]: <ProfileLayoutOne />,
};

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
