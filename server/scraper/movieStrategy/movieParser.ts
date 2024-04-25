import {
  axiosInstance,
  castCssPath,
  crewCssPath,
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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const movieParser = async (movieLinks: string[]) => {
  const delayPerRequest = 100; // delay in milliseconds

  for (const movieLink of movieLinks) {
    await delay(delayPerRequest);

    const response = await axiosInstance.get(movieLink);
    const $ = cheerio.load(response.data);

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
    const movieID = getIDFromLink(movieLink);

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
