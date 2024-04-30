"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieParser = void 0;
const config_1 = require("../config");
const cheerio = __importStar(require("cheerio"));
const dateAndLanguageUtil_1 = require("../utils/dateAndLanguageUtil");
const crewUtil_1 = require("../utils/crewUtil");
const genresUtil_1 = require("../utils/genresUtil");
const movieParser = async (moviePageHtmlArray, movieLinks) => {
    for (let i = 0; i < moviePageHtmlArray.length; i++) {
        const $ = cheerio.load(moviePageHtmlArray[i]);
        const title = $(config_1.titleCssPath).text().trim();
        const { releaseDate, originalLanguage } = (0, dateAndLanguageUtil_1.parseDateAndLanguage)($(config_1.releaseDateCssPath).text().trim());
        const voteAverageString = $(config_1.voteAverageCssPath).attr("data-percent");
        const voteAverage = voteAverageString
            ? parseInt(voteAverageString.trim())
            : 0;
        const overview = $(config_1.overviewCssPath).text().trim();
        const crew = (0, crewUtil_1.organizePeople)($, "crew");
        const cast = (0, crewUtil_1.organizePeople)($, "cast");
        const genres = (0, genresUtil_1.parseGenres)($(config_1.genresCssPath).text().trim());
        const posterPath = $("img.poster").attr("src");
        const backdropPath = $("img.backdrop").attr("src") || "";
        const movieID = (0, config_1.getIDFromLink)(movieLinks[i]);
        const movieObject = {
            movieID,
            title,
            releaseDate,
            originalLanguage,
            voteAverage,
            overview,
            crew,
            cast,
            genres,
            posterPath,
            backdropPath,
        };
        // TODO - Add movie to database
        console.log(`movie ${movieID} info: `, movieObject);
    }
};
exports.movieParser = movieParser;
//# sourceMappingURL=movieParser.js.map