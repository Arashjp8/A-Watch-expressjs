import { ScrapeStrategy } from "./interface";
import {
  scrapeCastStrategy,
  scrapeMovieStrategy,
  scrapePopularPageStrategy,
} from "./concreteScrapeStrategies";

const scrapeDataUsingStrategy = async (
  strategy: ScrapeStrategy,
  data?: any,
): Promise<any> => {
  return strategy.scrape(data);
};

(async () => {
  const movieLinks: string[] = await scrapeDataUsingStrategy(
    scrapePopularPageStrategy,
  );
  const castLinks: string[] = await scrapeDataUsingStrategy(
    scrapeMovieStrategy,
    movieLinks,
  );
  await scrapeDataUsingStrategy(scrapeCastStrategy, castLinks);
})();
