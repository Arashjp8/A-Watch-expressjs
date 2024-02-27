export const parseDateAndLanguage = (date: string) => {
  const dateArr = date.split("(");
  const releaseDate = dateArr[0].trim();
  const language = dateArr[1].replace(")", "").trim();
  return { releaseDate, originalLanguage: language };
};
