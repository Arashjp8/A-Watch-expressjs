export interface ScrapeStrategy {
  scrape(links: string[] | string): Promise<any>;
}
