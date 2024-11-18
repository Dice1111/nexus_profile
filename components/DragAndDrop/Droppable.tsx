import { TfiEmail } from "react-icons/tfi";
import { PiPhoneCallLight } from "react-icons/pi";
import { FaImage, FaLink, FaVideo } from "react-icons/fa";
import { MdTextFields } from "react-icons/md";
import { Item } from "@/lib/type";
import { useSortable } from "@dnd-kit/sortable";
import React, { useContext } from "react";
import { CSS } from "@dnd-kit/utilities";
import { profileEditContext } from "@/lib/context";
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";

interface DroppableProps {
  item: Item;
}

// Map ITEM_TYPE to corresponding icons
const getItemIcon = (type: string) => {
  switch (type) {
    case "email":
      return <TfiEmail />;
    case "phone":
      return <PiPhoneCallLight />;
    case "img":
      return <FaImage />;
    case "textarea":
      return <MdTextFields />;
    case "link":
      return <FaLink />;
    case "video":
      return <FaVideo />;
    case "audio":
      return <FaVideo />;
    default:
      return null;
  }
};

const Droppable = ({ item }: DroppableProps) => {
  const context = useContext(profileEditContext);

  if (!context) {
    throw new Error("profileEditContext is null");
  }

  const { isEditing } = context;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id, disabled: !isEditing });

  const style = {
    transition: transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-2 bg-secondary rounded shadow touch-none flex items-center gap-5 relative"
    >
      {getItemIcon(item.type)}
      <div className="">{item.value}</div>
      {isEditing && (
        <div className="absolute right-4 flex gap-4 h-full items-center">
          <CiEdit className="hover:scale-150 transition" />
          <TiDelete className=" text-red-500 hover:scale-150 transition" />
        </div>
      )}
    </div>
  );
};

export default Droppable;
