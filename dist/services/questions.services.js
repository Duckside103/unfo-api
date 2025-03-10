"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const files_1 = require("../utils/files");
const database_services_1 = __importDefault(require("./database.services"));
class QuestionService {
    async get() {
        const [questions, answers] = await Promise.all([
            database_services_1.default.questions.find().toArray(),
            database_services_1.default.answers.find().toArray()
        ]);
        const questionsWithAnswer = questions.map((question) => {
            const matchAnswer = answers.find((answer) => answer.question_id.equals(question._id));
            return {
                ...question,
                _id: question._id.toString(),
                created_at: question.created_at.toISOString(),
                answer: matchAnswer?.value || [],
                no: matchAnswer?.no
            };
        });
        return questionsWithAnswer;
    }
    async send(questions) {
        const result = await database_services_1.default.questions.insertMany(questions);
        return result;
    }
    async delete(questionId) {
        const deletedQuestion = await database_services_1.default.questions.findOneAndDelete({
            _id: mongodb_1.ObjectId.createFromHexString(questionId)
        });
        if (deletedQuestion?.image_id) {
            await (0, files_1.deleteImage)(deletedQuestion.image_id);
        }
        return deletedQuestion;
    }
}
const questionsService = new QuestionService();
exports.default = questionsService;
