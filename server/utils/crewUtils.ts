import { Crew } from "../scraper/types";

export const organizeCrew = (crew: string) => {
  const crewArray = crew.split("\n").filter((item) => item.trim() !== "");
  const crewObj: Crew[] = [];

  for (let i = 0; i < crewArray.length; i += 2) {
    i + 1 < crewArray.length &&
      crewObj.push({
        name: crewArray[i].trim(),
        role: crewArray[i + 1].trim(),
      });
  }

  return crewObj;
};
