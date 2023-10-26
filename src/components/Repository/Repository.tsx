import { useMemo } from "react";
import { GoStar, GoRepoForked } from "react-icons/go";
import { RepositoryStructure } from "../../types";
import getColorByLanguage from "../../utils/getColorByLanguage";
import getDateFromString from "../../utils/getDateFromString";

interface RepositoryProps {
  repository: RepositoryStructure;
}

export default function Repository({
  repository,
}: RepositoryProps): React.ReactElement {
  const { description, language, stargazers_count, forks_count, updated_at } =
    repository;

  const languageColor = useMemo(() => getColorByLanguage(language), [language]);

  return (
    <article className="h-fit flex-1 py-6">
      <h2 className="text-2xl">{repository.name}</h2>
      <p className="mt-2 text-gray-400">{description}</p>
      <div className="mt-4 flex flex-wrap gap-y-2 text-sm text-gray-400">
        {language && (
          <div className="mr-4 flex items-center gap-2">
            <span
              style={{ backgroundColor: languageColor as string }}
              className={"block h-[16px] w-[16px] rounded-full"}
            ></span>
            <span className="inline-block">{language}</span>
          </div>
        )}
        {stargazers_count && (
          <div className="mr-4 flex items-center gap-1">
            <GoStar className="inline" />
            <span aria-label="stars count">{stargazers_count}</span>
          </div>
        )}
        {forks_count && (
          <div className="mr-4 flex items-center gap-1">
            <GoRepoForked className="inline" />
            <span aria-label="forks count">{forks_count}</span>
          </div>
        )}
        {updated_at && (
          <div className="mr-4 flex items-center gap-1">
            <span aria-label="updated on">
              Updated on {getDateFromString(updated_at)}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
