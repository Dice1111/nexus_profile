import { profileEditContext } from "@/lib/context";

import { typeIconMap } from "@/lib/icon";
import {
  PROFILE_COMPONENT_CATEGORY,
  PROFILE_COMPONENT_TYPE,
  ProfileComponent,
} from "@/lib/type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { useContext } from "react";
import { CiEdit } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";

interface DroppableProps {
  item: ProfileComponent;
}

// Helper to render edit controls
const EditControls = ({ isEditing }: { isEditing: boolean }) =>
  isEditing ? (
    <div className="absolute right-4 top-0 flex gap-4    items-center">
      <CiEdit className="hover:scale-150 transition" />
      <TiDelete className="text-red-500 hover:scale-150 transition" />
    </div>
  ) : null;

// Reusable iframe component for map and video
const IframeContent = ({
  src,
  isEditing,
}: {
  src: string;
  isEditing: boolean;
}) =>
  !isEditing ? (
    <iframe
      src={src}
      className="w-full h-80 rounded-lg"
      allowFullScreen
      loading="lazy"
    ></iframe>
  ) : (
    <div className="w-full h-80 rounded-lg bg-gray-200 flex items-center justify-center">
      <p className="text-gray-500">Editing mode: Disabled</p>
    </div>
  );

// Mapping for each type
const frameComponents = {
  [PROFILE_COMPONENT_CATEGORY.MAIL]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE,
    isEditing: boolean
  ) => (
    <div className="flex bg-secondary text-secondary-foreground items-center gap-5 relative p-2 mx-4 rounded">
      {typeIconMap[type as keyof typeof typeIconMap]}
      <div>{!isEditing ? <a href={`mailto:${value}`}>{value}</a> : value}</div>
      <EditControls isEditing={isEditing} />
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.PHONE]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE,
    isEditing: boolean
  ) => (
    <div className="flex items-center gap-5 relative p-2 bg-secondary text-secondary-foreground mx-4 rounded">
      {typeIconMap[type as keyof typeof typeIconMap]}
      <div>{value}</div>
      <EditControls isEditing={isEditing} />
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.IMAGE]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE,
    isEditing: boolean
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
      <EditControls isEditing={isEditing} />
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.TEXT]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE,
    isEditing: boolean
  ) => (
    <div className="p-2 text-center relative">
      <p>{value}</p>
      <EditControls isEditing={isEditing} />
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.VIDEO]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE,
    isEditing: boolean
  ) => (
    <div className="relative px-4">
      <IframeContent src={value} isEditing={isEditing} />
      <EditControls isEditing={isEditing} />
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.MAP]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE,
    isEditing: boolean
  ) => (
    <div className="relative px-4">
      <IframeContent src={value} isEditing={isEditing} />
      <EditControls isEditing={isEditing} />
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.FILE]: (
    _: string,
    type: PROFILE_COMPONENT_TYPE,
    isEditing: boolean
  ) => (
    <div className="flex items-center justify-center p-4 bg-gray-200 rounded">
      <IoCloudUploadOutline className="text-xl" />
      <EditControls isEditing={isEditing} />
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.LINK]: (
    value: string,
    type: PROFILE_COMPONENT_TYPE,
    isEditing: boolean
  ) => (
    <div className="flex items-center gap-5 relative p-2 bg-secondary text-secondary-foreground mx-4 rounded">
      {typeIconMap[type as keyof typeof typeIconMap]}
      <div>{!isEditing ? <a href={value}>{value}</a> : value}</div>
      <EditControls isEditing={isEditing} />
    </div>
  ),
};

// Get item frame based on type
const getItemFrame = (
  type: PROFILE_COMPONENT_TYPE,
  catagory: PROFILE_COMPONENT_CATEGORY,
  value: string,
  isEditing: boolean
) =>
  frameComponents[catagory as keyof typeof frameComponents]
    ? frameComponents[catagory as keyof typeof frameComponents](
        value,
        type,
        isEditing
      )
    : null;

export default function Droppable({ item }: DroppableProps) {
  const context = useContext(profileEditContext);

  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  const { isEditing } = context;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled: !isEditing });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {getItemFrame(item.type, item.category, item.value, isEditing)}
    </div>
  );
}
