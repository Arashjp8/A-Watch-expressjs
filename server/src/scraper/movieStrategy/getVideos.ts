import * as cheerio from "cheerio";
import { Video } from "../interface";
import { VideoDocument, VideoModel } from "../../models/VideoModel";
import { axiosInstance } from "../utils/axiosInstance";
import { getIDFromLink } from "../config";

export const getVideos = async (movieLinks: string[]): Promise<void> => {
  for (const movieLink of movieLinks) {
    const videos: Video[] = await scrapeVideoPage(movieLink);

    // Add videos to database if they don't exist
    const movieID = getIDFromLink(movieLink);
    const existingVideos = await checkVideosExist(movieID);

    console.log("existingVideos: ", existingVideos);

    switch (existingVideos) {
      case false:
        await saveVideosToDB(movieID, videos);
        break;
      default:
        console.log("❌ Videos already stored in DB for movie: ", movieID);
        break;
    }
  }
};

const scrapeVideoPage = async (movieLink: string): Promise<Video[]> => {
  const navItems = [
    "Trailers",
    "Teasers",
    "Clips",
    "Behind the Scenes",
    "Blooper",
    "Featurettes",
  ];

  let videos: Video[] = [];

  for (const navItem of navItems) {
    const response = await axiosInstance.get(
      `${movieLink}/videos?active_nav_item=${navItem}`,
    );
    const $ = cheerio.load(response.data);
    $("section.panel.video").each((_, element) => {
      const videoID = $(element).find("div.video.card").attr("id");
      const name = $(element).find("div.video.card div a").attr("data-title");
      const key = $(element).find("div.video.card div a").attr("data-id");
      const site = $(element).find("div.video.card div a").attr("data-site");
      const publishedAt = getVideoPublishDate(
        $(element).find("div.info.movie div h3").text(),
      );
      // removing 's' from the end of the navItem
      const type = navItem.slice(0, -1);

      if (videoID && name && key && site && publishedAt) {
        const videoObj: Video = {
          videoID,
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
  console.log("Videos scraped for movie: ", movieLink);
  return videos;
};

const checkVideosExist = async (movieID: string): Promise<boolean> => {
  const existingVideos = await VideoModel.find({ _id: movieID });
  console.log(existingVideos);

  // If the movieID is not found in the database, return false otherwise return true
  return existingVideos.length !== 0;
};

const saveVideosToDB = async (
  movieID: string,
  videos: Video[],
): Promise<void> => {
  const videoDocument: VideoDocument = new VideoModel({ _id: movieID, videos });
  await videoDocument.save();
  console.log("✅ Videos stored in DB for movie: ", movieID);
  console.log("Video document: ", videoDocument, "\n");
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
