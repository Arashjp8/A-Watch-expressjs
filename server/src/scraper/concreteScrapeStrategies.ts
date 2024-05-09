import { PersonLinksObject, ScrapeStrategy } from "./interface";
import { getMovieLinks } from "./pageStrategy/getMovieLinks";
import { getPersonLinks } from "./movieStrategy/getPersonLinks";
import { movieParser } from "./movieStrategy/movieParser";
import { getVideos } from "./movieStrategy/getVideos";
import { personParser } from "./personStrategy/personParser";
import { axiosInstance } from "./utils/axiosInstance";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const scrapePopularPageStrategy: ScrapeStrategy = {
  async scrape(pageLink: string): Promise<string[]> {
    return getMovieLinks(pageLink);
  },
};

export const scrapeMovieStrategy: ScrapeStrategy = {
  async scrape(movieLinks: string[]): Promise<PersonLinksObject> {
    const delayPerRequest = 100;

    const moviePageHtmlArray: any[] = [];

    for (const movieLink of movieLinks) {
      try {
        const response = await axiosInstance.get(movieLink);
        moviePageHtmlArray.push(response.data);
      } catch (error) {
        console.error(error);
      }

      await delay(delayPerRequest);
    }

    try {
      await movieParser(moviePageHtmlArray, movieLinks);
      await getVideos(movieLinks);
      return getPersonLinks(moviePageHtmlArray);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export const scrapePersonStrategy: ScrapeStrategy = {
  async scrape(personLinks: PersonLinksObject): Promise<any> {
    await personParser(personLinks);
    return Promise.resolve;
  },
};
