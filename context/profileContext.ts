import { ProfileDndComponentSchemaType } from "@/components/ProfileComponent/EditProfileCard/DragAndDropComponent/ProfileDndInputSchema";
import { DesignModel } from "@/core/_domain/models/design.model";
import { InformationModel } from "@/core/_domain/models/information.model";
import { ProfileDndComponent, ProfileCard } from "@/lib/types/types";
import React, { createContext, use, useContext } from "react";
import {  UseFieldArrayReturn, UseFormReturn } from "react-hook-form";


export interface ProfileContextType {
  components: ProfileDndComponent[];
  setComponents: React.Dispatch<React.SetStateAction<ProfileDndComponent[]>>;
  profileData: ProfileCard;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileCard>>;
  information: InformationModel[];
  setInformation: React.Dispatch<React.SetStateAction<InformationModel[]>>;
  design: DesignModel[];
  setDesign: React.Dispatch<React.SetStateAction<DesignModel[]>>;
  isEditing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<{ components: ProfileDndComponentSchemaType[] }>;
  fieldArray: UseFieldArrayReturn<{ components: ProfileDndComponentSchemaType[] }, "components">;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

export const useProfileContext = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
