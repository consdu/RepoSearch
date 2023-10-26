import { useCallback } from "react";
import { RepositoryStructure } from "../../types";
import { toast } from "sonner";
import { apiUrl } from "../../utils/constants";

export default function useRepositories() {
  const getRepositories = useCallback(
    async (username: string): Promise<RepositoryStructure[] | undefined> => {
      try {
        const response = await fetch(
          `${apiUrl}/users/${username}/repos?per_page=10`,
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        return data;
      } catch {
        toast.error("Error loading repositories");
      }
    },
    [],
  );

  const getRepositoriesBySearchTerm = useCallback(
    async (
      searchTerm: string,
      username: string,
    ): Promise<RepositoryStructure[] | undefined> => {
      try {
        const response = await fetch(
          `${apiUrl}/search/repositories?q=${searchTerm}+user:${username}+fork:true`,
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        return data.items;
      } catch {
        toast.error("Error loading repositories");
      }
    },
    [],
  );

  return { getRepositories, getRepositoriesBySearchTerm };
}
