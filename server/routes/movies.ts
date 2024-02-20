import express, { Request, Response } from "express";
import { movies } from "../data/movies";
import { credits } from "../data/credits";

const router = express.Router();

router.get("/movies", (req: Request, res: Response) => {
  res.status(200).send(movies);
});

router.get("/movies/:id", (req: Request, res: Response) => {
  const desiredMovie = movies.find(
    (movie) => movie.id === parseInt(req.params.id),
  );

  desiredMovie
    ? res.status(200).send(desiredMovie)
    : res.status(404).send(JSON.stringify({ message: "Movie not found" }));
});

router.get("/movies/:id/credits", (req: Request, res: Response) => {
  res.status(200).send(credits);
});

export default router;
