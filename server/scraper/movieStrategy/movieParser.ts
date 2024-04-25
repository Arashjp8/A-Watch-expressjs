import {
  genresCssPath,
  overviewCssPath,
  releaseDateCssPath,
  titleCssPath,
  voteAverageCssPath,
  getIDFromLink,
} from "../config";
import * as cheerio from "cheerio";
import { parseDateAndLanguage } from "../utils/dateAndLanguageUtil";
import { organizePeople } from "../utils/crewUtil";
import { parseGenres } from "../utils/genresUtil";

export const movieParser = async (
  moviePageHtmlArray: any[],
  movieLinks: string[],
) => {
  for (let i = 0; i < moviePageHtmlArray.length; i++) {
    const $ = cheerio.load(moviePageHtmlArray[i]);

    const title = $(titleCssPath).text().trim();
    const { releaseDate, originalLanguage } = parseDateAndLanguage(
      $(releaseDateCssPath).text().trim(),
    );
    const voteAverageString = $(voteAverageCssPath).attr("data-percent");
    const voteAverage = voteAverageString
      ? parseInt(voteAverageString.trim())
      : 0;
    const overview = $(overviewCssPath).text().trim();
    const crew = organizePeople($, "crew");
    const cast = organizePeople($, "cast");
    const genres = parseGenres($(genresCssPath).text().trim());
    const posterPath = $("img.poster").attr("src");
    const backdropPath = $("img.backdrop").attr("src") || "";
    const movieID = getIDFromLink(movieLinks[i]);

    const movieObject = {
      movieID,
      title,
      releaseDate,
      originalLanguage,
      voteAverage,
      overview,
      crew,
      cast,
      genres,
      posterPath,
      backdropPath,
    };

    console.log(`movie ${movieID} info: `, movieObject);
  }
};
