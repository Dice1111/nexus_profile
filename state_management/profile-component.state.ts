import { ProfileDndComponentSchemaType } from "@/components/ProfileComponent/EditProfileCard/DragAndDropComponent/ProfileDndInputSchema";
import {
  PROFILE_COMPONENT_CATEGORY,
  PROFILE_COMPONENT_TYPE,
} from "@/core/_domain/enum/profile-component-repository.enum";
import { FetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { create } from "zustand";

export type ProfileComponentViewType = {
  id?: number;
  cardId: string;
  value: string;
  label: string;
  createdAt: Date;
  updatedAt: Date;
  type: PROFILE_COMPONENT_TYPE;
  category: PROFILE_COMPONENT_CATEGORY;
  position: number;
};

interface ProfileComponentState {
  profileComponents: ProfileComponentViewType[];

  //Form state

  form: UseFormReturn<{
    profileComponents: ProfileDndComponentSchemaType[];
  }> | null;
  fieldArray: UseFieldArrayReturn<
    { profileComponents: ProfileDndComponentSchemaType[] },
    "profileComponents"
  > | null;

  // Actions
  setProfileComponents: (components: ProfileComponentViewType[]) => void;
  addProfileComponent: (component: ProfileComponentViewType) => void;
  updateProfileComponent: (
    id: number,
    updated: Partial<ProfileComponentViewType>
  ) => void;
  removeProfileComponent: (id: number) => void;
  clearProfileComponents: () => void;

  //set from
  setForm: (
    form: UseFormReturn<{ profileComponents: ProfileDndComponentSchemaType[] }>
  ) => void;

  setFieldArray: (
    fieldArray: UseFieldArrayReturn<
      { profileComponents: ProfileDndComponentSchemaType[] },
      "profileComponents"
    >
  ) => void;
}

export const useProfileComponentsState = create<ProfileComponentState>(
  (set) => ({
    profileComponents: [],

    form: null,
    fieldArray: null,

    setProfileComponents: (components) =>
      set({ profileComponents: components }),

    addProfileComponent: (component) =>
      set((state) => ({
        profileComponents: [...state.profileComponents, component],
      })),

    updateProfileComponent: (id, updated) =>
      set((state) => ({
        profileComponents: state.profileComponents.map((comp) =>
          comp.id === id ? { ...comp, ...updated } : comp
        ),
      })),

    removeProfileComponent: (id) =>
      set((state) => ({
        profileComponents: state.profileComponents.filter(
          (comp) => comp.id !== id
        ),
      })),

    clearProfileComponents: () => set({ profileComponents: [] }),

    setForm: (form) => set({ form }),
    setFieldArray: (fieldArray) => set({ fieldArray }),
  })
);
