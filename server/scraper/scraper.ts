import axios from "axios";
import * as cheerio from "cheerio";
import { Movie } from "./types";
import { parseMovie } from "./utils/movieUtil";

const fetchMoviePage = async () => {
  const totalPages = 5;
  const allMovies: Movie[] = [];
  const delayBetweenPages = 2000; // Delay in milliseconds

  for (let page = 1; page <= totalPages; page++) {
    const pageMovies = await fetchMoviesWithDelay(page, delayBetweenPages);
    pageMovies ? allMovies.push(...pageMovies) : null;
    console.log("Page Number: " + page);
  }

  return allMovies;
};

const fetchMoviesWithDelay = async (page: number, delay: number) => {
  return new Promise<Movie[]>((resolve) => {
    setTimeout(async () => {
      const pageMovies: Movie[] = await fetchMovies(page);
      resolve(pageMovies);
    }, delay);
  });
};

const fetchMovies = async (page: number) => {
  const instance = axios.create({ baseURL: "https://www.themoviedb.org" });
  const response = await instance.get(`/movie?page=${page}`);
  const $ = cheerio.load(response.data);

  let movies: Movie[] = [];

  $("div.page_wrapper div.card").each((i, el) => {
    const movieLink = $(el).find("div.image a").attr("href");

    instance
      .get(`${movieLink}`)
      .then(async (movieResponse) => {
        const movie$ = cheerio.load(movieResponse.data);

        const {
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
        } = parseMovie(movie$);

        const movieObj: Movie = {
          title,
          voteAverage,
          overview,
          posterPath,
          backdropPath,
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
