"use client";

import { ProfileContext } from "@/context/profileContext";
import { Button } from "@/components/ui/button";
import { ProfileCard, ProfileDndComponent } from "@/lib/type";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";

import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import dynamic from "next/dynamic";
import ProfileEditor from "@/components/ProfileComponent/ProfileEditor/ProfileEditor";

interface ProfileProps {
  profileComponentData: ProfileDndComponent[];
  profileCardData: ProfileCard;
}

const ProfileCardComponent = dynamic(
  () =>
    import("@/components/ProfileComponent/ProfileCard/ProfileCardComponent"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

const EditProfileCardComponent = dynamic(
  () =>
    import(
      "@/components/ProfileComponent/EditProfileCard/EditProfileCardComponent"
    ),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export default function ClientSideProfilePage({
  profileComponentData,
  profileCardData,
}: ProfileProps) {
  // Fetch from database
  const [components, setComponents] =
    useState<ProfileDndComponent[]>(profileComponentData);
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
          <div className="mt-10 mx-auto gap-5 flex flex-col">
            {!isEditing ? (
              <div className="w-full flex justify-end">
                <Button
                  variant={"ghost"}
                  size="icon"
                  type="button"
                  className=" bg-secondary text-secondary-foreground w-20  secondary-foreground hover:scale-105 rounded-lg transition "
                  onClick={() => {
                    setEditing(true);
                  }}
                >
                  <CiEdit />
                </Button>
              </div>
            ) : (
              <Button
                variant={"ghost"}
                size="icon"
                type="submit"
                form="profileForm"
                className=" bg-secondary text-secondary-foreground w-20  secondary-foreground hover:scale-105 rounded-lg transition "
              >
                <GiCheckMark />
              </Button>
            )}

            {isEditing ? (
              <EditProfileCardComponent />
            ) : (
              <ProfileCardComponent
                components={components}
                profileData={profileData}
              />
            )}
          </div>
          {isEditing && <ProfileEditor />}
        </div>
      </ProfileContext.Provider>
    </>
  );
}
