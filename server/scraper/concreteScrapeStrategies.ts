import { ScrapeStrategy } from "./interface";
import axios from "axios";
import * as cheerio from "cheerio";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const scrapePopularPageStrategy: ScrapeStrategy = {
  async scrape(pageLink: string): Promise<string[]> {
    const totalPages = 10;
    const delayBetweenPages = 100; // delay in milliseconds
    const movieLinks: string[] = [];

    const instance = axios.create({
      baseURL: "https://www.themoviedb.org",
      headers: {
        "Accept-Language": "en-US,en;q=0.9",
        Cookie: process.env.TMDB_COOKIE,
      },
    });

    for (let page = 1; page <= totalPages; page++) {
      await delay(delayBetweenPages);

      console.log(`Scraping page ${page} of ${totalPages}`);
      const response = await instance.get(`${pageLink}?page=${page}`);
      const $ = cheerio.load(response.data);

      $("div.card").each((i, el) => {
        const link = $(el).find("div.image a").attr("href");
        if (link) movieLinks.push(link);
      });
    }

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
    return Promise.resolve;
  },
};
