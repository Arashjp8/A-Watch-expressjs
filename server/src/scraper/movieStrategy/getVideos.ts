import { axiosInstance } from "../config";
import * as cheerio from "cheerio";
import { Video } from "../interface";

export const getVideos = async (movieLinks: string[]) => {
  const navItems = [
    "Trailers",
    "Teasers",
    "Clips",
    "Behind the Scenes",
    "Blooper",
    "Featurettes",
  ];

  for (const movieLink of movieLinks) {
    let videos: Video[] = [];

    for (const navItem of navItems) {
      const response = await axiosInstance.get(
        `${movieLink}/videos?active_nav_item=${navItem}`,
      );
      const $ = cheerio.load(response.data);
      $("section.panel.video").each((_, element) => {
        const id = $(element).find("div.video.card").attr("id");
        const name = $(element).find("div.video.card div a").attr("data-title");
        const key = $(element).find("div.video.card div a").attr("data-id");
        const site = $(element).find("div.video.card div a").attr("data-site");
        const publishedAt = getVideoPublishDate(
          $(element).find("div.info.movie div h3").text(),
        );
        // removing 's' from the end of the navItem
        const type = navItem.slice(0, -1);

        if (id && name && key && site && publishedAt) {
          const videoObj = {
            id,
            name,
            key,
            site,
            publishedAt,
            type,
          };

          videoObj ? videos.push(videoObj) : null;
        }
      });
    }

    // TODO - Add videos to database with movie ID

    console.log(`videos for ${movieLink}: `, videos);
  }
};

const getVideoPublishDate = (publishedAtRaw: string | undefined): string => {
  if (!publishedAtRaw) {
    return "";
  }

  let publishedAt = publishedAtRaw.split(" • ")[2];

  // Check if the split result contains a comma
  if (publishedAt.includes(",")) {
    // If it does, extract only the part before the comma
    publishedAt = publishedAt.split(",")[0];

    // Check if there are two spaces between the month and the date
    if (publishedAt.includes("  ")) {
      // If there are two spaces, replace them with one space
      publishedAt = publishedAt.replace(/ {2}/g, " ");
    }

    // Check if the split result contains a year (four digits)
    const yearMatch = publishedAtRaw.match(/\d{4}/);
    if (yearMatch) {
      publishedAt += ` ${yearMatch[0]}`;
    }
  }
  return publishedAt;
};
