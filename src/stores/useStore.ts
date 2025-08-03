import { ICompany } from "models/Companies";
import { IUseStore } from "models/UseStore";
import { create } from "zustand";

const useStore = create<IUseStore>()((set: any) => ({
  isLoading: false,
  fullName: "",
  companies: [],
  favorites: [],

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setFullName: (fullName: string) => {
    set({ fullName });
  },

  setCompanies: (companies: ICompany[]) => {
    set({ companies });
  },

  setFavorites: (favorites: ICompany[]) => {
    set({ favorites });
  }
}));

export default useStore;