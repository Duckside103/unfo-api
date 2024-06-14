import { ParamsDictionary } from 'express-serve-static-core';

export interface SendQuestionRequestBody {}

export interface DeleteQuestionRequestParams extends ParamsDictionary {
  questionId: string;
}
