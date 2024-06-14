import { ParamsDictionary } from 'express-serve-static-core';

export interface SendQuestionRequestBody {}

export interface DeleteQuestionRequestBody {
  questionId: string;
}
