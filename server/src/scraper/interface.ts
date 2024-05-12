export interface ScrapeStrategy {
  scrape(links: string[] | string | PersonLinksObject): Promise<any>;
}

export interface PersonLinksObject {
  castLinks: string[];
  crewLinks: string[];
}

export interface People {
  id: string;
  role: string;
}

export interface Video {
  videoID: string;
  name: string;
  key: string;
  site: string;
  publishedAt: string;
  type: string;
}
