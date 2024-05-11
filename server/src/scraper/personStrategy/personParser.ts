import { PersonLinksObject } from "../interface";
import { getIDFromLink } from "../config";
import * as cheerio from "cheerio";
import { axiosInstance } from "../utils/axiosInstance";
import { delay, DELAY_TIME_IN_MS } from "../utils/delayService";
import { PersonModel } from "../../models/PersonModel";

export const personParser = async (
  personLinks: PersonLinksObject,
): Promise<void> => {
  let counter = 0;

  counter += await handlePersonDataFromLinks(personLinks.crewLinks);
  counter += await handlePersonDataFromLinks(personLinks.castLinks);

  console.log("👤 personParser finished scraping ", counter, " people \n");
};

const handlePersonDataFromLinks = async (links: string[]): Promise<number> => {
  let counter = 0;
  console.log("handlePersonDataFromLinks: ", links);
  for (let link of links) {
    await delay(DELAY_TIME_IN_MS);
    console.log("link: ", link);
    const id = getIDFromLink(link);
    console.log("id: ", id);
    const personExistInDB = await checkPersonExist(id);
    console.log("personExistInDB: ", personExistInDB);

    switch (personExistInDB) {
      case false:
        const personData = await scrapeData(link);
        console.log("personData: ", personData);
        await savePersonToDB(id, personData);
        break;
      default:
        console.log(`❌ Person with id ${id} already exists in DB \n`);
        break;
    }
    counter++;
  }
  return counter;
};

const scrapeData = async (link: string) => {
  console.log("scraping ", link);

  return axiosInstance
    .get(link)
    .then(async (response) => {
      const $ = cheerio.load(response.data);

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
      console.log(`Error status code: ${error.response.status}`);
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
      console.log(`Error status code: ${error.response.status}`);

      throw error;
    });
};

const savePersonToDB = async (id: string, personData: any): Promise<void> => {
  const newPerson = new PersonModel(personData);
  newPerson._id = id;
  await newPerson.save();
  console.log(`✅ Person with id ${id} saved to DB \n`);
};

const checkPersonExist = async (id: string): Promise<boolean> => {
  const existingPerson = await PersonModel.findOne({ _id: id });

  // return true if person exist in DB and false if not
  return !!existingPerson;
};
