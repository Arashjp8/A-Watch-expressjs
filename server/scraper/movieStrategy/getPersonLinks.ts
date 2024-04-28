import * as cheerio from "cheerio";
import { CheerioAPI } from "cheerio";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getPersonLinks = async (moviePageHtmlArray: any[]) => {
  let castLinks: string[] = [];
  let crewLinks: string[] = [];

  for (const html of moviePageHtmlArray) {
    const delayPerRequest = 100; // delay in milliseconds

    await delay(delayPerRequest);

    const $ = cheerio.load(html);

    castLinks = [...linkExtractor($, castLinks, "ol.people.scroller li.card")];
    crewLinks = [
      ...linkExtractor($, crewLinks, "ol.people.no_image li.profile"),
    ];
  }

  return { castLinks, crewLinks };
};

const linkExtractor = (
  $: CheerioAPI,
  linksArray: string[],
  selector: string,
): string[] => {
  $(selector).each((_, element) => {
    const link = $(element).find("a").attr("href");
    link ? linksArray.push(link) : null;
  });

  return linksArray;
};
