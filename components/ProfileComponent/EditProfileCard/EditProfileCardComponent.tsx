"use client";

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

import { Button } from "@/components/ui/button";
import { PROFILE_COMPONENT_TYPE } from "@/types/enums";
import { useEffect, useState } from "react";
import {
  ProfileDndComponentSchemaType,
  profileDndInputSchema,
} from "./DragAndDropComponent/ProfileDndInputSchema";
import ProfileDroppable from "./DragAndDropComponent/ProfileDroppable";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { genUploader } from "uploadthing/client";
export const { uploadFiles } = genUploader<OurFileRouter>();

const EditProfileCardComponent = () => {
  const context = useProfileContext();

  const { components, profileData, setComponents, isEditing, setEditing } =
    context;

  // Touchscreen and pointer support for drag-and-drop
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  // Dynamic validation schema
  const [validationSchema, setValidationSchema] = useState(
    z.object({
      components: z.array(profileDndInputSchema),
    })
  );
  const layoutComponent =
    profileLayoutData(profileData)[
      profileData.layout as keyof typeof profileLayoutData
    ];

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    components: ProfileDndComponentSchemaType[];
  }>({
    mode: "onChange",

    resolver: zodResolver(validationSchema),
    defaultValues: {
      components: components as ProfileDndComponentSchemaType[],
    },
  });

  // Update schema and reset form when components change
  useEffect(() => {
    setValidationSchema(
      z.object({
        components: z.array(profileDndInputSchema),
      })
    );
    reset({ components: components as ProfileDndComponentSchemaType[] });
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
  const onSubmit = async (data: {
    components: ProfileDndComponentSchemaType[];
  }) => {
    //
    // Add logic to save data to the database
    const updatedComponents = await Promise.all(
      data.components.map(async (component) => {
        if (component.type === PROFILE_COMPONENT_TYPE.IMAGE) {
          const blob = await fetch(component.value).then((r) => r.blob());
          const file = new File([blob], "uploaded-image.png", {
            type: blob.type,
          });
          const response = await uploadFiles("imageUploader", {
            files: [file],
          });

          const url = response[0]?.ufsUrl;

          return {
            ...component,
            value: url ?? component.value, // fallback in case of failure
          };
        }

        setComponents(components);

        return component;
      })
    );

    //Upload to Uploadthing

    console.log("Submitted Data:", data);
    reset();
    setEditing(false);
  };

  return (
    <div
      className={`relative max-w-[400px] md:w-[400px]  flex flex-col  overflow-hidden rounded-lg`}
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
