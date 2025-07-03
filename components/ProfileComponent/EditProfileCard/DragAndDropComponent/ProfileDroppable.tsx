"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PROFILE_COMPONENT_CATEGORY } from "@/core/_domain/enum/profile-component-repository.enum";
import { FetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";
import { typeIconMap } from "@/lib/icon";
import { InputPlaceholder } from "@/lib/input_placeholder";

import { UploadButton } from "@/util/uploadthing";

import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Image from "next/image";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { RxCross1, RxDragHandleHorizontal } from "react-icons/rx";

interface DroppableProps<T extends FieldValues> {
  item: FetchProfileComponentData;
  index: number;
  formRegister: UseFormRegister<T>;
  formErrors?: string;
  handleDeleteItem: (id: string) => void;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
}

// Reusable component for header with drag handle and delete button
const DndComponentHeader = ({
  item,
  attributes,
  listeners,
  handleDeleteItem,
}: {
  item: FetchProfileComponentData;
  attributes: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  handleDeleteItem: (id: string) => void;
}) => (
  <div className="flex justify-between w-full items-center">
    <div
      className="flex gap-2 items-center cursor-move"
      {...attributes}
      {...listeners}
      style={{ touchAction: "none" }}
    >
      <RxDragHandleHorizontal size={30} />
      <h1 className="text-lg font-bold capitalize">{item.type}</h1>
    </div>
    <RxCross1
      onClick={() => handleDeleteItem(item.id)}
      className="hover:scale-110 transition cursor-pointer"
    />
  </div>
);

// Reusable component for input fields
const DndInputField = <T extends FieldValues>({
  type,
  index,
  inputType,
  formRegister,
  formErrors,
}: {
  type: string;
  index: number;

  inputType: keyof T;
  formRegister: UseFormRegister<T>;
  formErrors?: string;
}) => (
  <>
    <div className="flex px-2 w-full max-w-sm items-center gap-3 bg-transparent rounded">
      <div>{typeIconMap[type as keyof typeof typeIconMap]}</div>

      <Input
        className={`bg-transparent border border-primary focus:border-2 transition-colors ${
          inputType === "value" && formErrors
            ? "border-red-500"
            : "border-primary"
        }`}
        type={type}
        placeholder={InputPlaceholder[type as keyof typeof InputPlaceholder]}
        {...formRegister(
          `profileComponents.${index}.${String(inputType)}` as Path<T>
        )}
      />
    </div>
    {inputType === "value" && formErrors && (
      <p className="text-red-500 text-sm pl-8">{formErrors}</p>
    )}
  </>
);

// Main profile component renderer
const DndInputFieldBuilder = <T extends FieldValues>({
  item,
  index,
  attributes,
  listeners,
  formRegister,
  formErrors,
  handleDeleteItem,
  setValue,
  watch,
}: {
  item: FetchProfileComponentData;
  index: number;
  attributes: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  formRegister: UseFormRegister<T>;
  formErrors?: string;
  handleDeleteItem: (id: string) => void;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
}) => {
  switch (item.category) {
    case PROFILE_COMPONENT_CATEGORY.TEXT:
      return (
        <div className="flex flex-col gap-4 w-full max-w-sm rounded-lg bg-secondary text-secondary-foreground shadow-lg p-4">
          <DndComponentHeader
            item={item}
            attributes={attributes}
            listeners={listeners}
            handleDeleteItem={handleDeleteItem}
          />
          <Textarea
            className={`bg-transparent border ${
              formErrors ? "border-red-500" : "border-primary"
            }`}
            placeholder="Type your message here."
            {...formRegister(`profileComponents.${index}.value` as Path<T>)}
          />
          {formErrors && <p className="text-red-500 text-sm">{formErrors}</p>}
        </div>
      );

    case PROFILE_COMPONENT_CATEGORY.IMAGE:
      const imageValue = watch(`profileComponents.${index}.value` as Path<T>);
      return (
        <div className="flex flex-col items-center gap-4 w-full max-w-sm rounded-lg bg-secondary text-secondary-foreground shadow-lg p-4">
          <DndComponentHeader
            item={item}
            attributes={attributes}
            listeners={listeners}
            handleDeleteItem={handleDeleteItem}
          />

          <div className="flex flex-col items-center gap-4">
            {imageValue ? (
              <Image
                src={imageValue}
                alt={item.label || "Uploaded Image"}
                width={300}
                height={300}
                className="rounded-lg w-full h-full object-cover shadow-md"
              />
            ) : (
              <div className="w-[300px] h-[300px] flex items-center justify-center border border-dashed rounded-lg text-sm">
                No image uploaded
              </div>
            )}

            {formErrors && (
              <p className="text-red-500 text-sm pl-8 text-center">
                {formErrors}
              </p>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id={`file-upload-${item.id}`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const MAX_MB = 2;
                if (file.size > MAX_MB * 1024 * 1024) {
                  e.target.value = "";
                  alert(`File must be under ${MAX_MB}MB`);
                  return;
                }

                // Update form value directly
                setValue(
                  `profileComponents.${index}.value` as Path<T>,
                  URL.createObjectURL(file) as PathValue<T, Path<T>>,
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  }
                );

                // Also set the actual file in the 'file' property
                setValue(
                  `profileComponents.${index}.file` as Path<T>,
                  file as PathValue<T, Path<T>>,
                  {
                    shouldValidate: false, // Usually no need to validate the file object itself here
                    shouldDirty: true,
                  }
                );
              }}
            />

            <label
              htmlFor={`file-upload-${item.id}`}
              className="cursor-pointer bg-background text-foreground px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
            >
              Choose
            </label>
          </div>
        </div>
      );

    case PROFILE_COMPONENT_CATEGORY.FILE:
      return (
        <div className="flex flex-col items-center gap-4 w-full max-w-sm rounded-lg bg-secondary text-secondary-foreground shadow-lg p-4">
          <DndComponentHeader
            item={item}
            attributes={attributes}
            listeners={listeners}
            handleDeleteItem={handleDeleteItem}
          />

          {item.value ? (
            <a
              href={item.value}
              download
              className="text-blue-500 underline mt-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.value.slice(0, 30) + (item.value.length > 30 ? "..." : "")}
            </a>
          ) : (
            "No File Uploaded."
          )}

          <UploadButton
            className="bg-primary px-4 py-1 rounded-lg hover:bg-primary/90"
            endpoint="fileUploader"
            appearance={{
              allowedContent: { display: "none" },
              button: {},
            }}
            onClientUploadComplete={(res) => {
              if (res && res[0]) {
                setValue(
                  `profileComponents.${index}.value` as Path<T>,
                  res[0].ufsUrl as PathValue<T, Path<T>>,
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  }
                );
                alert("Upload Completed");
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />

          {formErrors && <p className="text-red-500 text-sm">{formErrors}</p>}

          <DndInputField
            type="INFO"
            index={index}
            inputType="display_text"
            formRegister={formRegister}
            formErrors={formErrors}
          />
        </div>
      );

    default:
      return (
        <div className="flex flex-col gap-2 bg-secondary text-secondary-foreground p-4 rounded">
          <DndComponentHeader
            item={item}
            attributes={attributes}
            listeners={listeners}
            handleDeleteItem={handleDeleteItem}
          />
          <DndInputField
            type={item.type}
            index={index}
            inputType="value"
            formRegister={formRegister}
            formErrors={formErrors}
          />

          <DndInputField
            type="INFO"
            index={index}
            inputType="label"
            formRegister={formRegister}
            formErrors={formErrors}
          />
        </div>
      );
  }
};

// Main ProfileDroppable Component
export default function ProfileDroppable<T extends FieldValues>({
  item,
  index,
  formRegister,
  formErrors,
  handleDeleteItem,
  setValue,
  watch,
}: DroppableProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="px-4">
      <DndInputFieldBuilder
        item={item}
        index={index}
        attributes={attributes}
        listeners={listeners}
        formRegister={formRegister}
        formErrors={formErrors}
        handleDeleteItem={handleDeleteItem}
        setValue={setValue}
        watch={watch}
      />
    </div>
  );
}
