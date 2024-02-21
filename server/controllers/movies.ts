import { Request, Response } from "express";
import { movies } from "../data/movies";
import { credits } from "../data/credits";
import mongoose from "mongoose";
import axios from "axios";
import { apiUrlGenerator } from "../services/apiUrl";

// TODO - maybe a web scarper to get the data from TMDB
//  or an interval to fetch the data from TMDB weekly

// getting data from TMDB API
const fetchFromTMDB = async (url: string) => {
  try {
    const response = await axios.get(apiUrlGenerator(url));
    return response.data.results;
  } catch (error) {
    console.log("Error while fetching movies", error);
  }
};

// storing data in MongoDB
const storeMoviesInMongoDB = async () => {};

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const fetchedMovies = await fetchFromTMDB("/discover/movie");
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
