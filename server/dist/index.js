"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const moviesRoutes_1 = __importDefault(require("./routes/moviesRoutes"));
const searchRoutes_1 = __importDefault(require("./routes/searchRoutes"));
const tvShowsRoutes_1 = __importDefault(require("./routes/tvShowsRoutes"));
console.clear();
// process.stdout.clearScreenDown();
// CONFIGURATION
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("common"));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
// TODO - Create a MongoDB collection for each type of data
// TODO - Make a MongoDB Request to get the data from the collection
// TODO - Send the data to the client
// ROUTES
app.get("/", (req, res) => {
    res.send("A-WATCH SERVER");
});
app.use("/api/movie", moviesRoutes_1.default);
app.use("/api/tvshow", tvShowsRoutes_1.default);
app.use("/api/search", searchRoutes_1.default);
// MONGOOSE SERVER
const PORT = process.env.PORT || 6001;
// Attention - Hybrid MongoDB Atlas Cluster
mongoose_1.default.connect(process.env.MONGO_LOCAL_URI || "").then(() => {
    console.log(`[server]: Connected to MongoDB Atlas on ${process.env.MONGO_LOCAL_URI}`);
    app.listen(PORT, () => console.log(`[server]: Server is running at http://localhost:${PORT}`));
});
//# sourceMappingURL=index.js.map