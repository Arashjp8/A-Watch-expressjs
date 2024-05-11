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
import { MovieModel } from "../../models/MovieModel";

export const movieParser = async (
  moviePageHtmlArray: any[],
  movieLinks: string[],
) => {
  for (let i = 0; i < moviePageHtmlArray.length; i++) {
    const $ = cheerio.load(moviePageHtmlArray[i]);

    const title = $(`div.title a[href=${movieLinks[i]}]`)
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
    const movieID = getIDFromLink(movieLinks[i]);

    const movieObject = {
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

    // Add movie to database if it doesn't exist in DB
    const existingMovie = await MovieModel.findOne({ _id: movieID });

    if (existingMovie) {
      console.log(`movie ${movieID} already exists in database`);
    } else {
      const newMovie = new MovieModel(movieObject);
      newMovie._id = movieID;
      await newMovie.save();
      console.log(`movie ${movieID} added to database`);
    }

    console.log(`movie ${movieID} info: `, movieObject);
  }
};
