import express from "express";
import {
  getTrendingMovies,
  getMovieById,
  getMovieCredits,
  getPopularMovies,
} from "../controllers/moviesController";

const router = express.Router();

router.get("/", getTrendingMovies);
router.get("/popular", getPopularMovies);
router.get("/:id", getMovieById);
router.get("/:id/credits", getMovieCredits);

export default router;
