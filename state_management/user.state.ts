import { create } from "zustand";

interface UserTriggerState {
  shouldRefetchUser: boolean;
  triggerRefetch: () => void;
  resetTrigger: () => void;
}

export const useUserTriggerStore = create<UserTriggerState>((set) => ({
  shouldRefetchUser: false,
  triggerRefetch: () => set({ shouldRefetchUser: true }),
  resetTrigger: () => set({ shouldRefetchUser: false }),
}));
