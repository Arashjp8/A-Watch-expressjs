import { People } from "../types";

export const organizePeople = (crew: string) => {
  const peopleArray = crew.split("\n").filter((item) => item.trim() !== "");
  const peopleObj: People[] = [];

  for (let i = 0; i < peopleArray.length; i += 2) {
    i + 1 < peopleArray.length &&
      peopleObj.push({
        name: peopleArray[i].trim(),
        role: peopleArray[i + 1].trim(),
      });
  }

  return peopleObj;
};
