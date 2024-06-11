import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ObjectId } from 'mongodb';

import { HttpStatus } from '~/constants/http';
import { SendAnswerRequestBody } from '~/models/requests/Answer.requests';
import answersService from '~/services/answers.services';

export const getAnswersController = async (req: Request, res: Response) => {
  const questions = await answersService.get();

  return res.status(HttpStatus.OK).json({
    result: questions
  });
};

export const sendAnswerController = async (
  req: Request<ParamsDictionary, unknown, SendAnswerRequestBody>,
  res: Response
) => {
  const { question_id, no, answer } = req.body;

  const result = await answersService.send(
    ObjectId.createFromHexString(question_id),
    no,
    answer
  );

  return res.status(HttpStatus.OK).json({
    result
  });
};
