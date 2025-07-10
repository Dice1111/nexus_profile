"use client";
import { Button } from "@/components/ui/button";
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
import { OurFileRouter } from "@/app/api/uploadthing/core";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { PROFILE_COMPONENT_TYPE } from "@/core/_domain/enum/profile-component-repository.enum";
import { FetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";
import { useDesignState } from "@/state_management/design.state";
import { useProfileComponentsState } from "@/state_management/profile-component.state";
import { useProfilePageState } from "@/state_management/profile-loading.state";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { genUploader } from "uploadthing/client";
import { z } from "zod";
import TestComp from "../ProfileCard/TestComp";
import ProfileHeaderLayout from "../ProfileHeaderLayout/ProfileHeaderLayout";
import {
  ProfileDndComponentSchemaType,
  profileDndInputSchema,
} from "./DragAndDropComponent/ProfileDndInputSchema";
import ProfileDroppable from "./DragAndDropComponent/ProfileDroppable";
export const { uploadFiles } = genUploader<OurFileRouter>();
const EditProfileCardComponent = () => {
  //STATE MANAGEMENT

  const isLoading = useProfilePageState((state) => state.isLoading);
  const isEditing = useProfilePageState((state) => state.isEditing);

  const setLoading = useProfilePageState((state) => state.setLoading);
  const setEditing = useProfilePageState((state) => state.setEditing);

  const backgroundColor = useDesignState((state) => state.backgroundColor);
  const foregroundColor = useDesignState((state) => state.foregroundColor);
  const layout = useDesignState((state) => state.layout);
  const profileComponents = useProfileComponentsState(
    (state) => state.profileComponents
  );

  const setForm = useProfileComponentsState((state) => state.setForm);
  const setFieldArray = useProfileComponentsState(
    (state) => state.setFieldArray
  );
  const setProfileComponents = useProfileComponentsState(
    (state) => state.setProfileComponents
  );

  // Touchscreen and pointer support for drag-and-drop
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  //Form setup
  const form = useForm<{ profileComponents: ProfileDndComponentSchemaType[] }>({
    mode: "onBlur",
    resolver: zodResolver(
      z.object({
        profileComponents: z.array(profileDndInputSchema),
      })
    ),
    defaultValues: {
      profileComponents: profileComponents as ProfileDndComponentSchemaType[],
    },
  });
  const fieldArray = useFieldArray({
    control: form.control,
    name: "profileComponents",
  });

  useEffect(() => {
    setForm(form);
    setFieldArray(fieldArray);
  }, [form, fieldArray, setForm, setFieldArray]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
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
      const liveComponents = getValues("profileComponents");

      //Defensive check: ensure correct length
      if (!liveComponents || liveComponents.length === 0) return;

      //Update position values to match visual order
      liveComponents.forEach((_, index) => {
        setValue(`profileComponents.${index}.position`, index, {
          shouldDirty: true,
        });
      });

      console.log("Reordered Components:", liveComponents);
    }, 0);
  };

  // Handle form submission
  const onSubmit = async (data: {
    profileComponents: ProfileDndComponentSchemaType[];
  }) => {
    if (isDirty) {
      console.log("is dirty");

      setLoading(true);
      const dirtyComponents = data.profileComponents?.filter((_, i) => {
        const dirtyFieldObj = dirtyFields.profileComponents?.[i];
        if (!dirtyFieldObj) return false; // no dirty fields at all
        // Check if any property inside dirtyFieldObj is true
        return Object.values(dirtyFieldObj).some(Boolean);
      });

      console.log("Dirty Component Values:", dirtyComponents);

      const updatedComponents = await Promise.all(
        dirtyComponents.map(async (profileComponent, index) => {
          // Only handle image components with a new file
          if (
            profileComponent.type === PROFILE_COMPONENT_TYPE.IMAGE &&
            profileComponent.file instanceof File
          ) {
            try {
              //GET old image url from main components state
              const oldUrl = profileComponents.find(
                (c) => c.id === profileComponent.id
              )?.value;

              // Upload new image
              const response = await uploadFiles("imageUploader", {
                files: [profileComponent.file],
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
                : profileComponent.value;

              return {
                ...profileComponent,
                value: uploadedUrl,
              };
            } catch (error) {
              console.error("UploadThing error:", error);
              return profileComponent;
            }
          }
          // Return unmodified component if not an image or no new file
          return profileComponent;
        })
      );

      console.log("updatedComponents:", updatedComponents);
      console.log("finalComponents:", getValues("profileComponents"));

      // need to update data.components with updatedComponents
      const finalComponents = data.profileComponents.map(
        (originalComponent) => {
          const updated = updatedComponents.find(
            (comp) => comp.id === originalComponent.id
          );
          return updated ?? originalComponent;
        }
      );

      setProfileComponents(
        data.profileComponents as FetchProfileComponentData[]
      );
    } else {
      console.log("is not dirty");
    }

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
            backgroundColor: backgroundColor,
            color: foregroundColor,
          }}
        >
          {/* Header area */}
          <ProfileHeaderLayout layout={layout} />

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
                      item={item as FetchProfileComponentData}
                      index={index}
                      formRegister={register}
                      formErrors={
                        errors.profileComponents?.[index]?.value?.message
                      }
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

      <TestComp />
    </>
  );
};

export default EditProfileCardComponent;
