import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";
import Droppable from "../DragAndDrop/Droppable";
import TemplateOne from "../ProfileSvgComponent/TemplateOne";
import { Button } from "../ui/button";
import { useProfileContext } from "@/context/profileContext";
import Image from "next/image";
const ProfileCardComponent = () => {
  const context = useProfileContext();
  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  const {
    components,
    setComponents,
    profileData,
    setProfileData,
    themeSchemaData,
    setThemeSchemaData,
    isEditing,
    setEditing,
  } = context;

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

  console.log(themeSchemaData.logoWrapper);

  // Touch screen support for mobile
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  return (
    <div className="mt-10 relative mx-auto w-full max-w-[400px] flex flex-col bg-[#050505] text-primary-foreground overflow-hidden rounded-lg">
      <Button
        variant={"ghost"}
        size="icon"
        className="absolute top-4 left-4 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition z-10"
        onClick={() => {
          setEditing(!isEditing);
        }}
      >
        {isEditing ? <GiCheckMark /> : <CiEdit />}
      </Button>

      {/* header area */}

      <div className={themeSchemaData.imageWrapper.trim()}>
        {/* Profile Picture */}
        <Image
          src={profileData.image}
          alt="Profile Picture"
          width={1000}
          height={1000}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 w-full ">
          <TemplateOne />
        </div>
      </div>

      {/* Profile Data */}
      <div className=" relative px-7 py-10">
        {/* Logo */}
        {/* absolute bg-red-500 -top-10 right-2 w-[80px] h-[80px] rounded-full overflow-hidden shadow-lg */}
        <div className={themeSchemaData.logoWrapper.trim()}>
          <Image
            src={profileData.logo_icon}
            alt="Logo Icon"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className={themeSchemaData.name.trim()}>
          {profileData.prefix} {profileData.first_name}{" "}
          {profileData.middle_name} {profileData.last_name} {profileData.suffix}
        </h2>
        <p className={themeSchemaData.title.trim()}>{profileData.title}</p>
        <p className={themeSchemaData.occupation.trim()}>
          {profileData.occupation}
        </p>

        <p className={themeSchemaData.company.trim()}>{profileData.company}</p>
        <p className={themeSchemaData.quote.trim()}>{profileData.quote}</p>

        <p className={themeSchemaData.preferredName.trim()}>
          Goes by - {profileData.preferred_name.trim()} <br />
          {profileData.pronouns}
        </p>
        <p className={themeSchemaData.message.trim()}>{profileData.message}</p>
      </div>

      {/* dnd area */}

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
          <div className="flex flex-col gap-3 pb-4  w-full">
            {components.map((item) => (
              <Droppable key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ProfileCardComponent;
