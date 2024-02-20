import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import moviesRoutes from "../routes/movies";
import searchRoutes from "../routes/search";
import tvShowsRoutes from "../routes/tvShows";

// CONFIGURATION
const app: Express = express();
dotenv.config();
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send("A-WATCH SERVER");
});
app.use("/api/movies", moviesRoutes);
app.use("/api/tvshows", tvShowsRoutes);
app.use("/api/search", searchRoutes);

// MONGOOSE SERVER
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URI || "").then(() => {
  app.listen(PORT, () =>
    console.log(`[server]: Server is running at http://localhost:${PORT}`),
  );
});
