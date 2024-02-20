import express from "express";
import { getAllTvShows, getTvShowById } from "../controllers/tvShows";

const router = express.Router();

router.get("/", getAllTvShows);
router.get("/:id", getTvShowById);

export default router;
