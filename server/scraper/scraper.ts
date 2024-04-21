import axios from "axios";
import * as cheerio from "cheerio";
import { MovieResponse } from "./types";
import { parseMovie } from "./utils/movieUtil";
import { Movie, MovieModel } from "../models/MovieModel";

const fetchMoviePage = async () => {
  const totalPages = 5;
  const allMovies: Movie[] = [];
  const delayBetweenPages = 100; // Delay in milliseconds

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
  const instance = axios.create({
    baseURL: "https://www.themoviedb.org",
    headers: {
      "Accept-Language": "en-US,en;q=0.9",
      Cookie: process.env.TMDB_COOKIE,
    },
  });
  const response = await instance.get(`/movie?page=${page}`);
  const $ = cheerio.load(response.data);

  const moviePromises: Promise<Movie | null>[] = [];

  $("div.page_wrapper div.card").each((i, el) => {
    const movieLink = $(el).find("div.image a").attr("href");
    if (movieLink) {
      const movieID = getMovieIDFromLink(movieLink!);

      const moviePromise: Promise<Movie | null> = instance
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
            id: movieID,
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
          await saveMovieInDB(movieObj, title, movieID);

          console.log("movieObj: ", movieObj);
          return movieObj;
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
          return null;
        });

      moviePromises.push(moviePromise);
    }
  });
  const movies = await Promise.all(moviePromises);

  return movies.filter((movie: Movie | null) => movie !== null) as Movie[];
};

const saveMovieInDB = async (
  movieObj: Movie,
  title: string,
  movieID: string,
) => {
  const existingMovie = await MovieModel.findOne({ movieID, title });

  if (!existingMovie) {
    const movie = new MovieModel(movieObj);
    await movie.save();
    console.log("Saved movie to MongoDB: ", movie);
  } else {
    console.log(`${movieObj.title} already exists in MongoDB: `, existingMovie);
  }
};

const getMovieIDFromLink = (movieLink: string): string => {
  const parts = movieLink.split("/");
  return parts[parts.length - 1];
};
