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
    <article className="flex-1 h-fit py-6 border-y border-gray-400">
      <h2 className="text-2xl">{repository.name}</h2>
      <p className="mt-2 text-gray-400">{description}</p>
      <div className="mt-4 flex text-gray-400 text-sm">
        {language && (
          <div className="flex items-center gap-2 mr-4">
            <span
              className={`w-[16px] h-[16px] rounded-full block bg-[${languageColor}]`}
            ></span>
            <span className="inline-block">{language}</span>
          </div>
        )}
        {stargazers_count && (
          <div className="flex items-center mr-4 gap-1">
            <GoStar className="inline" />
            <span>{stargazers_count}</span>
          </div>
        )}
        {forks_count && (
          <div className="flex items-center mr-4 gap-1">
            <GoRepoForked className="inline" />
            <span>{forks_count}</span>
          </div>
        )}
        {updated_at && (
          <div className="flex items-center mr-4 gap-1">
            <span>Updated on {getDateFromString(updated_at)}</span>
          </div>
        )}
      </div>
    </article>
  );
}
