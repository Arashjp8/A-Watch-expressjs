"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieCredits = exports.getMovieById = exports.getPopularMovies = exports.getTrendingMovies = void 0;
const apiUrl_1 = require("../services/apiUrl");
// TODO - maybe a web scarper to get the data from TMDB
//  or an interval to fetch the data from TMDB weekly
const storeMoviesInMongoDB = async () => { };
const getTrendingMovies = async (req, res) => {
    await (0, apiUrl_1.handleFetchRequest)("/trending/movie/day", res);
};
exports.getTrendingMovies = getTrendingMovies;
const getPopularMovies = async (req, res) => {
    await (0, apiUrl_1.handleFetchRequest)("/movie/popular", res);
};
exports.getPopularMovies = getPopularMovies;
const getMovieById = (req, res) => {
    // const desiredMovie = movies.find(
    //   (movie) => movie.id === parseInt(req.params.id),
    // );
    //
    // desiredMovie
    //   ? res.status(200).send(desiredMovie)
    //   : res.status(404).send(JSON.stringify({ message: "Movie not found" }));
};
exports.getMovieById = getMovieById;
const getMovieCredits = (req, res) => {
    // res.status(200).send(credits);
};
exports.getMovieCredits = getMovieCredits;
//# sourceMappingURL=moviesController.js.map