"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFetchRequest = exports.fetchFromTMDB = exports.apiUrlGenerator = void 0;
const axios_1 = __importDefault(require("axios"));
const apiUrlGenerator = (url) => {
    const apiKey = process.env.NODE_APP_API_KEY;
    const BaseUrl = "https://api.themoviedb.org/3";
    return `${BaseUrl}${url}?api_key=${apiKey}&language=en-US`;
};
exports.apiUrlGenerator = apiUrlGenerator;
const fetchFromTMDB = async (url) => {
    try {
        const response = await axios_1.default.get((0, exports.apiUrlGenerator)(url));
        return response.data.results;
    }
    catch (error) {
        console.log("Error while fetching movies", error);
    }
};
exports.fetchFromTMDB = fetchFromTMDB;
const handleFetchRequest = async (url, res) => {
    try {
        const fetchedMovies = await (0, exports.fetchFromTMDB)(url);
        res.status(200).send(fetchedMovies);
    }
    catch (error) {
        console.log("Error while fetching movies", error);
        res.status(500).send(error);
    }
};
exports.handleFetchRequest = handleFetchRequest;
//# sourceMappingURL=apiUrl.js.map