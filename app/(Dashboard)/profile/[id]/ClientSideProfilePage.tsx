"use client";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import ProfileEditor from "@/components/ProfileComponent/ProfileEditor/ProfileEditor";
import QRButton from "@/components/QRCodeButton/QRButton";
import { Button } from "@/components/ui/button";
import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";
import { FetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";
import { useDesignState } from "@/state_management/design.state";
import { useInformationState } from "@/state_management/information.state";
import { useProfileComponentsState } from "@/state_management/profile-component.state";
import { useProfilePageState } from "@/state_management/profile-loading.state";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

interface ProfileProps {
  profileCardData: {
    profileComponents: FetchProfileComponentData[];
    information: FetchInformationData;
    design: FetchDesignData;
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

export default function ClientSideProfilePage({
  profileCardData,
}: ProfileProps) {
  //STATE MANAGEMENT

  const isEditing = useProfilePageState((state) => state.isEditing);
  const isLoading = useProfilePageState((state) => state.isLoading);

  const setEditing = useProfilePageState((state) => state.setEditing);
  const setLoading = useProfilePageState((state) => state.setLoading);

  const setInformation = useInformationState((state) => state.setInformation);
  const setDesign = useDesignState((state) => state.setDesign);
  const setProfileComponents = useProfileComponentsState(
    (state) => state.setProfileComponents
  );

  // Initialize Zustand state from props
  useEffect(() => {
    if (profileCardData.information) {
      setInformation(profileCardData.information);
    }
  }, [profileCardData.information, setInformation]);

  useEffect(() => {
    if (profileCardData.design) {
      setDesign(profileCardData.design);
    }
  }, [profileCardData.design, setDesign]);

  useEffect(() => {
    if (profileCardData.profileComponents) {
      setProfileComponents(profileCardData.profileComponents);
    }
  }, [profileCardData.profileComponents, setProfileComponents]);

  return (
    <>
      <div className=" flex flex-col sm:p-0 gap-5 sm:flex-row justify-center relative">
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

              <QRButton />
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
                  setEditing(false);
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
            <ProfileCardComponent key="view" />
          )}
        </div>
        {isEditing && !isLoading && <ProfileEditor />}
      </div>
    </>
  );
}
