import express from 'express';

import {
  deleteQuestionController,
  getQuestionsController,
  sendQuestionController
} from '~/controllers/questions.controllers';
import { filesValidator } from '~/middlewares/questions.middlewares';
import { wrapRequestHandler } from '~/utils/handlers';
const questionsRouter = express.Router();

/**
 * @method GET
 * @path questions/
 * @aim Get all questions
 */
questionsRouter.get('/', wrapRequestHandler(getQuestionsController));

/**
 * @method POST
 * @path questions/
 * @aim Send a question
 */
questionsRouter.post(
  '/',
  filesValidator('question'),
  wrapRequestHandler(sendQuestionController)
);

/**
 * @method DELETE
 * @path questions/:id
 * @aim Delete a question
 */
questionsRouter.delete('/:id', wrapRequestHandler(deleteQuestionController));

export default questionsRouter;
