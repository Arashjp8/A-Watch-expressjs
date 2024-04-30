"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personParser = void 0;
const config_1 = require("../config");
const cheerio = __importStar(require("cheerio"));
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const personParser = async (personLinks) => {
    let people = [];
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
exports.personParser = personParser;
const shouldSkipScraping = (link) => {
    // Add conditions to check if the link matches the URLs you want to avoid
    return (link.includes("/person/119337-choi-dong-hoon") ||
        link.includes("/person/1293791-lee-ki-cheol") ||
        link.includes("/person/37939-yum-jeong-ah"));
};
const scrapeData = async (link) => {
    console.log("scraping ", link);
    const response = await config_1.axiosInstance.get(link);
    const $ = cheerio.load(response.data);
    const id = (0, config_1.getIDFromLink)(link);
    const name = $("div.title h2.title a").text();
    const biography = $("section.full_wrapper div.biography div.content div.text p").text();
    const knowForDepartment = $("section.facts p:contains(Known For)")
        .text()
        .replace("Known For ", "")
        .trim();
    const placeOfBirth = $("section.facts p:contains(Place of Birth)")
        .text()
        .replace("Place of Birth ", "")
        .trim();
    const gender = $("section.facts p:contains(Gender)")
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
const getFilmography = async (link, creditMediaType) => {
    let allFilmIDs = [];
    const response = await config_1.axiosInstance.get(`${link}?credit_media_type=${creditMediaType}`);
    const $ = cheerio.load(response.data);
    $("table.card.credits table.credit_group tr").each((_, element) => {
        const filmLink = $(element).find("a.tooltip").attr("href");
        const filmID = filmLink ? (0, config_1.getIDFromLink)(filmLink) : null;
        filmID ? allFilmIDs.push(filmID) : null;
    });
    return allFilmIDs;
};
//# sourceMappingURL=personParser.js.map