import { PersonLinksObject, ScrapeStrategy } from "./interface";
import { getMovieLinks } from "./pageStrategy/getMovieLinks";
import { getPersonLinks } from "./movieStrategy/getPersonLinks";
import { movieParser } from "./movieStrategy/movieParser";

export const scrapePopularPageStrategy: ScrapeStrategy = {
  async scrape(pageLink: string): Promise<string[]> {
    return getMovieLinks(pageLink);
  },
};

export const scrapeMovieStrategy: ScrapeStrategy = {
  async scrape(movieLinks: string[]): Promise<PersonLinksObject> {
    await movieParser(movieLinks);
    return getPersonLinks(movieLinks);
  },
};

export const scrapePersonStrategy: ScrapeStrategy = {
  async scrape(personLinks: PersonLinksObject): Promise<any> {
    return Promise.resolve;
  },
};
