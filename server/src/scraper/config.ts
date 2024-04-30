import axios from "axios";

export const baseCssPath =
  "body.en.v4 div.page_wrap.movie_wrap main#main.smaller.subtle section.inner_content.movie_content.backdrop.poster div.header.large.border.first div.keyboard_s.custom_bg div.single_column section#original_header.images.inner div.header_poster_wrapper section.header.poster";
export const titleCssPath = `${baseCssPath} div.title h2 a`;
export const releaseDateCssPath = `${baseCssPath} div.title div.facts span.release`;
export const voteAverageCssPath = `div.user_score_chart`;
export const overviewCssPath = `${baseCssPath} div.header_info div.overview p`;
export const crewCssPath = `${baseCssPath} div.header_info ol.people.no_image li.profile`;
export const castCssPath =
  "body.en.v4 div.page_wrap.movie_wrap main#main.smaller.subtle section.inner_content.movie_content.backdrop.poster div#media_v4.media.movie_v4.header_large div.column_wrapper div.content_wrapper div div.white_column section.panel.top_billed.scroller div#cast_scroller.scroller_wrap.should_fade.is_fading ol.people.scroller";
export const genresCssPath = `${baseCssPath} div.title div.facts span.genres`;

export const axiosInstance = axios.create({
  baseURL: "https://www.themoviedb.org",
  headers: {
    "Accept-Language": "en-US,en;q=0.9",
    Cookie: process.env.TMDB_COOKIE,
  },
});

export const getIDFromLink = (movieLink: string): string => {
  const parts = movieLink.split("/");
  return parts[parts.length - 1];
};
