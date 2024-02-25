import { Request, Response } from "express";
import mongoose from "mongoose";
import { handleFetchRequest } from "../services/apiUrl";

// TODO - maybe a web scarper to get the data from TMDB
//  or an interval to fetch the data from TMDB weekly

const storeMoviesInMongoDB = async () => {};

export const getTrendingMovies = async (req: Request, res: Response) => {
  await handleFetchRequest("/trending/movie/day", res);
};

export const getPopularMovies = async (req: Request, res: Response) => {
  await handleFetchRequest("/movie/popular", res);
};

export const getMovieById = (req: Request, res: Response) => {
  // const desiredMovie = movies.find(
  //   (movie) => movie.id === parseInt(req.params.id),
  // );
  //
  // desiredMovie
  //   ? res.status(200).send(desiredMovie)
  //   : res.status(404).send(JSON.stringify({ message: "Movie not found" }));
};

export const getMovieCredits = (req: Request, res: Response) => {
  // res.status(200).send(credits);
};
