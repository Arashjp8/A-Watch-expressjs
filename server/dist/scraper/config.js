"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIDFromLink = exports.axiosInstance = exports.genresCssPath = exports.castCssPath = exports.crewCssPath = exports.overviewCssPath = exports.voteAverageCssPath = exports.releaseDateCssPath = exports.titleCssPath = exports.baseCssPath = void 0;
const axios_1 = __importDefault(require("axios"));
exports.baseCssPath = "body.en.v4 div.page_wrap.movie_wrap main#main.smaller.subtle section.inner_content.movie_content.backdrop.poster div.header.large.border.first div.keyboard_s.custom_bg div.single_column section#original_header.images.inner div.header_poster_wrapper section.header.poster";
exports.titleCssPath = `${exports.baseCssPath} div.title h2 a`;
exports.releaseDateCssPath = `${exports.baseCssPath} div.title div.facts span.release`;
exports.voteAverageCssPath = `div.user_score_chart`;
exports.overviewCssPath = `${exports.baseCssPath} div.header_info div.overview p`;
exports.crewCssPath = `${exports.baseCssPath} div.header_info ol.people.no_image li.profile`;
exports.castCssPath = "body.en.v4 div.page_wrap.movie_wrap main#main.smaller.subtle section.inner_content.movie_content.backdrop.poster div#media_v4.media.movie_v4.header_large div.column_wrapper div.content_wrapper div div.white_column section.panel.top_billed.scroller div#cast_scroller.scroller_wrap.should_fade.is_fading ol.people.scroller";
exports.genresCssPath = `${exports.baseCssPath} div.title div.facts span.genres`;
exports.axiosInstance = axios_1.default.create({
    baseURL: "https://www.themoviedb.org",
    headers: {
        "Accept-Language": "en-US,en;q=0.9",
        Cookie: process.env.TMDB_COOKIE,
    },
});
const getIDFromLink = (movieLink) => {
    const parts = movieLink.split("/");
    return parts[parts.length - 1];
};
exports.getIDFromLink = getIDFromLink;
//# sourceMappingURL=config.js.map