"use client";
import Draggable from "@/components/DragAndDrop/Draggable";
import AddProfileComponentDrawer from "@/components/Drawer/AddProfileComponentDrawer";
import ProfileEditor from "@/components/ProfileEdit/ProfileEditor";
import { Button } from "@/components/ui/button";
import { profileEditContext } from "@/lib/context";
import { Item, ITEM_TYPE } from "@/lib/type";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";
const itemData = [
  { id: 3, title: "image", value: "/image/profile.jpg", type: ITEM_TYPE.IMAGE },
  { id: 6, title: "text", value: "John Doe", type: ITEM_TYPE.TEXT },
  { id: 7, title: "text", value: "Web Developer", type: ITEM_TYPE.TEXT },
  {
    id: 8,
    title: "text",
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis labore, beatae expedita, odio dolor minus totam doloremque incidunt explicabo omnis asperiores recusandae atque suscipit repellendus, voluptatem in ducimus modi sint!",
    type: ITEM_TYPE.TEXT,
  },
  { id: 1, title: "phone no", value: "58385936", type: ITEM_TYPE.PHONE },
  { id: 2, title: "email", value: "apple@gmail.com", type: ITEM_TYPE.EMAIL },
  { id: 9, title: "link", value: "www.apple@gmail.com", type: ITEM_TYPE.LINK },
  {
    id: 10,
    title: "video",
    value: "https://www.youtube.com/embed/ekr2nIex040?si=ip9BjeIhkp30ejcS",
    type: ITEM_TYPE.VIDEO,
  },
  {
    id: 11,
    title: "map",
    value:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5641.033400395882!2d103.85507134698486!3d1.2862602131934748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19ee4cc09203%3A0x26c9afefa555dd7!2sMarina%20Bay%20Sands%20Singapore!5e0!3m2!1sen!2ssg!4v1732018272377!5m2!1sen!2ssg",
    type: ITEM_TYPE.MAP,
  },
  {
    id: 12,
    title: "soclial",
    value: "apple@gmail.com",
    type: ITEM_TYPE.SOCIAL,
  },
];

const Page = () => {
  // Fetch from database
  const [items, setItems] = useState<Item[]>(itemData);

  // State for editing
  const [isEditing, setEditing] = useState(false);

  // Drag end handling
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((prevItems) => {
        const activeIndex = prevItems.findIndex(
          (item) => item.id === active.id
        );
        const overIndex = prevItems.findIndex((item) => item.id === over?.id);
        // Resort the items
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  // Touch screen support for mobile
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  return (
    <>
      <div className=" flex justify-space-between gap-4 w-full relative">
        {/* Left Section */}

        <div className="mt-10 relative mx-auto w-full max-w-[400px] flex flex-col bg-[#050505] overflow-hidden rounded-lg">
          <Button
            variant={"ghost"}
            size="icon"
            className="absolute top-4 left-4 text-white rounded-lg transition z-10"
            onClick={() => {
              setEditing(!isEditing);
            }}
          >
            {isEditing ? <GiCheckMark /> : <CiEdit />}
          </Button>

          <div>
            <DndContext
              id="dnd-context"
              sensors={sensors}
              onDragEnd={isEditing ? handleDragEnd : undefined}
              collisionDetection={closestCorners}
            >
              <profileEditContext.Provider value={{ isEditing, setEditing }}>
                <Draggable items={items} />
              </profileEditContext.Provider>
            </DndContext>
          </div>
        </div>

        <ProfileEditor />
      </div>

      <AddProfileComponentDrawer />
    </>
  );
};

export default Page;
