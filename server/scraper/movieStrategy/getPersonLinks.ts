import * as cheerio from "cheerio";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getPersonLinks = async (moviePageHtmlArray: any[]) => {
  const castLinks: string[] = [];
  const crewLinks: string[] = [];

  for (const html of moviePageHtmlArray) {
    const delayPerRequest = 100; // delay in milliseconds

    await delay(delayPerRequest);

    const $ = cheerio.load(html);

    $("ol.people.no_image").each((_, element) => {
      const link = $(element).find("li.profile a").attr("href");
      link ? crewLinks.push(link) : null;
    });

    $("ol.people.scroller").each((_, element) => {
      const link = $(element).find("li.card a").attr("href");
      link ? castLinks.push(link) : null;
    });
  }

  return { castLinks, crewLinks };
};
