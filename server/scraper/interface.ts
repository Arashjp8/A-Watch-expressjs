export interface ScrapeStrategy {
  scrape(links: string[] | string | PersonLinksObject): Promise<any>;
}

export interface PersonLinksObject {
  castLinks: string[];
  crewLinks: string[];
}
