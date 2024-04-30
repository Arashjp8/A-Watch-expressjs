"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tvShowsController_1 = require("../controllers/tvShowsController");
const moviesController_1 = require("../controllers/moviesController");
const router = express_1.default.Router();
router.get("/", tvShowsController_1.getTrendingTvShows);
router.get("/popular", moviesController_1.getPopularMovies);
router.get("/:id", tvShowsController_1.getTvShowById);
exports.default = router;
//# sourceMappingURL=tvShowsRoutes.js.map