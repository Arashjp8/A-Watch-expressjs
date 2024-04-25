import { ScrapeStrategy } from "./interface";
import {
  scrapeCastStrategy,
  scrapeMovieStrategy,
  scrapePopularPageStrategy,
} from "./concreteScrapeStrategies";

const scrapeDataUsingStrategy = async (
  strategy: ScrapeStrategy,
  data: string[] | string,
): Promise<any> => {
  return strategy.scrape(data);
};

const popularPageLink = `/movie`;

(async () => {
  const movieLinks: string[] = await scrapeDataUsingStrategy(
    scrapePopularPageStrategy,
    popularPageLink,
  );
  console.log(movieLinks, "total number of links: ", movieLinks.length);
  const castLinks: string[] = await scrapeDataUsingStrategy(
    scrapeMovieStrategy,
    movieLinks,
  );
  await scrapeDataUsingStrategy(scrapeCastStrategy, castLinks);
})();
