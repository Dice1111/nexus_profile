import { Item } from "@/lib/type";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
interface DroppableProps {
  item: Item;
}

const Droppable = ({ item }: DroppableProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      key={item.id}
      style={style}
      className="p-2 bg-white rounded shadow touch-none"
    >
      {item.title}: {item.value}
    </div>
  );
};

export default Droppable;
