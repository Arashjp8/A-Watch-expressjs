import { Request, Response } from "express";
import { movies } from "../data/movies";
import { credits } from "../data/credits";
import mongoose from "mongoose";
import axios from "axios";

// getting data from TMDB API
const getMoviesFromTMDB = async () => {
  // TODO - move these into config file

  const BaseUrl = "https://api.themoviedb.org/3";
  const apiKey = process.env.NODE_APP_API_KEY;

  const response = await axios.get(
    `${BaseUrl}/movie/popular?api_key=${apiKey}&language=en-US`,
  );
  return response.data.results;
};

// storing data in MongoDB
const storeMoviesInMongoDB = async () => {};

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const fetchedMovies = await getMoviesFromTMDB();
    console.log(fetchedMovies);
    res.status(200).send(fetchedMovies);
  } catch (error) {
    console.log("Error while fetching movies", error);
    res.status(500).send(error);
  }
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
