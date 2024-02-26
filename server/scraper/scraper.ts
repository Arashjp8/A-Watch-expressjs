import axios from "axios";
import * as cheerio from "cheerio";
import {
  crewCssPath,
  overviewCssPath,
  releaseDateCssPath,
  titleCssPath,
  voteAverageCssPath,
} from "./config";
import { Crew } from "./types";

const organizeCrew = (crew: string) => {
  const crewArray = crew.split("\n").filter((item) => item.trim() !== "");
  const crewObj: Crew[] = [];

  for (let i = 0; i < crewArray.length; i += 2) {
    i + 1 < crewArray.length &&
      crewObj.push({
        name: crewArray[i].trim(),
        role: crewArray[i + 1].trim(),
      });
  }

  return crewObj;
};

const baseURL = "https://www.themoviedb.org";

try {
  axios.get(`${baseURL}/movie`).then(async (response) => {
    const $ = cheerio.load(response.data);
    const movies = [];

    $("div.page_wrapper div.card").each((i, el) => {
      const movieLink = $(el).find("div.image a").attr("href");

      axios
        .get(`${baseURL}${movieLink}`)
        .then(async (movieResponse) => {
          const movie$ = cheerio.load(movieResponse.data);

          const title = movie$(titleCssPath).text().trim();
          const releaseDate = movie$(releaseDateCssPath).text().trim();
          const voteAverage = movie$(voteAverageCssPath)
            .attr("data-percent")!
            .trim();
          const overview = movie$(overviewCssPath).text().trim();
          const crew = movie$(crewCssPath).text().trim();
          const imageSrc = movie$("img.poster").attr("src");

          console.log("\n=====================");
          console.log("\nTitle: " + title);
          console.log("\nVote Average: " + voteAverage);
          console.log("\nRelease Date: " + releaseDate);
          console.log("\nOverview: " + overview);

          console.log("\nCrew: ");
          console.log(organizeCrew(crew));

          console.log("\nImage source: " + imageSrc);
          console.log("=====================\n");
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
        });
    });
  });
} catch (error) {
  console.log(error);
}
