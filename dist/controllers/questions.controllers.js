"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestionController = exports.sendQuestionController = exports.getQuestionsController = void 0;
const mongodb_1 = require("mongodb");
const http_1 = require("../constants/http");
const Question_schema_1 = __importDefault(require("../models/schemas/Question.schema"));
const answers_services_1 = __importDefault(require("../services/answers.services"));
const questions_services_1 = __importDefault(require("../services/questions.services"));
const files_1 = require("../utils/files");
const getQuestionsController = async (req, res) => {
    const questions = await questions_services_1.default.get();
    return res.status(http_1.HttpStatus.OK).json({
        result: questions
    });
};
exports.getQuestionsController = getQuestionsController;
const sendQuestionController = async (req, res) => {
    const { files = [] } = req;
    /**
     * step0: Upload image to Drive
     */
    const uploadedImages = await Promise.all(files.map(files_1.uploadImage));
    /**
     * step1: Store image_path in Database
     */
    const questions = uploadedImages.map((uploadedImage) => new Question_schema_1.default({
        _id: mongodb_1.ObjectId.createFromHexString(uploadedImage.name),
        image_id: uploadedImage.id
    }));
    const insertedQuestions = await questions_services_1.default.send(questions);
    return res.status(http_1.HttpStatus.OK).json({
        result: {
            uploadedImages,
            insertedQuestions
        }
    });
};
exports.sendQuestionController = sendQuestionController;
const deleteQuestionController = async (req, res) => {
    const { questionId } = req.params;
    const [deletedQuestion, deletedAnswer] = await Promise.all([
        questions_services_1.default.delete(questionId),
        answers_services_1.default.delete(questionId)
    ]);
    return res.status(http_1.HttpStatus.OK).json({
        result: {
            deletedQuestion,
            deletedAnswer
        }
    });
};
exports.deleteQuestionController = deleteQuestionController;
