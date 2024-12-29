"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProfileContext } from "@/context/profileContext";
import { typeIconMap } from "@/lib/icon";
import { InputPlaceholder } from "@/lib/input_placeholder";
import { PROFILE_COMPONENT_CATEGORY, ProfileDndComponent } from "@/lib/type";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { RxCross1, RxDragHandleHorizontal } from "react-icons/rx";

interface DroppableProps<T extends FieldValues> {
  item: ProfileDndComponent;
  index: number;
  formRegister: UseFormRegister<T>;
  formErrors?: string;
}

// Utility function to handle deletion of an item
const handleDelete = (
  id: string,
  components: ProfileDndComponent[],
  setComponents: Dispatch<SetStateAction<ProfileDndComponent[]>>
) => {
  const updatedComponents = components.filter(
    (component) => component.id !== id
  );
  setComponents(updatedComponents);
};

// Reusable component for header with drag handle and delete button
const DndComponentHeader = ({
  item,
  components,
  setComponents,
  attributes,
  listeners,
}: {
  item: ProfileDndComponent;
  components: ProfileDndComponent[];
  setComponents: Dispatch<SetStateAction<ProfileDndComponent[]>>;
  attributes: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}) => (
  <div className="flex justify-between w-full items-center">
    <div
      className="flex gap-2 items-center cursor-move"
      {...attributes}
      {...listeners}
      style={{ touchAction: "none" }}
    >
      <RxDragHandleHorizontal size={30} />
      <h1 className="text-lg font-bold">{item.type}</h1>
    </div>
    <RxCross1
      onClick={() => handleDelete(item.id, components, setComponents)}
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
  components,
  setComponents,
}: {
  type: string;
  index: number;

  inputType: keyof T;
  formRegister: UseFormRegister<T>;
  formErrors?: string;
  components: ProfileDndComponent[];
  setComponents: Dispatch<SetStateAction<ProfileDndComponent[]>>;
}) => (
  <>
    <div className="flex px-2 w-full max-w-sm items-center gap-1.5 bg-transparent rounded">
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
          `components.${index}.${String(inputType)}` as Path<T>,
          {
            onChange: (e) => {
              const newValue = e.target.value;
              components[index] = {
                ...components[index],
                ...(inputType === "value"
                  ? { value: newValue }
                  : { display_text: newValue }),
              };
              setComponents([...components]);
            },
          }
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
}: {
  item: ProfileDndComponent;
  index: number;
  attributes: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  formRegister: UseFormRegister<T>;
  formErrors?: string;
}) => {
  const context = useProfileContext();

  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  const { components, setComponents } = context;

  switch (item.category) {
    case PROFILE_COMPONENT_CATEGORY.TEXT:
      return (
        <div className="flex flex-col gap-4 w-full max-w-sm rounded-lg bg-secondary text-secondary-foreground shadow-lg p-4">
          <DndComponentHeader
            item={item}
            components={components}
            setComponents={setComponents}
            attributes={attributes}
            listeners={listeners}
          />
          <Textarea
            className={`bg-transparent border ${
              formErrors ? "border-red-500" : "border-primary"
            }`}
            placeholder="Type your message here."
            {...formRegister(`components.${index}.value` as Path<T>, {
              onChange: (e) => {
                const newValue = e.target.value;
                components[index] = {
                  ...components[index],
                  value: newValue,
                };
                setComponents([...components]);
              },
            })}
          />
          {formErrors && <p className="text-red-500 text-sm">{formErrors}</p>}
        </div>
      );

    case PROFILE_COMPONENT_CATEGORY.IMAGE:
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const previewURL = URL.createObjectURL(file);
          const updatedComponents = components.map((component) =>
            component.id === item.id
              ? { ...component, value: previewURL }
              : component
          );
          setComponents(updatedComponents);
        }
      };
      return (
        <div className="flex flex-col items-center gap-4 w-full max-w-sm rounded-lg bg-secondary text-secondary-foreground shadow-lg p-4">
          <DndComponentHeader
            item={item}
            components={components}
            setComponents={setComponents}
            attributes={attributes}
            listeners={listeners}
          />
          <div>
            {item.value ? (
              <Image
                src={item.value}
                alt={item.display_text || "Uploaded Image"}
                width={300}
                height={300}
                className="rounded-lg w-full h-full object-cover shadow-md"
              />
            ) : (
              <div className="w-[300px] h-[300px] flex items-center justify-center border border-dashed rounded-lg text-sm">
                No image uploaded
              </div>
            )}
            <label
              htmlFor={`upload-${item.id}`}
              className="block bg-primary text-primary-foreground py-2 px-4 mt-2 text-center   rounded-lg cursor-pointer hover:bg-primary/90"
            >
              Upload Image
            </label>
            <Input
              id={`upload-${item.id}`}
              className="hidden "
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      );

    default:
      return (
        <div className="flex flex-col gap-2 bg-secondary text-secondary-foreground p-4 rounded">
          <DndComponentHeader
            item={item}
            components={components}
            setComponents={setComponents}
            attributes={attributes}
            listeners={listeners}
          />
          <DndInputField
            type={item.type}
            index={index}
            inputType="value"
            formRegister={formRegister}
            formErrors={formErrors}
            components={components}
            setComponents={setComponents}
          />

          <DndInputField
            type="text"
            index={index}
            inputType="display_text"
            formRegister={formRegister}
            formErrors={formErrors}
            components={components}
            setComponents={setComponents}
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
      />
    </div>
  );
}
