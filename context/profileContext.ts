
import { ProfileComponent, ProfileCard, ThemeSchema } from "@/lib/type";
import React, { createContext, useContext, useState } from "react";

export interface ProfileContextType {
  components: ProfileComponent[];
  setComponents: React.Dispatch<React.SetStateAction<ProfileComponent[]>>;
  profileData: ProfileCard;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileCard>>;
  themeSchemaData: ThemeSchema[string];
  setThemeSchemaData: React.Dispatch<
    React.SetStateAction<ThemeSchema[string]>
  >;
  isEditing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);



export const useProfileContext = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error(
      "useProfileContext must be used within a ProfileProvider"
    );
  }
  return context;
};
