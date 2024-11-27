"use client";

import { ProfileContext } from "@/context/profileContext";
import { profileLayoutData } from "@/lib/profileCardTemplateData/ThemeData";
import { ProfileComponent, ProfileCard } from "@/lib/type";
import { useState } from "react";
import EditProfileCardComponent from "./(ProfileComponent)/(ProfileCard)/EditProfileCardComponent";
import ProfileEditor from "./(ProfileComponent)/(ProfileEditor)/ProfileEditor";
import ProfileCardComponent from "@/components/ProfileCard/ProfileCardComponent";

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

  const layout: string = profileData.layout;

  const [layoutData, setLayoutData] = useState<JSX.Element>(
    profileLayoutData[layout as keyof typeof profileLayoutData]
  );

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
          layoutData,
          setLayoutData,
          isEditing,
          setEditing,
        }}
      >
        <div className=" flex justify-space-between gap-4 w-full relative">
          {/* Profile Preview */}
          {!isEditing ? <ProfileCardComponent /> : <EditProfileCardComponent />}

          <ProfileEditor />
        </div>
      </ProfileContext.Provider>
      {/* <AddProfileComponentDrawer /> */}
    </>
  );
};

export default ClientSideProfilePage;
