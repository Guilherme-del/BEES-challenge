import { ICompany } from "./Companies";

export interface IUseStore {
  isLoading: boolean;
  fullName: string;
  companies: ICompany[];
  favorites: ICompany[];
  setIsLoading: (isLoading: boolean) => void;
  setFullName: (fullName: string) => void;
  setCompanies: (companies: ICompany[]) => void;
  setFavorites: (favorites: ICompany[]) => void;
}
