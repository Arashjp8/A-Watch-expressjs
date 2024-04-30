"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concreteScrapeStrategies_1 = require("./concreteScrapeStrategies");
const scrapeDataUsingStrategy = async (strategy, data) => {
    return strategy.scrape(data);
};
const popularPageLink = `/movie`;
(async () => {
    const movieLinks = await scrapeDataUsingStrategy(concreteScrapeStrategies_1.scrapePopularPageStrategy, popularPageLink);
    console.log(movieLinks, "total number of links: ", movieLinks.length);
    const personLinks = await scrapeDataUsingStrategy(concreteScrapeStrategies_1.scrapeMovieStrategy, movieLinks);
    console.log(personLinks, "total number of person links: ", personLinks.castLinks.length + personLinks.crewLinks.length);
    await scrapeDataUsingStrategy(concreteScrapeStrategies_1.scrapePersonStrategy, personLinks);
})();
//# sourceMappingURL=context.js.map