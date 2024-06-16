"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const database_services_1 = __importDefault(require("./database.services"));
class AnswersService {
    async get() {
        const answers = database_services_1.default.answers.find().toArray();
        return answers;
    }
    async send(question_id, no, value) {
        const result = await database_services_1.default.answers.updateOne({
            question_id: question_id
        }, {
            $set: {
                no,
                value,
                updated_at: new Date()
            }
        }, {
            upsert: true
        });
        return result;
    }
    async delete(questionId) {
        const deletedAnswer = await database_services_1.default.answers.findOneAndDelete({
            question_id: mongodb_1.ObjectId.createFromHexString(questionId)
        });
        return deletedAnswer;
    }
}
const answersService = new AnswersService();
exports.default = answersService;
