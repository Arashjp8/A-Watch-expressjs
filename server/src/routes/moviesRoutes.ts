import express from "express";
import {
  getTrendingMovies,
  getMovieById,
  getMovieCredits,
  getPopularMovies,
  getMovieVideos,
} from "../controllers/moviesController";
import validateApiKey from "../middleware/validateApiKey";

const router = express.Router();

router.get("/", validateApiKey, getTrendingMovies);
router.get("/popular", validateApiKey, getPopularMovies);
router.get("/:id", validateApiKey, getMovieById);
router.get("/:id/credits", validateApiKey, getMovieCredits);
router.get("/:id/videos", validateApiKey, getMovieVideos);

export default router;
