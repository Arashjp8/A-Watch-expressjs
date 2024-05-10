import { scrapeContext } from "./context";
import { lastScrapeTime, updateLastScrapeTime } from "./utils/lastScrapeTime";

const performScrapingAndUpdateLastScrapeTime = async () => {
  await scrapeContext();

  const today = new Date();
  updateLastScrapeTime(today);
  console.log("Last scrape time updated to: ", lastScrapeTime);
};

const checkIfTimeToScrape = async () => {
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  console.log("Last scrape time: ", lastScrapeTime);

  if (!lastScrapeTime || lastScrapeTime < twoWeeksAgo) {
    await performScrapingAndUpdateLastScrapeTime();
  } else {
    console.log(
      "Scraping cancelled. Last scrape time is within the last two weeks.",
    );
  }
};

(async () => {
  await checkIfTimeToScrape();
})();
