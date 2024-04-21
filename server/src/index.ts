import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import moviesRoutes from "../routes/moviesRoutes";
import searchRoutes from "../routes/searchRoutes";
import tvShowsRoutes from "../routes/tvShowsRoutes";

console.clear();
// process.stdout.clearScreenDown();

// CONFIGURATION
dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// TODO - Create a MongoDB collection for each type of data
// TODO - Make a MongoDB Request to get the data from the collection
// TODO - Send the data to the client

// ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send("A-WATCH SERVER");
});
app.use("/api/movie", moviesRoutes);
app.use("/api/tvshow", tvShowsRoutes);
app.use("/api/search", searchRoutes);

// MONGOOSE SERVER
const PORT = process.env.PORT || 6001;
// Attention - Hybrid MongoDB Atlas Cluster
mongoose.connect(process.env.MONGO_LOCAL_URI || "").then(() => {
  console.log(
    `[server]: Connected to MongoDB Atlas on ${process.env.MONGO_LOCAL_URI}`,
  );
  app.listen(PORT, () =>
    console.log(`[server]: Server is running at http://localhost:${PORT}`),
  );
});
