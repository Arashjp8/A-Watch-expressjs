"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersonLinks = void 0;
const cheerio = __importStar(require("cheerio"));
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getPersonLinks = async (moviePageHtmlArray) => {
    let castLinks = [];
    let crewLinks = [];
    for (const html of moviePageHtmlArray) {
        const delayPerRequest = 100; // delay in milliseconds
        await delay(delayPerRequest);
        const $ = cheerio.load(html);
        castLinks = [...linkExtractor($, castLinks, "ol.people.scroller li.card")];
        crewLinks = [
            ...linkExtractor($, crewLinks, "ol.people.no_image li.profile"),
        ];
    }
    return { castLinks, crewLinks };
};
exports.getPersonLinks = getPersonLinks;
const linkExtractor = ($, linksArray, selector) => {
    $(selector).each((_, element) => {
        const link = $(element).find("a").attr("href");
        link ? linksArray.push(link) : null;
    });
    return linksArray;
};
//# sourceMappingURL=getPersonLinks.js.map