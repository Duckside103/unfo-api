import { ObjectId } from 'mongodb';

import databaseService from './database.services';

class AnswersService {
  async get() {
    const answers = databaseService.answers
      .find()
      .project({
        no: 1,
        value: 1,
        _id: 0
      })
      .toArray();

    return answers;
  }

  async send(question_id: ObjectId, no: number, value: string[]) {
    const result = await databaseService.answers.updateOne(
      {
        question_id: question_id
      },
      {
        $set: {
          no,
          value,
          updated_at: new Date()
        }
      },
      {
        upsert: true
      }
    );

    return result;
  }

  async delete(questionId: string) {
    const deletedAnswer = await databaseService.answers.findOneAndDelete({
      question_id: ObjectId.createFromHexString(questionId)
    });

    return deletedAnswer;
  }
}

const answersService = new AnswersService();

export default answersService;
