"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TvShowModel = exports.TvShowSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TvShowSchema = new mongoose_1.default.Schema({
    backdrop_path: String,
    first_air_date: String,
    genre_ids: [Number],
    id: Number,
    name: String,
    origin_country: [String],
    original_language: String,
    original_name: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    vote_average: Number,
    vote_count: Number,
});
exports.TvShowSchema = TvShowSchema;
const TvShowModel = mongoose_1.default.model("TvShow", TvShowSchema);
exports.TvShowModel = TvShowModel;
//# sourceMappingURL=TvShowModel.js.map