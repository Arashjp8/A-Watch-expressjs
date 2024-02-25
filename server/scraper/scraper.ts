import axios from "axios";
import cheerio from "cheerio";

const baseURL = "https://www.themoviedb.org/movie";

try {
  axios.get(baseURL).then((response) => {
    const $ = cheerio.load(response.data);
    const movies = [];

    $("div.page_wrapper div.card").each((i, el) => {
      const imageSrc = $(el).find("div.image a img").attr("src");
      const title = $(el).find("div.content h2 a").text();
      const releaseDate = $(el).find("div.content p").text();
      const voteAverage = $(el)
        .find("div.content div.consensus div.outer_ring div.user_score_chart")
        .attr("data-percent");

      console.log("\n=====================");
      console.log(title);
      console.log(voteAverage);
      console.log(releaseDate);
      console.log(imageSrc);
    });
  });
} catch (error) {
  console.log(error);
}
