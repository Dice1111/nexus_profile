"use client";
import Image from "next/image";
import { Draggable } from "@/components/DragAndDrop/Draggable";
import { Item, ITEM_TYPE } from "@/lib/type";
import { GiCheckMark } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { profileEditContext } from "@/lib/context";

const itemData = [
  { id: 1, title: "phone no", value: "58385936", type: ITEM_TYPE.PHONE },
  { id: 2, title: "email", value: "apple@gmail.com", type: ITEM_TYPE.EMAIL },
  { id: 3, title: "image", value: "Image", type: ITEM_TYPE.IMAGE },
  { id: 4, title: "image", value: "Image", type: ITEM_TYPE.IMAGE },
  { id: 5, title: "image", value: "Image", type: ITEM_TYPE.IMAGE },
];

const profileHeaderData = {
  name: "John Doe",
  title: "Web Developer",
  bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis labore, beatae expedita, odio dolor minus totam doloremque incidunt explicabo omnis asperiores recusandae atque suscipit repellendus, voluptatem in ducimus modi sint!",
  image: "/image/profile.jpg", // Default profile image
};

const Page = () => {
  // Fetch from database
  const [items, setItems] = useState<Item[]>(itemData);
  const [profile, setProfile] = useState(profileHeaderData);

  // State for editing
  const [isEditing, setEditing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  // Drag end handling
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((prevItems) => {
        const activeIndex = prevItems.findIndex(
          (item) => item.id === active.id
        );
        const overIndex = prevItems.findIndex((item) => item.id === over?.id);
        // Resort the items
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  // Touch screen support for mobile
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  // Update profile details
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Confirm editing for the specific field
  const handleConfirmEdit = () => {
    setEditingField(null);
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Generate a temporary URL for the uploaded file
      setProfile((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  return (
    <div className="relative max-w-80 mx-auto flex flex-col bg-[#050505] overflow-hidden rounded-lg">
      {/* Main Edit Button */}
      <Button
        variant={"ghost"}
        size="icon"
        className="absolute top-4 right-4 text-white rounded-lg transition z-10"
        onClick={() => {
          setEditing(!isEditing);
          setEditingField(null); // Reset individual editing field
        }}
      >
        {isEditing ? <GiCheckMark /> : <CiEdit />}
      </Button>
      {/* Profile Image */}
      <div className="relative group">
        <Image
          src={profile.image}
          width={500}
          height={500}
          alt="Picture of the author"
          className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
        {isEditing && (
          <>
            <label
              htmlFor="image-upload"
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Click to change
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </>
        )}
      </div>
      {/* Profile Details */}
      <div className="my-5 px-4 text-center">
        {["name", "title", "bio"].map((field) => (
          <div key={field} className="relative">
            {editingField === field ? (
              <>
                {field !== "bio" ? (
                  <input
                    type="text"
                    name={field}
                    value={profile[field as keyof typeof profile]}
                    onChange={handleInputChange}
                    className="text-2xl text-center w-full font-bold bg-transparent border-b-2 border-gray-300 focus:outline-none"
                  />
                ) : (
                  <textarea
                    name={field}
                    rows={4}
                    value={profile.bio}
                    onChange={handleInputChange}
                    className="text-xs text-center w-full mt-4 bg-transparent border-b-2 border-gray-300 focus:outline-none"
                  />
                )}
                <GiCheckMark
                  className="absolute top-0 right-4 text-green-500 cursor-pointer hover:scale-150 transition"
                  onClick={handleConfirmEdit}
                />
              </>
            ) : (
              <>
                <p
                  className={
                    field === "name"
                      ? "text-2xl font-bold"
                      : field === "title"
                      ? "italic text-xs"
                      : "text-xs mt-4"
                  }
                >
                  {profile[field as keyof typeof profile]}
                </p>
                {isEditing && (
                  <CiEdit
                    className="absolute top-0 right-4 text-secondary cursor-pointer hover:scale-150 transition"
                    onClick={() => setEditingField(field)}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
      {/* Draggable Items */}
      <div>
        <DndContext
          id="dnd-context"
          sensors={sensors}
          onDragEnd={isEditing ? handleDragEnd : undefined}
          collisionDetection={closestCorners}
        >
          <profileEditContext.Provider value={{ isEditing, setEditing }}>
            <Draggable items={items} />
          </profileEditContext.Provider>
        </DndContext>
      </div>
    </div>
  );
};

export default Page;
