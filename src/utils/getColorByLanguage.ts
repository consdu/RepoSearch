import { githubLanguagesColors } from "./constants";

const getColorByLanguage = (language: string | null) => {
  if (language === null) return "";

  const color =
    githubLanguagesColors[language as keyof typeof githubLanguagesColors].color;

  return color;
};

export default getColorByLanguage;
