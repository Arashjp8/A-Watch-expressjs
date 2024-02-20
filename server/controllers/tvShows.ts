import { Request, Response } from "express";
import { tvShows } from "../data/tvShows";

export const getAllTvShows = (req: Request, res: Response) => {
  res.status(200).send(tvShows);
};

export const getTvShowById = (req: Request, res: Response) => {
  const desiredTvShow = tvShows.find(
    (tvShow) => tvShow.id === parseInt(req.params.id),
  );

  desiredTvShow
    ? res.status(200).send(desiredTvShow)
    : res.status(404).send(JSON.stringify({ message: "Movie not found" }));
};
