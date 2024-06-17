import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import moviesRoutes from "./routes/moviesRoutes";
import searchRoutes from "./routes/searchRoutes";
import tvShowsRoutes from "./routes/tvShowsRoutes";
import apiKeyRoutes from "./routes/apiKeyRoutes";
import { scrapeScheduler } from "./scraper/schedular";
import https from "https";
import fs from "fs";
import path from "path";

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

// ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send("A-WATCH SERVER");
});
app.use("/api/movie", moviesRoutes);
app.use("/api/tvshow", tvShowsRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/key", apiKeyRoutes);

// MONGOOSE SERVER
const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URI || "").then(async () => {
  console.log(
    `[server]: Connected to MongoDB Atlas on ${process.env.MONGO_URI}`,
  );

  await startServer();
});

// CREATING HTTPS SERVER
const options = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./localhost.pem")),
};

const httpsServer = https.createServer(options, app);

const startServer = async () => {
  //await scrapeScheduler();

  httpsServer.listen(PORT, () =>
    console.log(`[server]: Server is running at https://localhost:${PORT}`),
  );
};
