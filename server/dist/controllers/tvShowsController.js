"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTvShowById = exports.getPopularTvShows = exports.getTrendingTvShows = void 0;
const apiUrl_1 = require("../services/apiUrl");
const getTrendingTvShows = async (req, res) => {
    await (0, apiUrl_1.handleFetchRequest)("/trending/tv/day", res);
};
exports.getTrendingTvShows = getTrendingTvShows;
const getPopularTvShows = async (req, res) => {
    await (0, apiUrl_1.handleFetchRequest)("/tv/popular", res);
};
exports.getPopularTvShows = getPopularTvShows;
const getTvShowById = (req, res) => {
    // const desiredTvShow = tvShows.find(
    //   (tvShow) => tvShow.id === parseInt(req.params.id),
    // );
    //
    // desiredTvShow
    //   ? res.status(200).send(desiredTvShow)
    //   : res.status(404).send(JSON.stringify({ message: "Movie not found" }));
};
exports.getTvShowById = getTvShowById;
//# sourceMappingURL=tvShowsController.js.map