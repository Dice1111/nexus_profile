import { Input } from "@/components/ui/input";
import { useProfileContext } from "@/context/profileContext";
import { typeIconMap } from "@/lib/icon";
import { PROFILE_COMPONENT_CATEGORY, ProfileComponent } from "@/lib/type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { RxCross1, RxDragHandleHorizontal } from "react-icons/rx";
import { Dispatch, SetStateAction, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { profileComponentSchema } from "./zodDndInputSchema";

interface DroppableProps {
  item: ProfileComponent;
}

// Utility function to handle deletion of an item
const handleDelete = (
  id: string,
  components: ProfileComponent[],
  setComponents: Dispatch<SetStateAction<ProfileComponent[]>>
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
  item: ProfileComponent;
  components: ProfileComponent[];
  setComponents: Dispatch<SetStateAction<ProfileComponent[]>>;
  attributes: any;
  listeners: any;
}) => (
  <div className="flex justify-between w-full items-center">
    <div
      className="flex gap-2 items-center cursor-move"
      {...attributes}
      {...listeners}
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
const DndInputField = ({
  type,
  placeholder,
  value,
  icontype,
  inputType,
  onValueChange,
}: {
  type: string;
  placeholder: string;
  value?: string;
  icontype: string;
  inputType: string;
  onValueChange: (type: string, value: string) => void;
}) => (
  <div className="flex px-2 w-full max-w-sm items-center gap-1.5 bg-transparent  rounded">
    {typeIconMap[icontype as keyof typeof typeIconMap]}
    <Input
      className="bg-transparent border border-primary focus:border-red-500 focus:border-2 transition-colors"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onValueChange(inputType, e.target.value)}
    />
  </div>
);

// Main profile component renderer
const DndInputFieldBuilder = ({
  item,
  components,
  setComponents,
  attributes,
  listeners,
}: {
  item: ProfileComponent;
  components: ProfileComponent[];
  setComponents: Dispatch<SetStateAction<ProfileComponent[]>>;
  attributes: any;
  listeners: any;
}) => {
  const [error, setError] = useState<string | null>(null);

  const onValueChange = (type: string, value: string) => {
    try {
      const updatedItem = { ...item, [type]: value };

      const updatedComponents = components.map((component) =>
        component.id === item.id ? updatedItem : component
      );

      setComponents(updatedComponents);

      profileComponentSchema.parse(updatedItem);

      setError(null); // Clear error if valid
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message); // Set validation error
      }
    }
  };

  switch (item.category) {
    case PROFILE_COMPONENT_CATEGORY.TEXT:
      return (
        <div className="flex flex-col items-center gap-4 w-full max-w-sm rounded-lg bg-secondary text-secondary-foreground shadow-lg p-4">
          <DndComponentHeader
            item={item}
            components={components}
            setComponents={setComponents}
            attributes={attributes}
            listeners={listeners}
          />
          <Textarea
            className={`bg-transparent border ${
              error ? "border-red-500" : "border-primary"
            }`}
            placeholder="Type your message here."
            value={item.value}
            onChange={(e) => onValueChange("value", e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );

    case PROFILE_COMPONENT_CATEGORY.IMAGE:
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
            {/* Image Preview */}
            {item.value ? (
              <div className="relative group w-[300px] h-[300px]">
                <Image
                  src={item.value}
                  alt={item.display_text || "Uploaded Image"}
                  width={300}
                  height={300}
                  className="rounded-lg w-full h-full object-cover shadow-md"
                />
              </div>
            ) : (
              <div className="w-[300px] h-[300px] flex items-center justify-center border border-dashed border-secondary-foreground rounded-lg text-sm text-secondary-foreground bg-secondary hover:bg-secondary-hover transition-colors">
                No image uploaded
              </div>
            )}

            {/* File Upload Input */}
            <div className="relative mt-4">
              <label
                htmlFor={`upload-${item.id}`}
                className="block cursor-pointer bg-primary text-primary-foreground py-2 px-4 rounded-lg shadow hover:bg-primary-hover transition-colors text-center"
              >
                Upload Image
              </label>
              <Input
                id={`upload-${item.id}`}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const objectUrl = URL.createObjectURL(file); // Generate a temporary URL
                    onValueChange("value", objectUrl);
                  }
                }}
              />
            </div>
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
            placeholder={item.type}
            value={item.value}
            icontype={item.type}
            inputType="value"
            onValueChange={onValueChange}
          />
          {error && <p className="text-red-500 text-sm px-7">{error}</p>}
          <DndInputField
            type="display_text"
            placeholder={item.type}
            value={item.display_text}
            icontype="info"
            inputType="display_text"
            onValueChange={onValueChange}
          />
        </div>
      );
  }
};

// Main ProfileDroppable Component
export default function ProfileDroppable({ item }: DroppableProps) {
  const context = useProfileContext();

  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  const { components, setComponents } = context;

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
        components={components}
        setComponents={setComponents}
        attributes={attributes}
        listeners={listeners}
      />
    </div>
  );
}
