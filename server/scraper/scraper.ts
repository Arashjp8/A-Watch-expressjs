import axios from "axios";
import * as cheerio from "cheerio";

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

          const baseCssPath =
            "body.en.v4 div.page_wrap.movie_wrap main#main.smaller.subtle section.inner_content.movie_content.backdrop.poster div.header.large.border.first div.keyboard_s.custom_bg div.single_column section#original_header.images.inner div.header_poster_wrapper section.header.poster";
          const titleCssPath = `${baseCssPath} div.title h2 a`;
          const releaseDateCssPath = `${baseCssPath} div.title div.facts span.release`;
          const voteAverageCssPath = `${baseCssPath} ul.auto.actions li.chart div.consensus.details div.outer_ring div.user_score_chart`;
          const overviewCssPath = `${baseCssPath} div.header_info div.overview p`;

          const title = movie$(titleCssPath).text().trim();
          const releaseDate = movie$(releaseDateCssPath).text().trim();
          const voteAverage = movie$(voteAverageCssPath)
            .attr("data-percent")!
            .trim();
          const overview = movie$(overviewCssPath).text().trim();
          const imageSrc = movie$("img.poster").attr("src");

          console.log("\n=====================");
          console.log("\nTitle: " + title);
          console.log("\nVote Average: " + voteAverage);
          console.log("\nRelease Date: " + releaseDate);
          console.log("\nOverview: " + overview);
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
