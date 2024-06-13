"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const answers_controllers_1 = require("../controllers/answers.controllers");
const handlers_1 = require("../utils/handlers");
const answersRouter = express_1.default.Router();
/**
 * @method GET
 * @path answers/
 * @aim Get all answers
 */
answersRouter.get('/', (0, handlers_1.wrapRequestHandler)(answers_controllers_1.getAnswersController));
/**
 * @method POST
 * @path answers/
 * @aim Send a answer
 */
answersRouter.post('/', (0, handlers_1.wrapRequestHandler)(answers_controllers_1.sendAnswersController));
exports.default = answersRouter;
