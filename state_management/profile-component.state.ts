import { ProfileDndComponentSchemaType } from "@/components/ProfileComponent/EditProfileCard/DragAndDropComponent/ProfileDndInputSchema";
import { FetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { create } from "zustand";

interface ProfileComponentState {
  profileComponents: FetchProfileComponentData[];

  //Form state

  form: UseFormReturn<{
    profileComponents: ProfileDndComponentSchemaType[];
  }> | null;
  fieldArray: UseFieldArrayReturn<
    { profileComponents: ProfileDndComponentSchemaType[] },
    "profileComponents"
  > | null;

  // Actions
  setProfileComponents: (components: FetchProfileComponentData[]) => void;
  addProfileComponent: (component: FetchProfileComponentData) => void;
  updateProfileComponent: (
    id: string,
    updated: Partial<FetchProfileComponentData>
  ) => void;
  removeProfileComponent: (id: string) => void;
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
