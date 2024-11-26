"use client";
import Droppable from "@/components/DragAndDrop/Droppable";
import AddProfileComponentDrawer from "@/components/Drawer/AddProfileComponentDrawer";
import ProfileEditor from "@/components/ProfileEdit/ProfileEditor";
import { Button } from "@/components/ui/button";
import { profileEditContext } from "@/lib/context";
import {
  PROFILE_COMPONENT_CATEGORY,
  PROFILE_COMPONENT_TYPE,
  ProfileComponent,
} from "@/lib/type";

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
import Image from "next/image";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";
import TemplateOne from "@/components/ProfileSvgComponent/TemplateOne";

const itemData = [
  // {
  //   id: 1,
  //   type: PROFILE_COMPONENT_TYPE.IMAGE,
  //   category: PROFILE_COMPONENT_CATEGORY.IMAGE,
  //   value: "/image/profile.jpg",
  // },
  {
    id: 2,
    type: PROFILE_COMPONENT_TYPE.TEXT,
    category: PROFILE_COMPONENT_CATEGORY.TEXT,
    value: "John Doe",
  },
  {
    id: 3,
    type: PROFILE_COMPONENT_TYPE.TEXT,
    category: PROFILE_COMPONENT_CATEGORY.TEXT,
    value: "Web Developer",
  },
  {
    id: 4,
    type: PROFILE_COMPONENT_TYPE.TEXT,
    category: PROFILE_COMPONENT_CATEGORY.TEXT,
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis labore, beatae expedita, odio dolor minus totam doloremque incidunt explicabo omnis asperiores recusandae atque suscipit repellendus, voluptatem in ducimus modi sint!",
  },
  {
    id: 5,
    type: PROFILE_COMPONENT_TYPE.PHONE,
    category: PROFILE_COMPONENT_CATEGORY.PHONE,
    value: "58385936",
  },
  {
    id: 6,
    type: PROFILE_COMPONENT_TYPE.EMAIL,
    category: PROFILE_COMPONENT_CATEGORY.MAIL,
    value: "apple@gmail.com",
  },
  {
    id: 7,
    type: PROFILE_COMPONENT_TYPE.LINK,
    category: PROFILE_COMPONENT_CATEGORY.LINK,
    value: "www.apple@gmail.com",
  },
  {
    id: 8,
    type: PROFILE_COMPONENT_TYPE.VIDEO,
    category: PROFILE_COMPONENT_CATEGORY.VIDEO,
    value: "https://www.youtube.com/embed/ekr2nIex040?si=ip9BjeIhkp30ejcS",
  },
  {
    id: 9,
    type: PROFILE_COMPONENT_TYPE.MAP,
    category: PROFILE_COMPONENT_CATEGORY.MAP,
    value:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5641.033400395882!2d103.85507134698486!3d1.2862602131934748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19ee4cc09203%3A0x26c9afefa555dd7!2sMarina%20Bay%20Sands%20Singapore!5e0!3m2!1sen!2ssg!4v1732018272377!5m2!1sen!2ssg",
  },
  {
    id: 10,
    type: PROFILE_COMPONENT_TYPE.DISCORD,
    category: PROFILE_COMPONENT_CATEGORY.LINK,
    value: "https://discord.com",
  },
];

const profile = {
  id: 1,
  icon_color: "#050505",
  theme_schema: "theme_one",
  wave_type: "wave_one",
  wave_color: "#050505",
  image: "/image/profile.jpg",
  logo_icon: "/image/profile.jpg",
  prefix: "Mr.",
  first_name: "John",
  middle_name: "Arthur",
  last_name: "Doe",
  suffix: "Jr.",
  quote: "Time and Tide wait for no man.",
  preferred_name: "John Doe",
  pronouns: "he/him",
  title: "Dr.",
  occupation: "Web Developer",
  company: "Google",
  message: "Hello world!",
};

const themeSchema = {
  theme_one: {
    imageWrapper: "w-full h-80 relative overflow-hidden",
    logoWrapper:
      "absolute bg-red-500 -top-10 right-2 w-[80px] h-[80px] rounded-full overflow-hidden shadow-lg",
    header: "text-2xl font-semibold",
    subHeader: "text-md font-thin mt-2",
    occupation: "text-md font-thin",
    company: "text-md text-gray-500",
    quote: "text-sm mt-2 font-thin italic text-gray-500",
    preferredName: "text-sm text-end italic text-gray-500",
    message: "text-sm mt-1",
  },
  theme_two: {
    imageWrapper: "w-full h-40 relative overflow-hidden",
    logoWrapper:
      "absolute bg-red-500 -top-10 right-1/2 translate-x-1/2 w-[80px] h-[80px] rounded-full overflow-hidden shadow-lg",
    header: "text-2xl font-semibold",
    subHeader: "text-md font-thin mt-2",
    occupation: "text-md font-thin",
    company: "text-md text-gray-500",
    quote: "text-sm mt-2 font-thin italic text-gray-500",
    preferredName: "text-sm text-end italic text-gray-500",
    message: "text-sm mt-1",
  },
};

const Page = () => {
  // Fetch from database
  const [items, setItems] = useState<ProfileComponent[]>(itemData);
  const [profileData, setProfileData] = useState(profile);

  const currentTheme = profileData.theme_schema;

  const [themeSchemaData, setThemeSchemaData] = useState(
    themeSchema[currentTheme as keyof typeof themeSchema]
  );

  // State for editing
  const [isEditing, setEditing] = useState(false);

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

  return (
    <>
      <div className=" flex justify-space-between gap-4 w-full relative">
        {/* Profile Preview */}

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

          <div className={themeSchemaData.imageWrapper}>
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
            <div
              className={themeSchemaData.logoWrapper}
              style={{ backgroundColor: profileData.icon_color }}
            >
              <Image
                src={profileData.logo_icon}
                alt="Logo Icon"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className={themeSchemaData.header}>
              {profileData.prefix} {profileData.first_name}{" "}
              {profileData.middle_name} {profileData.last_name}{" "}
              {profileData.suffix}
            </h2>
            <p className={themeSchemaData.subHeader}>{profileData.title}</p>
            <p className={themeSchemaData.occupation}>
              {profileData.occupation}
            </p>

            <p className={themeSchemaData.company}>{profileData.company}</p>
            <p className={themeSchemaData.quote}>{profileData.quote}</p>

            <p className={themeSchemaData.preferredName}>
              Goes by - {profileData.preferred_name} <br />
              {profileData.pronouns}
            </p>
            <p className={themeSchemaData.message}>{profileData.message}</p>
          </div>

          {/* dnd area */}

          <DndContext
            id="dnd-context"
            sensors={sensors}
            onDragEnd={isEditing ? handleDragEnd : undefined}
            collisionDetection={closestCorners}
          >
            <profileEditContext.Provider value={{ isEditing, setEditing }}>
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-3 pb-4  w-full">
                  {items.map((item) => (
                    <Droppable key={item.id} item={item} />
                  ))}
                </div>
              </SortableContext>
            </profileEditContext.Provider>
          </DndContext>
        </div>

        <ProfileEditor />
      </div>

      <AddProfileComponentDrawer />
    </>
  );
};

export default Page;
