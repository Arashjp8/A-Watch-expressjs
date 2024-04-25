import { ScrapeStrategy } from "./interface";

export const scrapePopularPageStrategy: ScrapeStrategy = {
  async scrape(pageLink: string): Promise<string[]> {
    const movieLinks: string[] = [];
    return movieLinks;
  },
};

export const scrapeMovieStrategy: ScrapeStrategy = {
  async scrape(movieLinks: string[]): Promise<string[]> {
    const castLinks: string[] = [];
    return castLinks;
  },
};

export const scrapeCastStrategy: ScrapeStrategy = {
  async scrape(castLinks: string[]): Promise<any> {
    return;
  },
};
