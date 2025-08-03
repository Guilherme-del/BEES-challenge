import axios from "axios";
import { environment } from "environments/environment";
import { ICompany } from "models/Companies";

const http = axios.create({
  baseURL: environment.baseUrl,
  headers: {
    "Content-type": "application/json"
  }
});

/**
 * Busca cervejarias por nome, com paginação.
 * @param query Texto de busca (nome da cervejaria)
 * @param page Página atual (default = 1)
 * @param perPage Itens por página (default = 10)
 * @returns Lista de cervejarias do tipo ICompany[]
 */
export const searchCompaniesByName = (
  query: string,
  page: number = 1,
  perPage: number = 10
) => {
  return http.get<ICompany[]>("breweries/search", {
    params: {
      query,
      page,
      per_page: perPage,
    },
  });
};
