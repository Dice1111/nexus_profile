import { PROFILE_LAYOUT } from "@/core/_domain/enum/design-repository.enum";
import { create } from "zustand";

interface DesignState {
  id: number;
  cardId: string;
  foregroundColor: string;
  backgroundColor: string;
  profileImage: string | null;
  logoImage: string | null;
  layout: PROFILE_LAYOUT;

  // Setters
  setId: (id: number) => void;
  setCardId: (cardId: string) => void;
  setForegroundColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setProfileImage: (url: string | null) => void;
  setLogoImage: (url: string | null) => void;
  setLayout: (layout: PROFILE_LAYOUT) => void;

  // Optional: Replace full object
  setDesign: (design: Omit<DesignState, keyof DesignActions>) => void;
}

type DesignActions = {
  setId: (id: number) => void;
  setCardId: (cardId: string) => void;
  setForegroundColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setProfileImage: (url: string | null) => void;
  setLogoImage: (url: string | null) => void;
  setLayout: (layout: PROFILE_LAYOUT) => void;
  setDesign: (design: Omit<DesignState, keyof DesignActions>) => void;
};

export const useDesignState = create<DesignState>((set) => ({
  id: 0,
  cardId: "",
  foregroundColor: "#000000",
  backgroundColor: "#FFFFFF",
  profileImage: null,
  logoImage: null,
  layout: PROFILE_LAYOUT.LAYOUT_ONE,

  setId: (id) => set({ id }),
  setCardId: (cardId) => set({ cardId }),
  setForegroundColor: (color) => set({ foregroundColor: color }),
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setProfileImage: (url) => set({ profileImage: url }),
  setLogoImage: (url) => set({ logoImage: url }),
  setLayout: (layout) => set({ layout }),
  setDesign: (design) => set((state) => ({ ...state, ...design })),
}));
