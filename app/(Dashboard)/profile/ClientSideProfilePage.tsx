"use client";

import { Button } from "@/components/ui/button";
import { ProfileContext } from "@/context/profileContext";
import { ProfileCard, ProfileDndComponent } from "@/lib/type";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";

import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import ProfileEditor from "@/components/ProfileComponent/ProfileEditor/ProfileEditor";
import dynamic from "next/dynamic";
import { RxCross2 } from "react-icons/rx";

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
        <div className=" flex flex-col p-4 sm:p-0 gap-5 sm:flex-row justify-center relative">
          <div className="mt-10  gap-5 flex flex-col mx-auto">
            {!isEditing ? (
              <Button
                variant="outline"
                size="icon"
                type="button"
                className=" w-20 "
                onClick={(e) => {
                  e.preventDefault();
                  setEditing(true);
                }}
              >
                <CiEdit />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  type="submit"
                  form="profileForm"
                  className="w-20"
                  onClick={() => {
                    console.log("save");
                  }}
                >
                  <GiCheckMark />
                  Save
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  className="w-20"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  <RxCross2 />
                  Cancel
                </Button>
              </div>
            )}

            {isEditing ? (
              <EditProfileCardComponent key="edit" />
            ) : (
              <ProfileCardComponent
                key="view"
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
