import { ObjectId } from 'mongodb';

import Answer from '~/models/schemas/Answer.schema';

import databaseService from './database.services';

class AnswerService {
  async get() {
    const answers = databaseService.answers.find().toArray();

    return answers;
  }

  async send(question_id: ObjectId, answer: string) {
    const _answer = new Answer({
      question_id,
      answer
    });

    const result = await databaseService.answers.insertOne(_answer);

    return result;
  }
}

const answersService = new AnswerService();

export default answersService;
