import ProfileLayoutOne from "@/components/ProfileComponent/ProfileHeaderLayout/ProfileLayoutOne";
import { ThemeSchema } from "../type";
import ProfileLayoutTwo from "@/components/ProfileComponent/ProfileHeaderLayout/ProfileLayoutTwo";

// const themeData: ThemeSchema = {
//   theme_one: {
//     imageWrapper: "w-full h-80 relative overflow-hidden",
//     logoWrapper:
//       "absolute bg-red-500 -top-10 right-2 w-[80px] h-[80px] rounded-full overflow-hidden shadow-lg",
//     name: "text-2xl font-semibold",
//     title: "text-xl font-thin mt-2",
//     occupation: "text-xl font-thin",
//     company: "text-xl text-gray-500",
//     quote: "text-sm mt-2 font-thin italic text-gray-500",
//     preferredName: "text-md text-end italic text-gray-500",
//     message: "text-sm mt-1",
//   },
//   theme_two: {
//     imageWrapper: "w-full h-40 relative overflow-hidden",
//     logoWrapper:
//       "absolute bg-red-500 -top-10 right-1/2 translate-x-1/2 w-[80px] h-[80px] rounded-full overflow-hidden shadow-lg",
//     name: "text-2xl font-semibold",
//     title: "text-xl font-thin mt-2",
//     occupation: "text-xl font-thin",
//     company: "text-xl text-gray-500",
//     quote: "text-sm mt-2 font-thin italic text-gray-500",
//     preferredName: "text- text-end italic text-gray-500",
//     message: "text-sm mt-1",
//   },
// };

// export default themeData;

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
