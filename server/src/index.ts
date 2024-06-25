import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import moviesRoutes from "./routes/moviesRoutes";
import searchRoutes from "./routes/searchRoutes";
import userRoutes from "./routes/userRoutes";
import { scrapeScheduler } from "./scraper/schedular";

console.clear();

// CONFIGURATION
dotenv.config();
const app: Express = express();

// MIDDLEWARE

const corsOptions = {
  origin: "http://localhost:5173", // Set your client URL here
  credentials: true, // Allow credentials
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed methods
  allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
};

app.use(cors(corsOptions));
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());

// ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send("A-WATCH SERVER");
});
app.use("/api/movie", moviesRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/user", userRoutes);

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
