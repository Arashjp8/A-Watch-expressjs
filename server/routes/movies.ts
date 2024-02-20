import express from "express";
import {
  getAllMovies,
  getMovieById,
  getMovieCredits,
} from "../controllers/movies";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.get("/:id/credits", getMovieCredits);

export default router;
