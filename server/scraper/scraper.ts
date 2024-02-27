import axios from "axios";
import * as cheerio from "cheerio";
import {
  crewCssPath,
  genresCssPath,
  overviewCssPath,
  releaseDateCssPath,
  titleCssPath,
  voteAverageCssPath,
} from "./config";
import { organizeCastAndCrew } from "../utils/crewUtils";
import { parseGenres } from "../utils/genresUtils";
import { parseDateAndLanguage } from "../utils/dateAndLanguageUtils";

const instance = axios.create({ baseURL: "https://www.themoviedb.org" });

try {
  instance.get("/movie").then(async (response) => {
    const $ = cheerio.load(response.data);
    const movies = [];

    $("div.page_wrapper div.card").each((i, el) => {
      const movieLink = $(el).find("div.image a").attr("href");

      instance
        .get(`${movieLink}`)
        .then(async (movieResponse) => {
          const movie$ = cheerio.load(movieResponse.data);

          const title = movie$(titleCssPath).text().trim();

          const { releaseDate, originalLanguage } = parseDateAndLanguage(
            movie$(releaseDateCssPath).text().trim(),
          );

          const voteAverage = movie$(voteAverageCssPath)
            .attr("data-percent")!
            .trim();
          const overview = movie$(overviewCssPath).text().trim();
          const crew = movie$(crewCssPath).text().trim();
          const cast = movie$(
            "body.en.v4 div.page_wrap.movie_wrap main#main.smaller.subtle section.inner_content.movie_content.backdrop.poster div#media_v4.media.movie_v4.header_large div.column_wrapper div.content_wrapper div div.white_column section.panel.top_billed.scroller div#cast_scroller.scroller_wrap.should_fade.is_fading ol.people.scroller",
          )
            .text()
            .trim();
          const genres = movie$(genresCssPath).text().trim();
          const posterPath = movie$("img.poster").attr("src");
          const backdrop = movie$("img.backdrop").attr("src");

          console.log("\n=====================");
          console.log("\nTitle: " + title);
          console.log("\nVote Average: " + voteAverage);
          console.log("\nOverview: " + overview);

          console.log("\nPoster path: " + posterPath);
          console.log("\nBackdrops: " + backdrop);

          console.log("\nGenre: ");
          console.log(parseGenres(genres));

          console.log("\nRelease Date: " + releaseDate);
          console.log("\noriginal Language: " + originalLanguage);

          console.log("\nCrew: ");
          console.log(organizeCastAndCrew(crew));

          console.log("\nCast: ");
          console.log(organizeCastAndCrew(cast));

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
