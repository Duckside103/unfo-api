"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questions_controllers_1 = require("../controllers/questions.controllers");
const questions_middlewares_1 = require("../middlewares/questions.middlewares");
const handlers_1 = require("../utils/handlers");
const questionsRouter = express_1.default.Router();
/**
 * @method GET
 * @path questions/
 * @aim Get all questions
 */
questionsRouter.get('/', (0, handlers_1.wrapRequestHandler)(questions_controllers_1.getQuestionsController));
/**
 * @method POST
 * @path questions/
 * @aim Send a question
 */
questionsRouter.post('/', (0, questions_middlewares_1.filesValidator)('question'), (0, handlers_1.wrapRequestHandler)(questions_controllers_1.sendQuestionController));
/**
 * @method DELETE
 * @path questions/:questionId
 * @aim Delete a question
 */
questionsRouter.delete('/:questionId', (0, handlers_1.wrapRequestHandler)(questions_controllers_1.deleteQuestionController));
exports.default = questionsRouter;
