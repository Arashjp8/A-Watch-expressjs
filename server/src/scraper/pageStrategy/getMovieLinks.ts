import * as cheerio from "cheerio";
import { axiosInstance } from "../utils/axiosInstance";
import { delay, DELAY_TIME_IN_MS } from "../utils/delayService";

export const getMovieLinks = async (pageLink: string) => {
  const totalPages = 1;
  const movieLinks: string[] = [];

  for (let page = 1; page <= totalPages; page++) {
    try {
      await delay(DELAY_TIME_IN_MS);

      console.log(`Scraping page ${page} of ${totalPages}`);

      const response = await axiosInstance.get(`${pageLink}?page=${page}`);

      const $ = cheerio.load(response.data);

      $("div.card").each((_, element) => {
        const link = $(element).find("div.image a").attr("href");
        if (link) {
          movieLinks.push(link);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return movieLinks;
};
