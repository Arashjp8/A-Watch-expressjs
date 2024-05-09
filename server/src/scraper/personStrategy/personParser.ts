import { PersonLinksObject } from "../interface";
import { getIDFromLink } from "../config";
import * as cheerio from "cheerio";
import { axiosInstance } from "../utils/axiosInstance";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const personParser = async (personLinks: PersonLinksObject) => {
  let people: any[] = [];
  const delayPerRequest = 50; // delay in milliseconds

  for (const crewLink of personLinks.crewLinks) {
    await delay(delayPerRequest);
    people.push(await scrapeData(crewLink));
  }
  for (const castLink of personLinks.castLinks) {
    await delay(delayPerRequest);
    people.push(await scrapeData(castLink));
  }
  console.log("scraped people", people);
  console.log(`${people.length} people found`);
};

const scrapeData = async (link: string) => {
  console.log("scraping ", link);

  return axiosInstance
    .get(link)
    .then(async (response) => {
      const $ = cheerio.load(response.data);

      const id = getIDFromLink(link);
      const name = $("div.title h2.title a").text();
      const biography = $(
        "section.full_wrapper div.biography div.content div.text p",
      ).text();
      const knowForDepartment = $("section.facts p:contains(Known For)")
        .text()
        .replace("Known For ", "")
        .trim();
      const placeOfBirth = $("section.facts p:contains(Place of Birth)")
        .text()
        .replace("Place of Birth ", "")
        .trim();
      const gender =
        $("section.facts p:contains(Gender)")
          .text()
          .replace("Gender ", "")
          .trim()
          .toUpperCase() === "FEMALE"
          ? 1
          : 2;
      const birthday = $("section.facts p:contains(Birthday)")
        .text()
        .replace("\n", "")
        .trim()
        .replace("Birthday\n", "")
        .trim()
        .replace(/ \(.*?\)/, "")
        .trim();
      const profilePath = $("section.images.inner div div img").attr("src");

      const getFilmographyPromises = [
        await getFilmography(link, "movie"),
        await getFilmography(link, "tv"),
      ];

      return Promise.all(getFilmographyPromises).then(
        ([movieIDs, tvShowIDs]) => {
          return {
            id,
            name,
            biography,
            gender,
            birthday,
            knowForDepartment,
            placeOfBirth,
            profilePath,
            movieIDs,
            tvShowIDs,
          };
        },
      );
    })
    .catch((error) => {
      console.error(`Error scraping ${link}: ${error.message}`);
      throw error;
    });
};

const getFilmography = async (
  link: string,
  creditMediaType: string,
): Promise<string[]> => {
  console.log("Getting filmography for:", link);

  return axiosInstance
    .get(`${link}?credit_media_type=${creditMediaType}`)
    .then((response) => {
      const $ = cheerio.load(response.data);
      let allFilmIDs: string[] = [];

      $("table.card.credits table.credit_group tr").each((_, element) => {
        const filmLink = $(element).find("a.tooltip").attr("href");
        const filmID = filmLink ? getIDFromLink(filmLink) : null;
        filmID ? allFilmIDs.push(filmID) : null;
      });

      return allFilmIDs;
    })
    .catch((error) => {
      console.error(`Error getting filmography for ${link}: ${error.message}`);
      throw error;
    });
};
