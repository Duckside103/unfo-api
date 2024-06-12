import express from 'express';

import {
  getAnswersController,
  sendAnswersController
} from '~/controllers/answers.controllers';
import { wrapRequestHandler } from '~/utils/handlers';

const answersRouter = express.Router();

/**
 * @method GET
 * @path answers/
 * @aim Get all answers
 */
answersRouter.get('/', wrapRequestHandler(getAnswersController));

/**
 * @method POST
 * @path answers/
 * @aim Send a answer
 */
answersRouter.post('/', wrapRequestHandler(sendAnswersController));

export default answersRouter;
