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
exports.getVideos = void 0;
const config_1 = require("../config");
const cheerio = __importStar(require("cheerio"));
const getVideos = async (movieLinks) => {
    const navItems = [
        "Trailers",
        "Teasers",
        "Clips",
        "Behind the Scenes",
        "Blooper",
        "Featurettes",
    ];
    for (const movieLink of movieLinks) {
        let videos = [];
        for (const navItem of navItems) {
            const response = await config_1.axiosInstance.get(`${movieLink}/videos?active_nav_item=${navItem}`);
            const $ = cheerio.load(response.data);
            $("section.panel.video").each((_, element) => {
                const id = $(element).find("div.video.card").attr("id");
                const name = $(element).find("div.video.card div a").attr("data-title");
                const key = $(element).find("div.video.card div a").attr("data-id");
                const site = $(element).find("div.video.card div a").attr("data-site");
                const publishedAt = getVideoPublishDate($(element).find("div.info.movie div h3").text());
                // removing 's' from the end of the navItem
                const type = navItem.slice(0, -1);
                if (id && name && key && site && publishedAt) {
                    const videoObj = {
                        id,
                        name,
                        key,
                        site,
                        publishedAt,
                        type,
                    };
                    videoObj ? videos.push(videoObj) : null;
                }
            });
        }
        // TODO - Add videos to database with movie ID
        console.log(`videos for ${movieLink}: `, videos);
    }
};
exports.getVideos = getVideos;
const getVideoPublishDate = (publishedAtRaw) => {
    if (!publishedAtRaw) {
        return "";
    }
    let publishedAt = publishedAtRaw.split(" • ")[2];
    // Check if the split result contains a comma
    if (publishedAt.includes(",")) {
        // If it does, extract only the part before the comma
        publishedAt = publishedAt.split(",")[0];
        // Check if there are two spaces between the month and the date
        if (publishedAt.includes("  ")) {
            // If there are two spaces, replace them with one space
            publishedAt = publishedAt.replace(/ {2}/g, " ");
        }
        // Check if the split result contains a year (four digits)
        const yearMatch = publishedAtRaw.match(/\d{4}/);
        if (yearMatch) {
            publishedAt += ` ${yearMatch[0]}`;
        }
    }
    return publishedAt;
};
//# sourceMappingURL=getVideos.js.map