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

  const personLinks = await scrapeDataUsingStrategy(
    scrapeMovieStrategy,
    movieLinks,
  );
  console.log(
    personLinks,
    "total number of links: ",
    personLinks.castLinks.length + personLinks.crewLinks.length,
  );
  await scrapeDataUsingStrategy(scrapeCastStrategy, personLinks);
})();
