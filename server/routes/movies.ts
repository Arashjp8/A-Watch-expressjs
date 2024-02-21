import express from "express";
import {
  getAllMovies,
  getMovieById,
  getMovieCredits,
  getPopularMovies,
} from "../controllers/movies";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/popular", getPopularMovies);
router.get("/:id", getMovieById);
router.get("/:id/credits", getMovieCredits);

export default router;
