import { Request, Response } from "express";
import { handleFetchRequest } from "../services/apiUrl";

export const getTrendingTvShows = async (req: Request, res: Response) => {
  await handleFetchRequest("/trending/tv/day", res);
};

export const getPopularTvShows = async (req: Request, res: Response) => {
  await handleFetchRequest("/tv/popular", res);
};

export const getTvShowById = (req: Request, res: Response) => {
  // const desiredTvShow = tvShows.find(
  //   (tvShow) => tvShow.id === parseInt(req.params.id),
  // );
  //
  // desiredTvShow
  //   ? res.status(200).send(desiredTvShow)
  //   : res.status(404).send(JSON.stringify({ message: "Movie not found" }));
};
