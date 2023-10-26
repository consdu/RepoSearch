import { useCallback } from "react";
import { RepositoryStructure } from "../../types";
import { toast } from "sonner";

const apiUrl = "https://api.github.com/users";

export default function useRepositories() {
  const getRepositories = useCallback(
    async (username: string): Promise<RepositoryStructure[] | undefined> => {
      try {
        const response = await fetch(`${apiUrl}/${username}/repos?per_page=10`);

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

  return { getRepositories };
}
