"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapePersonStrategy = exports.scrapeMovieStrategy = exports.scrapePopularPageStrategy = void 0;
const getMovieLinks_1 = require("./pageStrategy/getMovieLinks");
const getPersonLinks_1 = require("./movieStrategy/getPersonLinks");
const config_1 = require("./config");
const personParser_1 = require("./personStrategy/personParser");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.scrapePopularPageStrategy = {
    async scrape(pageLink) {
        return (0, getMovieLinks_1.getMovieLinks)(pageLink);
    },
};
exports.scrapeMovieStrategy = {
    async scrape(movieLinks) {
        const delayPerRequest = 100; // delay in milliseconds
        const moviePageHtmlArray = [];
        for (const movieLink of movieLinks) {
            const response = await config_1.axiosInstance.get(movieLink);
            moviePageHtmlArray.push(response.data);
            await delay(delayPerRequest);
        }
        // await movieParser(moviePageHtmlArray, movieLinks);
        // await getVideos(movieLinks);
        return (0, getPersonLinks_1.getPersonLinks)(moviePageHtmlArray);
    },
};
exports.scrapePersonStrategy = {
    async scrape(personLinks) {
        await (0, personParser_1.personParser)(personLinks);
        return Promise.resolve;
    },
};
//# sourceMappingURL=concreteScrapeStrategies.js.map