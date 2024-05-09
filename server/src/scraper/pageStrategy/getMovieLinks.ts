import * as cheerio from "cheerio";
import { axiosInstance } from "../utils/axiosInstance";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getMovieLinks = async (pageLink: string) => {
  const totalPages = 1;
  const delayPerRequest = 100;
  const movieLinks: string[] = [];

  for (let page = 1; page <= totalPages; page++) {
    try {
      await delay(delayPerRequest);

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
