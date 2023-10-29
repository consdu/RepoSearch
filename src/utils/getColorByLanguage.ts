import { githubLanguagesColors } from "./constants";

const getColorByLanguage = (language: string | null) => {
  if (!language) return "";

  const color =
    githubLanguagesColors[language as keyof typeof githubLanguagesColors]
      ?.color ?? "";

  return color;
};

export default getColorByLanguage;
