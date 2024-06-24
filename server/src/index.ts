import express, { Express, Request, Response } from "express";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import moviesRoutes from "./routes/moviesRoutes";
import searchRoutes from "./routes/searchRoutes";
import tvShowsRoutes from "./routes/tvShowsRoutes";
import authRoutes from "./routes/authRoutes";
import { scrapeScheduler } from "./scraper/schedular";

console.clear();

// CONFIGURATION
dotenv.config();
const app: Express = express();

const sessionSecret: string = process.env.SESSION_SECRET!;

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    // WARNING: change it to true for deployment
    cookie: {
      secure: true,
    },
  }),
);

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
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 6001;
const HOST = "0.0.0.0";

// MONGOOSE SERVER
mongoose.connect(process.env.MONGO_URI || "").then(async () => {
  console.log(
    `[server]: Connected to MongoDB Atlas on ${process.env.MONGO_URI}`,
  );

  await startServer();
});

const startServer = async () => {
  //await scrapeScheduler();

  app.listen(PORT, () =>
    console.log(`[server]: Server is running at https://${HOST}:${PORT}`),
  );
};
