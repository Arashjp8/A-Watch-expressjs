import express from "express";
import { getTrendingTvShows, getTvShowById } from "../controllers/tvShows";
import { getPopularMovies } from "../controllers/movies";

const router = express.Router();

router.get("/", getTrendingTvShows);
router.get("/popular", getPopularMovies);
router.get("/:id", getTvShowById);

export default router;
