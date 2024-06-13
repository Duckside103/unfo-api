"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Answer {
    _id;
    question_id;
    no;
    value;
    created_at;
    updated_at;
    constructor(answer) {
        const now = new Date();
        this._id = answer._id || new mongodb_1.ObjectId();
        this.question_id = answer.question_id;
        this.no = answer.no;
        this.value = answer.value;
        this.created_at = answer.created_at || now;
        this.updated_at = answer.updated_at || now;
    }
}
exports.default = Answer;
