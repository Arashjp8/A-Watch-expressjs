import * as cheerio from "cheerio";
import {
  castCssPath,
  crewCssPath,
  genresCssPath,
  overviewCssPath,
  releaseDateCssPath,
  titleCssPath,
  voteAverageCssPath,
} from "../config";
import { parseDateAndLanguage } from "./dateAndLanguageUtil";
import { organizePeople } from "./crewUtil";
import { parseGenres } from "./genresUtil";

export const parseMovie = (movie$: cheerio.CheerioAPI) => {
  const title = movie$(titleCssPath).text().trim();

  const { releaseDate, originalLanguage } = parseDateAndLanguage(
    movie$(releaseDateCssPath).text().trim(),
  );

  const voteAverageString = movie$(voteAverageCssPath).attr("data-percent");
  const voteAverage = voteAverageString
    ? parseInt(voteAverageString.trim())
    : 0;

  const overview = movie$(overviewCssPath).text().trim();

  const crew = organizePeople(movie$(crewCssPath).text().trim());
  const cast = organizePeople(movie$(castCssPath).text().trim());

  const genres = parseGenres(movie$(genresCssPath).text().trim());

  const posterPath = movie$("img.poster").attr("src");
  const backdropPath = movie$("img.backdrop").attr("src") || "";

  return {
    title,
    releaseDate,
    originalLanguage,
    voteAverage,
    overview,
    posterPath,
    backdropPath,
    crew,
    cast,
    genres,
  };
};
