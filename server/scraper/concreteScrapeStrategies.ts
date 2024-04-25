import { ScrapeStrategy } from "./interface";
import axios from "axios";
import * as cheerio from "cheerio";
import { getMovieLinks } from "./pageStrategy/getMovieLinks";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const scrapePopularPageStrategy: ScrapeStrategy = {
  async scrape(pageLink: string): Promise<string[]> {
    return getMovieLinks(pageLink);
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
    return Promise.resolve;
  },
};
