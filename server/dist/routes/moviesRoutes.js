"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesController_1 = require("../controllers/moviesController");
const router = express_1.default.Router();
router.get("/", moviesController_1.getTrendingMovies);
router.get("/popular", moviesController_1.getPopularMovies);
router.get("/:id", moviesController_1.getMovieById);
router.get("/:id/credits", moviesController_1.getMovieCredits);
exports.default = router;
//# sourceMappingURL=moviesRoutes.js.map