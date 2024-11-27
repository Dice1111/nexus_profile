import { ThemeSchema } from "../type";

const themeData: ThemeSchema = {
  theme_one: {
    imageWrapper: "w-full h-80 relative overflow-hidden",
    logoWrapper:
      "absolute bg-red-500 -top-10 right-2 w-[80px] h-[80px] rounded-full overflow-hidden shadow-lg",
    name: "text-2xl font-semibold",
    title: "text-xl font-thin mt-2",
    occupation: "text-xl font-thin",
    company: "text-xl text-gray-500",
    quote: "text-sm mt-2 font-thin italic text-gray-500",
    preferredName: "text-md text-end italic text-gray-500",
    message: "text-sm mt-1",
  },
  theme_two: {
    imageWrapper: "w-full h-40 relative overflow-hidden",
    logoWrapper:
      "absolute bg-red-500 -top-10 right-1/2 translate-x-1/2 w-[80px] h-[80px] rounded-full overflow-hidden shadow-lg",
    name: "text-2xl font-semibold",
    title: "text-xl font-thin mt-2",
    occupation: "text-xl font-thin",
    company: "text-xl text-gray-500",
    quote: "text-sm mt-2 font-thin italic text-gray-500",
    preferredName: "text- text-end italic text-gray-500",
    message: "text-sm mt-1",
  },
};

export default themeData;
