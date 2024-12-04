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
import { z } from "zod";
import { ProfileDndComponent } from "@/lib/type";
import { profileDndInputSchema } from "./DragAndDropComponent/ProfileDndInputSchema";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ProfileDroppable from "./DragAndDropComponent/ProfileDroppable";

const EditProfileCardComponent = () => {
  const context = useProfileContext();

  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  const { components, profileData, setComponents, isEditing, setEditing } =
    context;

  const layoutComponent =
    profileLayoutData(profileData)[
      profileData.layout as keyof typeof profileLayoutData
    ];

  // Touchscreen and pointer support for drag-and-drop
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  // Dynamic validation schema
  const [validationSchema, setValidationSchema] = useState(
    z.object({
      components: z.array(profileDndInputSchema),
    })
  );

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    components: ProfileDndComponent[];
  }>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
    defaultValues: { components },
  });

  // Update schema and reset form when components change
  useEffect(() => {
    setValidationSchema(
      z.object({
        components: z.array(profileDndInputSchema),
      })
    );
    reset({ components });
  }, [components, reset]);

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setComponents((prevItems) => {
        const activeIndex = prevItems.findIndex(
          (item) => item.id === active.id
        );
        const overIndex = prevItems.findIndex((item) => item.id === over?.id);
        return arrayMove(prevItems, activeIndex, overIndex);
      });
    }
  };

  // Handle form submission
  const onSubmit = (data: { components: ProfileDndComponent[] }) => {
    console.log("Submitted Data:", data);
    setComponents(data.components);
    // Add logic to save data to the database
    reset();
    setEditing(false);
  };

  return (
    <div
      className={`relative w-[400px]  flex flex-col  overflow-hidden rounded-lg`}
      style={{
        backgroundColor: profileData.background_color,
        color: profileData.foreground_color,
      }}
    >
      {/* Header area */}
      {layoutComponent}

      {/* Drag-and-drop area */}
      <form
        id="profileForm"
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
      >
        <DndContext
          sensors={sensors}
          onDragEnd={isEditing ? handleDragEnd : undefined}
          collisionDetection={closestCorners}
        >
          <SortableContext
            items={components}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-3 pb-4 w-full">
              {components.map((item, index) => (
                <ProfileDroppable
                  key={item.id}
                  item={item}
                  index={index}
                  formRegister={register}
                  formErrors={errors.components?.[index]?.value?.message}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <Button type="submit" className="bg-red-500 mx-4 mb-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditProfileCardComponent;
