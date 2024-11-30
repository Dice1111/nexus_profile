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

import { z } from "zod";
import { ProfileComponent } from "@/lib/type";
import { profileDndInputSchema } from "../(DragAndDrop)/ProfileDndInputSchema";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const EditProfileCardComponent = () => {
  const context = useProfileContext();
  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  const { components, profileData, setComponents, isEditing } = context;

  const layout =
    profileLayoutData[profileData.layout as keyof typeof profileLayoutData];

  // Touch screen support for mobile
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  // State for schema
  const [validationSchema, setValidationSchema] = useState(
    z.object({
      components: z.array(profileDndInputSchema),
    })
  );

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

  // Update the schema when components change
  useEffect(() => {
    setValidationSchema(
      z.object({
        components: z.array(profileDndInputSchema), // Update if needed dynamically
      })
    );
  }, [components]);

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Reset the form values dynamically
  } = useForm<{
    components: ProfileComponent[];
  }>({
    mode: "onChange",
    resolver: zodResolver(validationSchema), // Use updated schema
    defaultValues: {
      components: components,
    },
  });

  // Reset the form values when components change
  useEffect(() => {
    if (components) {
      reset({ components });
    }
  }, [components, reset]);

  const onSubmit = (data: { components: ProfileComponent[] }) => {
    console.log("hello");
    console.log("Form Submitted:", data);
    reset();
  };

  return (
    <div className="relative max-w-[400px] flex flex-col bg-[#050505] text-primary-foreground overflow-hidden rounded-lg">
      {/* header area */}
      {layout}

      {/* dnd area */}
      <form
        id="profileForm"
        onSubmit={(e) => {
          console.log("Components Array:", components);
          console.log(errors);
          handleSubmit(onSubmit)(e);
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
        <Button type="submit" className="w-full bg-red-500">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditProfileCardComponent;
