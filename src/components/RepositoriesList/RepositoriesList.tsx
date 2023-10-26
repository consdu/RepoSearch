import { RepositoryStructure } from "../../types";
import Repository from "../Repository/Repository";

interface RepositoriesListProps {
  repositories: RepositoryStructure[];
}

export default function RepositoriesList({
  repositories,
}: RepositoriesListProps): React.ReactElement {
  return (
    <ul className="py-20">
      {repositories.map((repository) => (
        <li
          key={repository.id}
          className="border-b border-gray-200 last:border-b first:border-t first:border-gray-200  last:border-gray-200"
        >
          <Repository repository={repository} />
        </li>
      ))}
    </ul>
  );
}
