import * as cheerio from "cheerio";
import {
  crewCssPath,
  genresCssPath,
  overviewCssPath,
  releaseDateCssPath,
  titleCssPath,
  voteAverageCssPath,
} from "../config";
import { parseDateAndLanguage } from "./dateAndLanguageUtil";
import { organizeCastAndCrew } from "./crewUtil";
import { parseGenres } from "./genresUtil";

export const parseMovie = (movie$: cheerio.CheerioAPI) => {
  const title = movie$(titleCssPath).text().trim();
  const { releaseDate, originalLanguage } = parseDateAndLanguage(
    movie$(releaseDateCssPath).text().trim(),
  );
  const voteAverage = parseInt(
    movie$(voteAverageCssPath).attr("data-percent")!.trim(),
  );
  const overview = movie$(overviewCssPath).text().trim();
  const crew = organizeCastAndCrew(movie$(crewCssPath).text().trim());
  const cast = organizeCastAndCrew(
    movie$(
      "body.en.v4 div.page_wrap.movie_wrap main#main.smaller.subtle section.inner_content.movie_content.backdrop.poster div#media_v4.media.movie_v4.header_large div.column_wrapper div.content_wrapper div div.white_column section.panel.top_billed.scroller div#cast_scroller.scroller_wrap.should_fade.is_fading ol.people.scroller",
    )
      .text()
      .trim(),
  );
  const genres = parseGenres(movie$(genresCssPath).text().trim());
  const posterPath = movie$("img.poster").attr("src");
  const backdropPath = movie$("img.backdrop").attr("src") || "";

  return {
    title,
    releaseDate,
    originalLanguage,
    voteAverage,
    overview,
    posterPath,
    backdropPath,
    crew,
    cast,
    genres,
  };
};
