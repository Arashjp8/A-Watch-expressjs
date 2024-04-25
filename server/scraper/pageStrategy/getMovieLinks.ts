import * as cheerio from "cheerio";
import { instance } from "../config";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getMovieLinks = async (pageLink: string) => {
  const totalPages = 5;
  const delayBetweenPages = 100; // delay in milliseconds
  const movieLinks: string[] = [];

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
};
