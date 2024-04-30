import { PersonLinksObject } from "../interface";
import { axiosInstance, getIDFromLink } from "../config";
import * as cheerio from "cheerio";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const personParser = async (personLinks: PersonLinksObject) => {
  let people: any[] = [];
  const delayPerRequest = 50; // delay in milliseconds

  for (const crewLink of personLinks.crewLinks) {
    await delay(delayPerRequest);
    if (!shouldSkipScraping(crewLink)) {
      people.push(await scrapeData(crewLink));
    }
  }
  for (const castLink of personLinks.castLinks) {
    await delay(delayPerRequest);
    if (!shouldSkipScraping(castLink)) {
      people.push(await scrapeData(castLink));
    }
  }
  console.log("scraped people", people);
  console.log(`${people.length} people found`);
};

const shouldSkipScraping = (link: string) => {
  // Add conditions to check if the link matches the URLs you want to avoid
  return (
    link.includes("/person/119337-choi-dong-hoon") ||
    link.includes("/person/1293791-lee-ki-cheol") ||
    link.includes("/person/37939-yum-jeong-ah")
  );
};

const scrapeData = async (link: string) => {
  console.log("scraping ", link);

  const response = await axiosInstance.get(link);
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

  const movieIDs = await getFilmography(link, "movie");
  const tvShowIDs = await getFilmography(link, "tv");

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
};

const getFilmography = async (link: string, creditMediaType: string) => {
  let allFilmIDs: string[] = [];

  const response = await axiosInstance.get(
    `${link}?credit_media_type=${creditMediaType}`,
  );
  const $ = cheerio.load(response.data);

  $("table.card.credits table.credit_group tr").each((_, element) => {
    const filmLink = $(element).find("a.tooltip").attr("href");
    const filmID = filmLink ? getIDFromLink(filmLink) : null;
    filmID ? allFilmIDs.push(filmID) : null;
  });

  return allFilmIDs;
};
