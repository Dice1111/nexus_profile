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
import { PROFILE_COMPONENT_TYPE } from "@/lib/types/enums";
import { useEffect, useState } from "react";
import {
  ProfileDndComponentSchemaType,
  profileDndInputSchema,
} from "./DragAndDropComponent/ProfileDndInputSchema";
import ProfileDroppable from "./DragAndDropComponent/ProfileDroppable";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { genUploader } from "uploadthing/client";
import { ProfileDndComponent } from "@/lib/types/types";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
export const { uploadFiles } = genUploader<OurFileRouter>();

const EditProfileCardComponent = () => {
  const context = useProfileContext();
  const {
    components,
    profileData,
    setComponents,
    isEditing,
    setEditing,
    isLoading,
    setLoading,
  } = context;

  // Touchscreen and pointer support for drag-and-drop
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  // zod validation schema
  const validationSchema = z.object({
    components: z.array(profileDndInputSchema),
  });

  const layoutComponent =
    profileLayoutData(profileData)[
      profileData.layout as keyof typeof profileLayoutData
    ];

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<{
    components: ProfileDndComponentSchemaType[];
  }>({
    mode: "onBlur",

    resolver: zodResolver(validationSchema),
    defaultValues: {
      components: components as ProfileDndComponentSchemaType[],
    },
  });

  // useEffect(() => {
  //   setValidationSchema(
  //     z.object({
  //       components: z.array(profileDndInputSchema),
  //     })
  //   );
  // }, []);

  // Update schema and reset form when components change
  useEffect(() => {
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
    if (isDirty) {
      console.log("is dirty");
    } else {
      console.log("is not dirty");
    }
    setLoading(true);

    const apple = [1, 2, 3, 4];

    console.log(apple);

    console.log(data);

    const updatedComponents = await Promise.all(
      data.components.map(async (component) => {
        // Only handle image components with a new file
        if (
          component.type === PROFILE_COMPONENT_TYPE.IMAGE &&
          component.file instanceof File
        ) {
          try {
            //GET old image url
            const oldUrl = components.find((c) => c.id === component.id)?.value;

            // Upload new image
            const response = await uploadFiles("imageUploader", {
              files: [component.file],
            });

            // Delete previous image from UploadThing (if applicable)

            if (oldUrl) {
              console.log("deleting....");
              const deleteRes = await fetch("/api/uploadthing", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: oldUrl }),
              });

              if (deleteRes.ok) {
                console.log(`Deleted old image: ${deleteRes.statusText}`);
              } else {
                console.warn(`Failed to delete old image: ${oldUrl}`);
              }
            }

            // Build new image URL
            const uploadedUrl = response[0]?.key
              ? `https://${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}.ufs.sh/f/${response[0].key}`
              : component.value;

            return {
              ...component,
              value: uploadedUrl,
            };
          } catch (error) {
            console.error("UploadThing error:", error);
            return component;
          }
        }

        // Return unmodified component if not an image or no new file
        return component;
      })
    );

    setComponents(updatedComponents as ProfileDndComponent[]);
    reset();
    setLoading(false);
    setEditing(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
          <form id="profileForm" onSubmit={handleSubmit(onSubmit)}>
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
      )}
    </>
  );
};

export default EditProfileCardComponent;
