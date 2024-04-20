import express from "express";
import {
  getTrendingTvShows,
  getTvShowById,
} from "../controllers/tvShowsController";
import { getPopularMovies } from "../controllers/moviesController";

const router = express.Router();

router.get("/", getTrendingTvShows);
router.get("/popular", getPopularMovies);
router.get("/:id", getTvShowById);

export default router;
