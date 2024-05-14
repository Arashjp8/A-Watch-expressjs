import { Request, Response } from "express";
import { handleFetchRequest } from "../services/apiUrl";
import { MovieModel } from "../models/MovieModel";

// TODO - maybe a web scarper to get the data from TMDB
//  or an interval to fetch the data from TMDB weekly

const storeMoviesInMongoDB = async () => {};

export const getTrendingMovies = async (req: Request, res: Response) => {
  // await handleFetchRequest("/trending/movie/day", res);
};

export const getPopularMovies = async (req: Request, res: Response) => {
  // await handleFetchRequest("/movie/popular", res);
  try {
    const movies = await MovieModel.find({});

    res.status(200).send(movies);
  } catch (err) {
    console.error("Error fetching movies: ", err);
    res.status(500).send(JSON.stringify({ message: "Error fetching movies" }));
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  const movieID = req.params.id;
  console.log(movieID);
  try {
    const movie = await MovieModel.findOne({ _id: movieID });
    console.log(movie);

    if (!movie) {
      res.status(404).send(JSON.stringify({ message: "Movie not found" }));
      return;
    }
    console.log(movie);
    res.status(200).send(movie);
  } catch (err: any) {
    console.error("Error fetching movie: ", err.message);
    res.status(500).send(JSON.stringify({ message: "Error fetching movie" }));
  }
};

export const getMovieCredits = (req: Request, res: Response) => {
  // res.status(200).send(credits);
};
