"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Question {
    _id;
    created_at;
    image_id;
    constructor(question) {
        this._id = question._id || new mongodb_1.ObjectId();
        this.created_at = question.created_at || new Date();
        this.image_id = question.image_id;
    }
}
exports.default = Question;
