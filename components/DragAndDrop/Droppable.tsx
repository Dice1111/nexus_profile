import { TfiEmail } from "react-icons/tfi";
import { PiPhoneCallLight } from "react-icons/pi";
import { FaImage, FaLink, FaMapMarkerAlt, FaVideo } from "react-icons/fa";
import { MdOutlineLink, MdTextFields } from "react-icons/md";
import { Item } from "@/lib/type";
import { useSortable } from "@dnd-kit/sortable";
import React, { useContext } from "react";
import { CSS } from "@dnd-kit/utilities";
import { profileEditContext } from "@/lib/context";
import { CiEdit } from "react-icons/ci";
import { TiDelete, TiSocialYoutube } from "react-icons/ti";
import Image from "next/image";
import { GoPeople } from "react-icons/go";
import { IoCloudUploadOutline } from "react-icons/io5";
interface DroppableProps {
  item: Item;
}

// // Map ITEM_TYPE to corresponding icons
// const getItemIcon = (type: string) => {
//   switch (type) {
//     case "email":
//       return;
//     case "phone":
//       return <PiPhoneCallLight />;
//     case "img":
//       return <FaImage />;
//     case "textarea":
//       return <MdTextFields />;
//     case "link":
//       return <FaLink />;
//     case "video":
//       return <FaVideo />;
//     case "audio":
//       return <FaVideo />;
//     default:
//       return null;
//   }
// };

const getItemFrame = (type: string, value: string, isEditing: boolean) => {
  switch (type) {
    case "email":
      return (
        <div className="flex items-center gap-5 relative p-2 bg-secondary mx-4 rounded">
          <TfiEmail />
          <div>
            {!isEditing ? <a href={`mailto:${value}`}>{value}</a> : value}
          </div>
          {isEditing && (
            <div className="absolute right-4 flex gap-4 h-full items-center">
              <CiEdit className="hover:scale-150 transition" />
              <TiDelete className="text-red-500 hover:scale-150 transition" />
            </div>
          )}
        </div>
      );
    case "phone":
      return (
        <div className="flex items-center gap-5 relative p-2 bg-secondary mx-4 rounded">
          <PiPhoneCallLight />
          <div className="">{value}</div>
          {isEditing && (
            <div className="absolute right-4 flex gap-4 h-full items-center">
              <CiEdit className="hover:scale-150 transition" />
              <TiDelete className=" text-red-500 hover:scale-150 transition" />
            </div>
          )}
        </div>
      );
    case "img":
      return (
        <div className="relative">
          <Image
            src={value}
            width={500}
            height={500}
            alt="Picture of the author"
            className=" w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
          {isEditing && (
            <div className="absolute right-4 top-8 flex gap-4  items-center">
              <CiEdit className="hover:scale-150 transition " />
              <TiDelete className=" text-red-500 hover:scale-150 transition" />
            </div>
          )}
        </div>
      );
    case "text":
      return (
        <>
          <div className="py-2 text-center text-secondary relative">
            <p>{value}</p>
            {isEditing && (
              <div className="absolute right-4 top-1 flex gap-4 items-center">
                <CiEdit className="hover:scale-150 transition" />
                <TiDelete className=" text-red-500 hover:scale-150 transition" />
              </div>
            )}
          </div>
        </>
      );
    case "link":
      return (
        <div className="flex items-center gap-5 relative p-2 bg-secondary mx-4 rounded">
          <MdOutlineLink />
          <div>
            {!isEditing ? (
              <a
                href="https://www.apple.com/sg/store?afid=p238%7CshGhc4OE7-dc_mtid_18707vxu38484_pcrid_719359532044_pgrid_15033774143_pntwk_g_pchan__pexid__ptid_kwd-10778630_&cid=aos-sg-kwgo-Brand--slid---product-"
                target="_blank"
                rel="noopener noreferrer"
              >
                {value}
              </a>
            ) : (
              value
            )}
          </div>
          {isEditing && (
            <div className="absolute right-4 flex gap-4 h-full items-center">
              <CiEdit className="hover:scale-150 transition" />
              <TiDelete className="text-red-500 hover:scale-150 transition" />
            </div>
          )}
        </div>
      );
    case "video":
      return (
        <div className="relative px-4">
          {!isEditing ? (
            <iframe
              src={value}
              className="w-full h-80 rounded-lg "
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-80 rounded-lg bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Editing mode: Video disabled</p>
            </div>
          )}
          {isEditing && (
            <div className="absolute right-4 top-8 flex gap-4 items-center">
              <CiEdit className="hover:scale-150 transition" />
              <TiDelete className="text-red-500 hover:scale-150 transition" />
            </div>
          )}
        </div>
      );

    case "map":
      return (
        <div className="relative px-4">
          {!isEditing ? (
            <iframe
              src={value}
              className="w-full h-80 rounded-lg "
              allowFullScreen
              loading="lazy"
            ></iframe>
          ) : (
            <div className="w-full h-80 rounded-lg bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Editing mode: Map disabled</p>
            </div>
          )}
          {isEditing && (
            <div className="absolute right-4 top-8 flex gap-4 items-center">
              <CiEdit className="hover:scale-150 transition" />
              <TiDelete className="text-red-500 hover:scale-150 transition" />
            </div>
          )}
        </div>
      );

    case "file":
      return <IoCloudUploadOutline />;

    case "social":
      return (
        <div className="flex items-center gap-5 relative p-2 bg-secondary mx-4 rounded">
          <GoPeople />
          <div className="">{value}</div>
          {isEditing && (
            <div className="absolute right-4 flex gap-4 h-full items-center">
              <CiEdit className="hover:scale-150 transition" />
              <TiDelete className=" text-red-500 hover:scale-150 transition" />
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
};

export default function Droppable({ item }: DroppableProps) {
  const context = useContext(profileEditContext);

  if (!context) {
    throw new Error("profileEditContext is null");
  }

  const { isEditing } = context;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id, disabled: !isEditing });

  const style = {
    transition: transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="touch-none"
    >
      {getItemFrame(item.type, item.value, isEditing)}
    </div>
  );
}
