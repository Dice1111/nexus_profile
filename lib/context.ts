import {createContext} from "react";


interface ProfileEditContext {
    isEditing: boolean;
    setEditing: (isEditing: boolean) => void;
  }


export const profileEditContext = createContext<ProfileEditContext|null>(null);