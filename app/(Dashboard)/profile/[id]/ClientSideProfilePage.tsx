"use client";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import {
  ProfileDndComponentSchemaType,
  profileDndInputSchema,
} from "@/components/ProfileComponent/EditProfileCard/DragAndDropComponent/ProfileDndInputSchema";
import ProfileEditor from "@/components/ProfileComponent/ProfileEditor/ProfileEditor";
import QRButton from "@/components/QRCodeButton/QRButton";
import { Button } from "@/components/ui/button";
import { ProfileContext } from "@/context/profileContext";
import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";
import { FetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { z } from "zod";

interface ProfileProps {
  profileCardData: {
    profileComponents: FetchProfileComponentData[];
    information: FetchInformationData | null;
    design: FetchDesignData | null;
  };
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

const profileCardDataDefault = {
  profileComponents: [],
  information: {
    id: 0,
    cardId: "",
    title: "",
    occupation: "",
    company: "",
    message: "",
    quote: "",
    prefix: "",
    fullName: "",
    suffix: "",
    preferredName: "",
    pronouns: "",
  },
  design: {
    id: 0,
    cardId: "",
    foregroundColor: "#000000",
    backgroundColor: "#FFFFFF",
    profileImage: "image/profile.jpg",
    logoImage: "image/profile.jpg",
    layout: "LAYOUT_ONE",
  },
};

export default function ClientSideProfilePage({
  profileCardData,
}: ProfileProps) {
  // Fetch from database
  const [components, setComponents] = useState<FetchProfileComponentData[]>(
    profileCardData.profileComponents ||
      profileCardDataDefault.profileComponents
  );
  const [information, setInformation] = useState<FetchInformationData>(
    profileCardData.information || profileCardDataDefault.information
  );
  const [design, setDesign] = useState<FetchDesignData>(
    profileCardData.design || profileCardDataDefault.design
  );

  // State for editing
  const [isEditing, setEditing] = useState(false);
  //State for loading
  const [isLoading, setLoading] = useState(false);

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
          information,
          setInformation,
          design,
          setDesign,
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

                <QRButton cardId={information.cardId} />
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
                design={design}
                information={information}
              />
            )}
          </div>
          {isEditing && !isLoading && <ProfileEditor />}
        </div>
      </ProfileContext.Provider>
    </>
  );
}
