import ProfileLayoutOne from "@/app/(Dashboard)/profile/(ProfileComponent)/(ProfileHeaderLayout)/ProfileLayoutOne";
import ProfileLayoutTwo from "@/app/(Dashboard)/profile/(ProfileComponent)/(ProfileHeaderLayout)/ProfileLayoutTwo";

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
