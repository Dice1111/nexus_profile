"use client";

import { ProfileContext } from "@/context/profileContext";

import ProfileCardComponent from "@/components/ProfileCard/ProfileCardComponent";
import { Button } from "@/components/ui/button";
import { ProfileCard, ProfileComponent } from "@/lib/type";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";
import EditProfileCardComponent from "./(ProfileComponent)/(ProfileCard)/EditProfileCardComponent";
import ProfileEditor from "./(ProfileComponent)/(ProfileEditor)/ProfileEditor";

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
          isEditing,
          setEditing,
        }}
      >
        <div className=" flex justify-center  gap- relative">
          {/* Profile Preview */}
          <div className="mt-10 mx-auto gap-5 flex flex-col">
            <Button
              variant={"ghost"}
              size="icon"
              className=" bg-secondary text-secondary-foreground w-20  secondary-foreground hover:scale-105 rounded-lg transition "
              onClick={() => {
                setEditing(!isEditing);
              }}
            >
              {isEditing ? (
                <>
                  <GiCheckMark />
                  Save
                </>
              ) : (
                <>
                  <CiEdit />
                  Edit
                </>
              )}
            </Button>

            {isEditing ? (
              <EditProfileCardComponent />
            ) : (
              <ProfileCardComponent />
            )}
          </div>
          {isEditing && <ProfileEditor />}
        </div>
      </ProfileContext.Provider>
    </>
  );
};

export default ClientSideProfilePage;
