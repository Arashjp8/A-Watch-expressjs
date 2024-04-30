import { People } from "../interface";
import { CheerioAPI } from "cheerio";
import { crewCssPath, castCssPath, getIDFromLink } from "../config";

export const organizePeople = ($: CheerioAPI, type: "cast" | "crew") => {
  let people: string;
  let selector: string;

  if (type === "crew") {
    people = $(crewCssPath).text().trim();
    selector = "ol.people.no_image";
  } else {
    people = $(castCssPath).text().trim();
    selector = "ol.people.scroller";
  }

  const peopleArray = people.split("\n").filter((item) => item.trim() !== "");
  const peopleObj: People[] = [];

  for (let i = 0; i < peopleArray.length; i += 2) {
    i + 1 < peopleArray.length &&
      peopleObj.push({
        id: "",
        role: peopleArray[i + 1].trim(),
      });
  }

  for (let i = 0; i < peopleObj.length; i++) {
    const peopleLink = $(selector).find("li").eq(i).find("a").attr("href");
    if (peopleLink) {
      peopleObj[i].id = getIDFromLink(peopleLink);
    }
  }

  return peopleObj;
};
