"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonSchema = exports.PersonModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PersonSchema = new mongoose_1.default.Schema({
    id: String,
    name: String,
    movieIDs: [String],
    tvShowIDs: [String],
    biography: String,
    gender: Number,
    knownForDepartment: String,
    birthday: String,
    placeOfBirth: String,
    profilePath: String,
});
exports.PersonSchema = PersonSchema;
const PersonModel = mongoose_1.default.model("Person", PersonSchema);
exports.PersonModel = PersonModel;
//# sourceMappingURL=PersonModel.js.map