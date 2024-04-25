import * as cheerio from "cheerio";
import { axiosInstance } from "../config";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getMovieLinks = async (pageLink: string) => {
  const totalPages = 2;
  const delayPerRequest = 100; // delay in milliseconds
  const movieLinks: string[] = [];

  for (let page = 1; page <= totalPages; page++) {
    await delay(delayPerRequest);

    console.log(`Scraping page ${page} of ${totalPages}`);
    const response = await axiosInstance.get(`${pageLink}?page=${page}`);
    const $ = cheerio.load(response.data);

    $("div.card").each((_, element) => {
      const link = $(element).find("div.image a").attr("href");
      link ? movieLinks.push(link) : null;
    });
  }

  return movieLinks;
};
