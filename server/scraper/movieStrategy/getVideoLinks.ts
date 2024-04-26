import { axiosInstance } from "../config";
import * as cheerio from "cheerio";
import { Video } from "../interface";

export const getVideoLinks = async (movieLinks: string[]) => {
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
        const publishedAt = $(element).find("div.info.movie div h3").text();
        const type = navItem;

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

    console.log(`videos for ${movieLink}: `, videos);
  }
};
