"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = exports.MovieSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// import { PersonSchema } from "./PersonModel";
const MovieSchema = new mongoose_1.default.Schema({
    id: String,
    title: String,
    voteAverage: Number,
    backdropPath: {
        type: String,
        default: "",
    },
    overview: String,
    posterPath: String,
    releaseDate: String,
    originalLanguage: String,
    genres: [String],
    cast: [{}],
    crew: [{}],
});
exports.MovieSchema = MovieSchema;
const MovieModel = mongoose_1.default.model("Movie", MovieSchema);
exports.MovieModel = MovieModel;
//# sourceMappingURL=MovieModel.js.map