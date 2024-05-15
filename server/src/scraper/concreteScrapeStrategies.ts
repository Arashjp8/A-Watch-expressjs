import { PersonLinksObject, ScrapeStrategy } from "./interface";
import { getMovieLinks } from "./pageStrategy/getMovieLinks";
import { getPersonLinks } from "./movieStrategy/getPersonLinks";
import { movieParser } from "./movieStrategy/movieParser";
import { getVideos } from "./movieStrategy/getVideos";
import { personParser } from "./personStrategy/personParser";
import { axiosInstance } from "./utils/axiosInstance";
import { delay, DELAY_TIME_IN_MS } from "./utils/delayService";
import { getIDFromLink } from "./config";
import { MovieModel } from "../models/MovieModel";

export const scrapePopularPageStrategy: ScrapeStrategy = {
  async scrape(pageLink: string): Promise<string[]> {
    return getMovieLinks(pageLink);
  },
};

export const scrapeMovieStrategy: ScrapeStrategy = {
  async scrape(movieLinks: string[]): Promise<PersonLinksObject> {
    const moviePageHtmlArray: any[] = [];

    for (const movieLink of movieLinks) {
      const movieID = getIDFromLink(movieLink);
      try {
        const existingMovie = await MovieModel.findOne({ _id: movieID });

        if (existingMovie) {
          console.log(`❌ movie ${movieID} already exists in database`);
        } else {
          const response = await axiosInstance.get(movieLink);
          moviePageHtmlArray.push(response.data);
        }
      } catch (error) {
        console.error(error);
      }

      await delay(DELAY_TIME_IN_MS);
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
