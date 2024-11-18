"use client";

import { Draggable } from "@/components/DragAndDrop/Draggable";
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

const Page = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, title: "phone no", value: "58385936", type: ITEM_TYPE.PHONE },
    {
      id: 2,
      title: "email",
      value: "apple@gmail.com",
      type: ITEM_TYPE.EMAIL,
    },
    { id: 3, title: "image", value: "Image", type: ITEM_TYPE.IMAGE },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((prevItems) => {
        const activeIndex = prevItems.findIndex(
          (item) => item.id === active.id
        );
        const overIndex = prevItems.findIndex((item) => item.id === over?.id);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  return (
    <div className="bg-gray-200">
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <Draggable items={items} />
      </DndContext>
    </div>
  );
};

export default Page;
