import express from "express";
import {
  getTrendingMovies,
  getMovieById,
  getMovieCredits,
  getPopularMovies,
  getMovieVideos,
} from "../controllers/moviesController";
import requireAuth from "../middleware/requireAuth";

const router = express.Router();

// middleware
router.use(requireAuth);

router.get("/", getTrendingMovies);
router.get("/popular", getPopularMovies);
router.get("/:id", getMovieById);
router.get("/:id/credits", getMovieCredits);
router.get("/:id/videos", getMovieVideos);

export default router;
