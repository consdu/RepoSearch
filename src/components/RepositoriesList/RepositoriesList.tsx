import { RepositoryStructure } from "../../types";
import Repository from "../Repository/Repository";

interface RepositoriesListProps {
  repositories: RepositoryStructure[];
}

export default function RepositoriesList({
  repositories,
}: RepositoriesListProps): React.ReactElement {
  return (
    <ul className="divide-y">
      {repositories.map((repository) => (
        <li
          key={repository.id}
          className="first:border-t first:border-gray-200"
        >
          <Repository repository={repository} />
        </li>
      ))}
    </ul>
  );
}
