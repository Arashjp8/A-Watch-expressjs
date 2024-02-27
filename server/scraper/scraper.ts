import axios from "axios";
import * as cheerio from "cheerio";
import {
  crewCssPath,
  genresCssPath,
  overviewCssPath,
  releaseDateCssPath,
  titleCssPath,
  voteAverageCssPath,
} from "./config";
import { organizeCastAndCrew } from "../utils/crewUtils";
import { parseGenres } from "../utils/genresUtils";
import { parseDateAndLanguage } from "../utils/dateAndLanguageUtils";

const fetchMoviePage = async () => {
  const totalPages = 5;
  // TODO - Add an interface for the movie object
  const allMovies: any[] = [];
  const delayBetweenPages = 2000; // Delay in milliseconds

  for (let page = 1; page <= totalPages; page++) {
    const pageMovies = await fetchMoviesWithDelay(page, delayBetweenPages);
    pageMovies ? allMovies.push(...pageMovies) : null;
    console.log("Page Number: " + page);
  }

  return allMovies;
};

const fetchMoviesWithDelay = async (page: number, delay: number) => {
  // TODO - Add an interface for the movie object
  return new Promise<any>((resolve) => {
    setTimeout(async () => {
      const pageMovies = await fetchMovies(page);
      resolve(pageMovies);
    }, delay);
  });
};

const fetchMovies = async (page: number) => {
  const instance = axios.create({ baseURL: "https://www.themoviedb.org" });
  const response = await instance.get(`/movie?page=${page}`);
  const $ = cheerio.load(response.data);

  // TODO - Add an interface for the movie object
  let movies: any[] = [];

  $("div.page_wrapper div.card").each((i, el) => {
    const movieLink = $(el).find("div.image a").attr("href");

    instance
      .get(`${movieLink}`)
      .then(async (movieResponse) => {
        const movie$ = cheerio.load(movieResponse.data);

        const title = movie$(titleCssPath).text().trim();
        const { releaseDate, originalLanguage } = parseDateAndLanguage(
          movie$(releaseDateCssPath).text().trim(),
        );
        const voteAverage = movie$(voteAverageCssPath)
          .attr("data-percent")!
          .trim();
        const overview = movie$(overviewCssPath).text().trim();
        const crew = organizeCastAndCrew(movie$(crewCssPath).text().trim());
        const cast = organizeCastAndCrew(
          movie$(
            "body.en.v4 div.page_wrap.movie_wrap main#main.smaller.subtle section.inner_content.movie_content.backdrop.poster div#media_v4.media.movie_v4.header_large div.column_wrapper div.content_wrapper div div.white_column section.panel.top_billed.scroller div#cast_scroller.scroller_wrap.should_fade.is_fading ol.people.scroller",
          )
            .text()
            .trim(),
        );
        const genres = parseGenres(movie$(genresCssPath).text().trim());
        const posterPath = movie$("img.poster").attr("src");
        const backdrop = movie$("img.backdrop").attr("src");

        // TODO - Add an interface for the movie object
        const movieObj = {
          title,
          voteAverage,
          overview,
          posterPath,
          backdrop,
          releaseDate,
          originalLanguage,
          genres,
          cast,
          crew,
        };
        movies.push(movieObj);

        console.log("\n=====================");
        console.log(movieObj);
        console.log("=====================\n");
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  });
  return movies;
};

const allMovies = fetchMoviePage();
