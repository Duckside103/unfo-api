import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ObjectId } from 'mongodb';

import { HttpStatus } from '~/constants/http';
import {
  DeleteQuestionRequestParams,
  SendQuestionRequestBody
} from '~/models/requests/Question.requests';
import Question from '~/models/schemas/Question.schema';
import answersService from '~/services/answers.services';
import questionsService from '~/services/questions.services';
import { uploadImage } from '~/utils/files';

export const getQuestionsController = async (req: Request, res: Response) => {
  const questions = await questionsService.get();

  return res.status(HttpStatus.OK).json({
    result: questions
  });
};

export const sendQuestionController = async (
  req: Request<ParamsDictionary, unknown, SendQuestionRequestBody>,
  res: Response
) => {
  const { files = [] } = req;

  /**
   * step0: Upload image to Drive
   */
  const uploadedImages = await Promise.all(
    (files as Express.Multer.File[]).map(uploadImage)
  );

  /**
   * step1: Store image_path in Database
   */
  const questions = uploadedImages.map(
    (uploadedImage) =>
      new Question({
        _id: ObjectId.createFromHexString(uploadedImage.name),
        image_id: uploadedImage.id as string
      })
  );
  const insertedQuestions = await questionsService.send(questions);

  return res.status(HttpStatus.OK).json({
    result: {
      uploadedImages,
      insertedQuestions
    }
  });
};

export const deleteQuestionController = async (
  req: Request<DeleteQuestionRequestParams>,
  res: Response
) => {
  const { questionId } = req.params;

  const [deletedQuestion, deletedAnswer] = await Promise.all([
    questionsService.delete(questionId),
    answersService.delete(questionId)
  ]);

  return res.status(HttpStatus.OK).json({
    result: {
      deletedQuestion,
      deletedAnswer
    }
  });
};
