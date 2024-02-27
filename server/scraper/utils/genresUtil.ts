export const parseGenres = (genres: string) => {
  return genres.split(",").map((genre) => genre.trim());
};
