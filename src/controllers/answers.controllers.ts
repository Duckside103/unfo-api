import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ObjectId } from 'mongodb';

import { HttpStatus } from '~/constants/http';
import { SendAnswersRequestBody } from '~/models/requests/Answer.requests';
import answersService from '~/services/answers.services';

export const getAnswersController = async (req: Request, res: Response) => {
  const answers = await answersService.get();

  return res.status(HttpStatus.OK).json({
    result: answers
  });
};

export const sendAnswersController = async (
  req: Request<ParamsDictionary, unknown, SendAnswersRequestBody>,
  res: Response
) => {
  const { question_id, no, value } = req.body;

  const result = await answersService.send(
    ObjectId.createFromHexString(question_id),
    no,
    value
  );

  return res.status(HttpStatus.OK).json({
    result
  });
};
