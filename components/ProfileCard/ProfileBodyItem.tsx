import { typeIconMap } from "@/lib/icon";
import {
  PROFILE_COMPONENT_CATEGORY,
  PROFILE_COMPONENT_TYPE,
  ProfileComponent,
} from "@/lib/type";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";

interface ItemProps {
  item: ProfileComponent;
}

// Mapping for each type
const frameComponents = {
  [PROFILE_COMPONENT_CATEGORY.MAIL]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE
  ) => (
    <div className="flex bg-secondary text-secondary-foreground items-center gap-5 relative p-2 mx-4 rounded">
      {typeIconMap[type as keyof typeof typeIconMap]}
      <div>{<a href={`mailto:${value}`}>{value}</a>}</div>
    </div>
  ),

  [PROFILE_COMPONENT_CATEGORY.PHONE]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE
  ) => (
    <div className="flex items-center gap-5 relative p-2 bg-secondary text-secondary-foreground mx-4 rounded">
      {typeIconMap[type as keyof typeof typeIconMap]}
      <div>{value}</div>
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.IMAGE]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE
  ) => (
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
  [PROFILE_COMPONENT_CATEGORY.TEXT]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE
  ) => (
    <div className="p-2 text-center relative">
      <p>{value}</p>
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.VIDEO]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE
  ) => (
    <div className="relative px-4">
      <iframe
        src={value}
        className="w-full h-80 rounded-lg"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.MAP]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE
  ) => (
    <div className="relative px-4">
      <iframe
        src={value}
        className="w-full h-80 rounded-lg"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.FILE]: (
    _: string,
    type: PROFILE_COMPONENT_TYPE
  ) => (
    <div className="flex items-center justify-center p-4 bg-gray-200 rounded">
      <IoCloudUploadOutline className="text-xl" />
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.LINK]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE
  ) => (
    <div className="flex items-center gap-5 relative p-2 bg-secondary text-secondary-foreground mx-4 rounded">
      {typeIconMap[type as keyof typeof typeIconMap]}
      <div>{<a href={value}>{value}</a>}</div>
    </div>
  ),
};

// Get item frame based on type
const getItemFrame = (
  type: PROFILE_COMPONENT_TYPE,
  catagory: PROFILE_COMPONENT_CATEGORY,
  value: string
) =>
  frameComponents[catagory as keyof typeof frameComponents]
    ? frameComponents[catagory as keyof typeof frameComponents](value, type)
    : null;

export default function ProfileDroppable({ item }: ItemProps) {
  return <div>{getItemFrame(item.type, item.category, item.value)}</div>;
}
