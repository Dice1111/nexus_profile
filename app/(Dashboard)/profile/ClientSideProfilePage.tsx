"use client";
import ProfileEditor from "@/components/ProfileEdit/ProfileEditor";

import { ProfileCard, ProfileComponent } from "@/lib/type";

import ProfileCardComponent from "@/components/ProfileCardComponent/ProfileCardComponent";
import { ProfileContext } from "@/context/profileContext";
import themeData from "@/lib/profileCardTemplateData/ThemeData";
import { useState } from "react";

interface ProfileProps {
  profileComponentData: ProfileComponent[];
  profileCardData: ProfileCard;
}

const ClientSideProfilePage = ({
  profileComponentData,
  profileCardData,
}: ProfileProps) => {
  // Fetch from database
  const [components, setComponents] =
    useState<ProfileComponent[]>(profileComponentData);
  const [profileData, setProfileData] = useState<ProfileCard>(profileCardData);

  const theme: string = profileData.theme_schema;
  const [themeSchemaData, setThemeSchemaData] = useState(themeData[theme]);

  // State for editing
  const [isEditing, setEditing] = useState(false);

  return (
    <>
      <ProfileContext.Provider
        value={{
          components,
          setComponents,
          profileData,
          setProfileData,
          themeSchemaData,
          setThemeSchemaData,
          isEditing,
          setEditing,
        }}
      >
        <div className=" flex justify-space-between gap-4 w-full relative">
          {/* Profile Preview */}
          <ProfileCardComponent />
          <ProfileEditor />
        </div>
      </ProfileContext.Provider>
      {/* <AddProfileComponentDrawer /> */}
    </>
  );
};

export default ClientSideProfilePage;
