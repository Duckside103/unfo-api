import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { HttpStatus } from '~/constants/http';
import { SendQuestionRequestBody } from '~/models/requests/Question.requests';
import Question from '~/models/schemas/Question.schema';
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
