import { useProfileContext } from "@/context/profileContext";
import { profileLayoutData } from "@/lib/profileCardLayoutData/LayoutData";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import ProfileDroppable from "../(DragAndDrop)/ProfileDroppable";

const EditProfileCardComponent = () => {
  function onSubmit() {
    console.log("hello");
  }

  const context = useProfileContext();
  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  const { components, profileData, setComponents, isEditing } = context;

  const layout =
    profileLayoutData[profileData.layout as keyof typeof profileLayoutData];

  // Drag end handling
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setComponents((prevItems) => {
        const activeIndex = prevItems.findIndex(
          (item) => item.id === active.id
        );
        const overIndex = prevItems.findIndex((item) => item.id === over?.id);
        // Resort the items
        return arrayMove(components, activeIndex, overIndex);
      });
    }
  };

  // Touch screen support for mobile
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  return (
    <div className="relative max-w-[400px] flex flex-col bg-[#050505] text-primary-foreground overflow-hidden rounded-lg">
      {/* header area */}
      {layout}

      {/* dnd area */}

      <form
        id="profileForm"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <DndContext
          id="dnd-context"
          sensors={sensors}
          onDragEnd={isEditing ? handleDragEnd : undefined}
          collisionDetection={closestCorners}
        >
          <SortableContext
            items={components}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-3 pb-4  w-full">
              {components.map((item) => (
                <ProfileDroppable key={item.id} item={item} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </form>
    </div>
  );
};

export default EditProfileCardComponent;
