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
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { PROFILE_COMPONENT_TYPE } from "@/lib/types/enums";
import { ProfileDndComponentSchemaType } from "./DragAndDropComponent/ProfileDndInputSchema";
import ProfileDroppable from "./DragAndDropComponent/ProfileDroppable";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { genUploader } from "uploadthing/client";
import { ProfileDndComponent } from "@/lib/types/types";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useEffect } from "react";
import { ProfileComponentModel } from "@/core/_domain/models/profile-component.model";
export const { uploadFiles } = genUploader<OurFileRouter>();

const EditProfileCardComponent = () => {
  const context = useProfileContext();
  const {
    components,
    information,
    design,
    setComponents,
    isEditing,
    setEditing,
    isLoading,
    setLoading,
    form,
    fieldArray,
  } = context;

  // Touchscreen and pointer support for drag-and-drop
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const layoutComponent = profileLayoutData(design, information)[
    design.layout as keyof typeof profileLayoutData
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    reset,
    watch,
    setValue,
    getValues,
  } = form;

  const { fields, move, remove } = fieldArray;

  // Handle delete
  const handleDeleteItem = (id: string) => {
    // Find the index in the form fields
    const fieldIndex = fields.findIndex((field) => field.id === id);
    if (fieldIndex !== -1) {
      // Remove from form fields
      remove(fieldIndex);
    }
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((field) => field.id === active.id);
    const newIndex = fields.findIndex((field) => field.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    //Reorder the field array
    move(oldIndex, newIndex);

    //Wait for RHF to apply reorder, then update `position`
    setTimeout(() => {
      const liveComponents = getValues("components");

      //Defensive check: ensure correct length
      if (!liveComponents || liveComponents.length === 0) return;

      //Update position values to match visual order
      liveComponents.forEach((_, index) => {
        setValue(`components.${index}.position`, index, { shouldDirty: true });
      });

      console.log("Reordered Components:", liveComponents);
    }, 0);
  };

  // Handle form submission
  const onSubmit = async (data: {
    components: ProfileDndComponentSchemaType[];
  }) => {
    if (isDirty) {
      console.log("is dirty");

      setLoading(true);
      const dirtyComponents = data.components?.filter((_, i) => {
        const dirtyFieldObj = dirtyFields.components?.[i];
        if (!dirtyFieldObj) return false; // no dirty fields at all
        // Check if any property inside dirtyFieldObj is true
        return Object.values(dirtyFieldObj).some(Boolean);
      });

      console.log("Dirty Component Values:", dirtyComponents);

      const updatedComponents = await Promise.all(
        dirtyComponents.map(async (component, index) => {
          // Only handle image components with a new file
          if (
            component.type === PROFILE_COMPONENT_TYPE.IMAGE &&
            component.file instanceof File
          ) {
            try {
              //GET old image url from main components state
              const oldUrl = components.find(
                (c) => c.id === component.id
              )?.value;

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

      console.log("updatedComponents:", updatedComponents);
      console.log("finalComponents:", getValues("components"));

      // need to update data.components with updatedComponents
      const finalComponents = data.components.map((originalComponent) => {
        const updated = updatedComponents.find(
          (comp) => comp.id === originalComponent.id
        );
        return updated ?? originalComponent;
      });

      setComponents(data.components as ProfileDndComponent[]);
    } else {
      console.log("is not dirty");
    }

    setLoading(false);
    setEditing(false);
  };

  useEffect(() => {
    reset({ components: components as ProfileDndComponentSchemaType[] });
  }, [components, reset]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div
          className={`relative max-w-[400px] md:w-[400px]  flex flex-col  overflow-hidden rounded-lg`}
          style={{
            backgroundColor: design.backgroundColor,
            color: design.foregroundColor,
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
                items={fields.map((field) => field.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-3 pb-4 w-full">
                  {fields.map((item, index) => (
                    <ProfileDroppable
                      key={item.id}
                      item={item as ProfileComponentModel}
                      index={index}
                      formRegister={register}
                      formErrors={errors.components?.[index]?.value?.message}
                      handleDeleteItem={handleDeleteItem}
                      setValue={setValue}
                      watch={watch}
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
