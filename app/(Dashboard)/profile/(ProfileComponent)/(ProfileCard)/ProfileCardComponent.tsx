import ProfileDroppable from "@/components/DragAndDrop/ProfileDroppable";
import { Button } from "@/components/ui/button";
import { useProfileContext } from "@/context/profileContext";
import {
  DragEndEvent,
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  DndContext,
  closestCorners,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CiEdit } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";

const ProfileCardComponent = () => {
  const context = useProfileContext();
  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  const {
    components,
    setComponents,
    profileData,
    setProfileData,
    layoutData,
    setLayoutData,
    isEditing,
    setEditing,
  } = context;

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
    <div className="mt-10 relative mx-auto w-full max-w-[400px] flex flex-col bg-[#050505] text-primary-foreground overflow-hidden rounded-lg">
      <Button
        variant={"ghost"}
        size="icon"
        className="absolute top-4 left-4 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition z-10"
        onClick={() => {
          setEditing(!isEditing);
        }}
      >
        {isEditing ? <GiCheckMark /> : <CiEdit />}
      </Button>

      {/* header area */}
      {layoutData}

      {/* dnd area */}

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
    </div>
  );
};

export default ProfileCardComponent;
