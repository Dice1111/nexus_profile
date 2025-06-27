"use client";

import { Button } from "@/components/ui/button";
import { ProfileContext } from "@/context/profileContext";

import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";

import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import ProfileEditor from "@/components/ProfileComponent/ProfileEditor/ProfileEditor";
import dynamic from "next/dynamic";
import { RxCross2 } from "react-icons/rx";
import { ProfileDndComponent, ProfileCard } from "@/lib/types/types";
import QRButton from "@/components/QRCodeButton/QRButton";
import {
  ProfileDndComponentSchemaType,
  profileDndInputSchema,
} from "@/components/ProfileComponent/EditProfileCard/DragAndDropComponent/ProfileDndInputSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { InformationModel } from "@/core/_domain/models/information.model";
import { DesignModel } from "@/core/_domain/models/design.model";
import { ProfileComponentModel } from "@/core/_domain/models/profile-component.model";

interface ProfileProps {
  profileComponentData: ProfileComponentModel[];
  profileInformationData: InformationModel;
  profileDesignData: DesignModel;
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

  //State for loading
  const [isLoading, setLoading] = useState(false);

  const [Information, setInformation] = useState<InformationModel[]>([]);
  const [Design, setDesign] = useState<DesignModel>();

  // Form setup
  const form = useForm<{ components: ProfileDndComponentSchemaType[] }>({
    mode: "onBlur",
    resolver: zodResolver(
      z.object({
        components: z.array(profileDndInputSchema),
      })
    ),
    defaultValues: {
      components: components as ProfileDndComponentSchemaType[],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "components",
  });

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
          isLoading,
          setLoading,
          form,
          fieldArray,
        }}
      >
        <div className=" flex flex-col p-4 sm:p-0 gap-5 sm:flex-row justify-center relative">
          <div className="mt-10  gap-5 flex flex-col mx-auto">
            {/* MANAGE BUTTON */}
            {!isEditing ? (
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditing(true);
                  }}
                >
                  <CiEdit />
                </Button>

                <QRButton profileID={profileData.card_id} />
              </div>
            ) : (
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="icon"
                  type="submit"
                  form="profileForm"
                  disabled={isLoading}
                  onClick={() => {
                    console.log("save");
                  }}
                >
                  <GiCheckMark />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  <RxCross2 />
                </Button>
              </div>
            )}

            {/* MANAGE MAIN CARD */}
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
          {isEditing && !isLoading && <ProfileEditor />}
        </div>
      </ProfileContext.Provider>
    </>
  );
}
