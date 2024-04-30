"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDateAndLanguage = void 0;
const parseDateAndLanguage = (date) => {
    const dateArr = date.split("(");
    const releaseDate = dateArr[0].trim();
    let originalLanguage = "";
    if (dateArr.length > 1) {
        originalLanguage = dateArr[1].replace(")", "").trim();
    }
    return { releaseDate, originalLanguage };
};
exports.parseDateAndLanguage = parseDateAndLanguage;
//# sourceMappingURL=dateAndLanguageUtil.js.map