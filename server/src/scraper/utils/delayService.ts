export const DELAY_TIME_IN_MS = 100;

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
