"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGenres = void 0;
const parseGenres = (genres) => {
    return genres.split(",").map((genre) => genre.trim());
};
exports.parseGenres = parseGenres;
//# sourceMappingURL=genresUtil.js.map