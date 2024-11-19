import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Item } from "@/lib/type";
import Droppable from "./Droppable";

// Interface for items (replace with Prisma model as needed)

interface ItemProps {
  items: Item[];
}

export default function Draggable({ items }: ItemProps) {
  return (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      <div className="flex flex-col gap-3 pb-4 text-primary w-full">
        {items.map((item) => (
          <Droppable key={item.id} item={item} />
        ))}
      </div>
    </SortableContext>
  );
}
