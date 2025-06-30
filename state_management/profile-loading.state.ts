import { create } from "zustand";

interface ProfileLoadingState {
  isLoading: boolean;
  isEditing: boolean;
  setLoading: (isLoading: boolean) => void;
  setEditing: (isEditing: boolean) => void;
}

export const useProfilePageState = create<ProfileLoadingState>((set) => ({
  isLoading: false,
  isEditing: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setEditing: (isEditing: boolean) => set({ isEditing }),
}));
