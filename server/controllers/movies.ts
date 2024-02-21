import { Request, Response } from "express";
import { movies } from "../data/movies";
import { credits } from "../data/credits";
import mongoose from "mongoose";
import axios from "axios";
import { fetchFromTMDB } from "../services/apiUrl";

// TODO - maybe a web scarper to get the data from TMDB
//  or an interval to fetch the data from TMDB weekly

// storing data in MongoDB
const storeMoviesInMongoDB = async () => {};

const handleFetchRequest = async (url: string, res: Response) => {
  try {
    const fetchedMovies = await fetchFromTMDB(url);
    res.status(200).send(fetchedMovies);
  } catch (error) {
    console.log("Error while fetching movies", error);
    res.status(500).send(error);
  }
};

export const getAllMovies = async (req: Request, res: Response) => {
  await handleFetchRequest("/discover/movie", res);
};

export const getPopularMovies = async (req: Request, res: Response) => {
  await handleFetchRequest("/movie/popular", res);
};

export const getMovieById = (req: Request, res: Response) => {
  const desiredMovie = movies.find(
    (movie) => movie.id === parseInt(req.params.id),
  );

  desiredMovie
    ? res.status(200).send(desiredMovie)
    : res.status(404).send(JSON.stringify({ message: "Movie not found" }));
};

export const getMovieCredits = (req: Request, res: Response) => {
  res.status(200).send(credits);
};
