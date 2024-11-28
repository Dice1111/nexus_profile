import { typeIconMap } from "@/lib/icon";
import {
  PROFILE_COMPONENT_CATEGORY,
  PROFILE_COMPONENT_TYPE,
  ProfileComponent,
} from "@/lib/type";
import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";

interface ItemProps {
  item: ProfileComponent;
}

// Mapping for each type
const frameComponents = {
  [PROFILE_COMPONENT_CATEGORY.MAIL]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE,
    display_text: string
  ) => (
    <a href={`mailto:${value}`}>
      <div className="flex bg-secondary text-secondary-foreground items-center gap-5 relative p-2 mx-4 rounded hover:scale-105 transition">
        {typeIconMap[type as keyof typeof typeIconMap]}
        <div>
          <p>{value}</p>
          <div className="font-thin text-sm">{display_text}</div>
        </div>
      </div>
    </a>
  ),

  [PROFILE_COMPONENT_CATEGORY.PHONE]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE,
    display_text: string
  ) => (
    <div className="flex items-center gap-5 relative p-2 bg-secondary text-secondary-foreground mx-4 rounded hover:scale-105 transition">
      {typeIconMap[type as keyof typeof typeIconMap]}
      <div>
        {value} <br />
        <div className="font-thin text-sm">{display_text}</div>
      </div>
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.IMAGE]: (value: string) => (
    <div className="relative">
      <Image
        src={value}
        width={500}
        height={500}
        alt="Uploaded image"
        className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
        priority
      />
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.TEXT]: (value: string, display_text: string) => (
    <div className="p-2 text-center relative">
      <p>{value}</p>
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.VIDEO]: (value: string, display_text: string) => (
    <div className="relative px-4">
      <iframe
        src={value}
        className="w-full h-80 rounded-lg"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.MAP]: (value: string, display_text: string) => (
    <div className="relative px-4">
      <iframe
        src={value}
        className="w-full h-80 rounded-lg"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.FILE]: (_: string, display_text: string) => (
    <div className="flex items-center justify-center p-4 bg-gray-200 rounded">
      <IoCloudUploadOutline className="text-xl" />
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.LINK]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE,
    display_text: string
  ) => (
    <a href={value}>
      <div className="flex items-center gap-5 relative p-2 bg-secondary text-secondary-foreground mx-4 rounded hover:scale-105 transition">
        {typeIconMap[type as keyof typeof typeIconMap]}
        <div>
          <p>{display_text}</p>
        </div>
      </div>
    </a>
  ),
};

// Get item frame based on type
const getItemFrame = (
  type: PROFILE_COMPONENT_TYPE,
  catagory: PROFILE_COMPONENT_CATEGORY,
  value: string,
  display_text: string
) =>
  frameComponents[catagory as keyof typeof frameComponents]
    ? frameComponents[catagory as keyof typeof frameComponents](
        value,
        type,
        display_text
      )
    : null;

export default function ProfileDroppable({ item }: ItemProps) {
  return (
    <div>
      {getItemFrame(item.type, item.category, item.value, item.display_text)}
    </div>
  );
}
