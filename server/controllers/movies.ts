import { Request, Response } from "express";
import { movies } from "../data/movies";
import { credits } from "../data/credits";

export const getAllMovies = (req: Request, res: Response) => {
  res.status(200).send(movies);
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
