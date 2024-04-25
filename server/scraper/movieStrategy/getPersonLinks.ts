import * as cheerio from "cheerio";
import { crewCssPath, instance } from "../config";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getPersonLinks = async (movieLinks: string[]) => {
  const castLinks: string[] = [];
  const crewLinks: string[] = [];
  const delayPerRequest = 100; // delay in milliseconds

  for (const movieLink of movieLinks) {
    await delay(delayPerRequest);

    console.log("scraping movie: ", movieLink);
    const response = await instance.get(movieLink);
    const $ = cheerio.load(response.data);

    $("ol.people.no_image").each((index, element) => {
      const link = $(element).find("li.profile a").attr("href");
      link ? crewLinks.push(link) : null;
    });

    $("ol.people.scroller").each((index, element) => {
      const link = $(element).find("li.card a").attr("href");
      link ? castLinks.push(link) : null;
    });
  }

  return { castLinks, crewLinks };
};
