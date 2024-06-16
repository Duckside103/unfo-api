"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAnswersController = exports.getAnswersController = void 0;
const mongodb_1 = require("mongodb");
const http_1 = require("../constants/http");
const answers_services_1 = __importDefault(require("../services/answers.services"));
const getAnswersController = async (req, res) => {
    const answers = await answers_services_1.default.get();
    return res.status(http_1.HttpStatus.OK).json({
        result: answers
    });
};
exports.getAnswersController = getAnswersController;
const sendAnswersController = async (req, res) => {
    const { question_id, no, value } = req.body;
    const result = await answers_services_1.default.send(mongodb_1.ObjectId.createFromHexString(question_id), no, value);
    return res.status(http_1.HttpStatus.OK).json({
        result
    });
};
exports.sendAnswersController = sendAnswersController;
