import { FetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";
import { create } from "zustand";

interface ProfileComponentState {
  profileComponents: FetchProfileComponentData[];

  // Actions
  setProfileComponents: (components: FetchProfileComponentData[]) => void;
  addProfileComponent: (component: FetchProfileComponentData) => void;
  updateProfileComponent: (
    id: number,
    updated: Partial<FetchProfileComponentData>
  ) => void;
  removeProfileComponent: (id: number) => void;
  clearProfileComponents: () => void;
}

export const useProfileComponents = create<ProfileComponentState>((set) => ({
  profileComponents: [],

  setProfileComponents: (components) => set({ profileComponents: components }),

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
}));
