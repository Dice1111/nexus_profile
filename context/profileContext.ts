
import { ProfileDndComponent, ProfileCard } from "@/types/types";
import React, { createContext, useContext } from "react";

export interface ProfileContextType {
  components: ProfileDndComponent[];
  setComponents: React.Dispatch<React.SetStateAction<ProfileDndComponent[]>>;
  profileData: ProfileCard;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileCard>>;
  isEditing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

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
