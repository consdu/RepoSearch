import { useCallback } from "react";
import { GithubUserStructure, RepositoryStructure } from "../../types";
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

        const data = (await response.json()) as RepositoryStructure[];

        return data;
      } catch {
        toast.error("Error loading repositories");
      }
    },
    [],
  );

  const getRepositoriesBySearchTerm = useCallback(
    async (
      username: string,
      searchTerm: string,
      searchMethod: string,
    ): Promise<RepositoryStructure[] | undefined> => {
      try {
        let response;

        if (searchMethod === "name") {
          response = await fetch(
            `${apiUrl}/search/repositories?q=${searchTerm}+user:${username}+fork:true`,
          );
        }

        if (searchMethod === "language") {
          response = await fetch(
            `${apiUrl}/search/repositories?q=+user:${username}+fork:true+language:${searchTerm}&per_page=100`,
          );
        }

        if (!response?.ok) {
          throw new Error();
        }

        const data = (await response.json()) as {
          items: RepositoryStructure[];
        };

        return data.items;
      } catch {
        toast.error("Error loading repositories");
      }
    },
    [],
  );

  const getUser = async (
    username: string,
  ): Promise<GithubUserStructure | undefined> => {
    try {
      const response = await fetch(`${apiUrl}/users/${username}`);

      if (!response.ok) {
        throw new Error();
      }

      const data = (await response.json()) as GithubUserStructure;

      return data;
    } catch {
      toast.error("Error loading user");
    }
  };

  return { getRepositories, getRepositoriesBySearchTerm, getUser };
}
