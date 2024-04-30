"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizePeople = void 0;
const config_1 = require("../config");
const organizePeople = ($, type) => {
    let people;
    let selector;
    if (type === "crew") {
        people = $(config_1.crewCssPath).text().trim();
        selector = "ol.people.no_image";
    }
    else {
        people = $(config_1.castCssPath).text().trim();
        selector = "ol.people.scroller";
    }
    const peopleArray = people.split("\n").filter((item) => item.trim() !== "");
    const peopleObj = [];
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
            peopleObj[i].id = (0, config_1.getIDFromLink)(peopleLink);
        }
    }
    return peopleObj;
};
exports.organizePeople = organizePeople;
//# sourceMappingURL=crewUtil.js.map