import { ProfileDndComponentSchemaType } from "@/components/ProfileComponent/EditProfileCard/DragAndDropComponent/ProfileDndInputSchema";
import { DesignModel } from "@/core/_domain/models/design.model";
import { InformationModel } from "@/core/_domain/models/information.model";
import { ProfileComponentModel } from "@/core/_domain/models/profile-component.model";
import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";
import { FetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";
import React, { createContext, useContext } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

export interface ProfileContextType {
  components: FetchProfileComponentData[];
  setComponents: React.Dispatch<
    React.SetStateAction<FetchProfileComponentData[]>
  >;
  information: FetchInformationData;
  setInformation: React.Dispatch<React.SetStateAction<FetchInformationData>>;
  design: FetchDesignData;
  setDesign: React.Dispatch<React.SetStateAction<FetchDesignData>>;
  isEditing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<{ components: ProfileDndComponentSchemaType[] }>;
  fieldArray: UseFieldArrayReturn<
    { components: ProfileDndComponentSchemaType[] },
    "components"
  >;
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
