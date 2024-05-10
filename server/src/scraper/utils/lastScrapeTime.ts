import fs from "fs";

const readLastScrapeTime = (): Date | null => {
  console.log("Reading lastScrapeTime.txt");

  try {
    if (fs.existsSync("./lastScrapeTime.txt")) {
      const data = fs.readFileSync("./src/scraper/lastScrapeTime.txt", "utf-8");
      console.log("Read file contents:", data);

      return new Date(data);
    }
    return null;
  } catch (err) {
    console.error("Error reading last scrape time:", err);
    return null;
  }
};

const writeLastScrapeTime = (date: Date): void => {
  try {
    fs.writeFileSync(
      "./src/scraper/lastScrapeTime.txt",
      date.toISOString(),
      "utf8",
    );
  } catch (err) {
    console.error("Error writing last scrape time:", err);
  }
};

export let lastScrapeTime: Date | null = readLastScrapeTime();

export const updateLastScrapeTime = (date: Date): void => {
  writeLastScrapeTime(date);
};
