import {
  genresCssPath,
  getIDFromLink,
  overviewCssPath,
  releaseDateCssPath,
  voteAverageCssPath,
} from "../config";
import * as cheerio from "cheerio";
import { parseDateAndLanguage } from "../utils/dateAndLanguageUtil";
import { organizePeople } from "../utils/crewUtil";
import { parseGenres } from "../utils/genresUtil";
import { Movie, MovieModel } from "../../models/MovieModel";

export const movieParser = async (
  moviePageHtmlArray: any[],
  movieLinks: string[],
) => {
  for (let i = 0; i < moviePageHtmlArray.length; i++) {
    const movieID = getIDFromLink(movieLinks[i]);
    // Add movie to database if it doesn't exist in DB
    const existingMovie = await MovieModel.findOne({ _id: movieID });

    if (existingMovie) {
      console.log(`❌ movie ${movieID} already exists in database`);
      break;
    } else {
      const movieObject = await movieObjectScraper(
        moviePageHtmlArray[i],
        movieLinks,
        i,
      );
      const newMovie = new MovieModel(movieObject);
      newMovie._id = movieID;
      await newMovie.save();
      console.log(`✅ movie ${movieID} added to database`);
      console.log(`movie ${movieID} info: `, movieObject, "\n");
    }
  }
};

const movieObjectScraper = async (
  moviePageHtml: any,
  movieLinks: string[],
  index: number,
): Promise<Movie> => {
  const $ = cheerio.load(moviePageHtml);

  const title = $(`div.title a[href=${movieLinks[index]}]`)
    .text()
    .trim()
    .replace(/\(\d{4}\)$/, "")
    .trim();
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

  return {
    title,
    release_date: releaseDate,
    original_language: originalLanguage,
    vote_average: voteAverage,
    overview,
    crew,
    cast,
    genres,
    poster_path: posterPath,
    backdrop_path: backdropPath,
  };
};
