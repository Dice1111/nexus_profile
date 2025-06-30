import { create } from "zustand";

interface InformationState {
  id: number;
  cardId: string;
  title: string | null;
  prefix: string | null;
  fullName: string;
  occupation: string | null;
  company: string | null;
  message: string | null;
  quote: string | null;
  suffix: string | null;
  preferredName: string | null;
  pronouns: string | null;

  // Setters
  setId: (id: number) => void;
  setCardId: (cardId: string) => void;
  setTitle: (title: string | null) => void;
  setOccupation: (occupation: string | null) => void;
  setCompany: (company: string | null) => void;
  setMessage: (message: string | null) => void;
  setQuote: (quote: string | null) => void;
  setPrefix: (prefix: string | null) => void;
  setFullName: (fullName: string) => void;
  setSuffix: (suffix: string | null) => void;
  setPreferredName: (preferredName: string | null) => void;
  setPronouns: (pronouns: string | null) => void;

  // Optional: Replace full object
  setInformation: (
    info: Omit<InformationState, keyof InformationActions>
  ) => void;
}

type InformationActions = {
  setId: (id: number) => void;
  setCardId: (cardId: string) => void;
  setTitle: (title: string | null) => void;
  setOccupation: (occupation: string | null) => void;
  setCompany: (company: string | null) => void;
  setMessage: (message: string | null) => void;
  setQuote: (quote: string | null) => void;
  setPrefix: (prefix: string | null) => void;
  setFullName: (fullName: string) => void;
  setSuffix: (suffix: string | null) => void;
  setPreferredName: (preferredName: string | null) => void;
  setPronouns: (pronouns: string | null) => void;
  setInformation: (
    info: Omit<InformationState, keyof InformationActions>
  ) => void;
};

export const useInformationState = create<InformationState>((set) => ({
  id: 0,
  cardId: "",
  title: null,
  occupation: null,
  company: null,
  message: null,
  quote: null,
  prefix: null,
  fullName: "",
  suffix: null,
  preferredName: null,
  pronouns: null,

  setId: (id) => set({ id }),
  setCardId: (cardId) => set({ cardId }),
  setTitle: (title) => set({ title }),
  setOccupation: (occupation) => set({ occupation }),
  setCompany: (company) => set({ company }),
  setMessage: (message) => set({ message }),
  setQuote: (quote) => set({ quote }),
  setPrefix: (prefix) => set({ prefix }),
  setFullName: (fullName) => set({ fullName }),
  setSuffix: (suffix) => set({ suffix }),
  setPreferredName: (preferredName) => set({ preferredName }),
  setPronouns: (pronouns) => set({ pronouns }),
  setInformation: (info) => set((state) => ({ ...state, ...info })),
}));
