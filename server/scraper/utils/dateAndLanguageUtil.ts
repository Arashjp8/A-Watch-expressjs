export const parseDateAndLanguage = (date: string) => {
  const dateArr = date.split("(");
  const releaseDate = dateArr[0].trim();

  let originalLanguage: string = "";
  if (dateArr.length > 1) {
    originalLanguage = dateArr[1].replace(")", "").trim();
  }
  return { releaseDate, originalLanguage };
};
