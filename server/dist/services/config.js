"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trendingTvShowsAPIURL = exports.popularTVShowsAPIURL = exports.trendingMoviesAPIURL = exports.discoverMoviesAPIURL = exports.popularMovieAPIURL = exports.apiKey = exports.BaseUrl = void 0;
exports.BaseUrl = "https://api.themoviedb.org/3";
exports.apiKey = process.env.NODE_APP_API_KEY;
exports.popularMovieAPIURL = `${exports.BaseUrl}/movie/popular?api_key=${exports.apiKey}&language=en-US`;
exports.discoverMoviesAPIURL = `${exports.BaseUrl}/discover/movie?api_key=${exports.apiKey}&language=en-US`;
exports.trendingMoviesAPIURL = `${exports.BaseUrl}/trending/movie/day?api_key=${exports.apiKey}&language=en-US`;
exports.popularTVShowsAPIURL = `${exports.BaseUrl}/tv/popular?api_key=${exports.apiKey}&language=en-US`;
exports.trendingTvShowsAPIURL = `${exports.BaseUrl}/trending/tv/day?api_key=${exports.apiKey}&language=en-US`;
//# sourceMappingURL=config.js.map