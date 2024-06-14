import { ObjectId } from 'mongodb';

import { GetQuestionResponse } from '~/models/responses/Question.responses';
import Question from '~/models/schemas/Question.schema';

import databaseService from './database.services';

class QuestionService {
  async get(): Promise<GetQuestionResponse[]> {
    const [questions, answers] = await Promise.all([
      databaseService.questions.find().toArray(),
      databaseService.answers.find().toArray()
    ]);

    const questionsWithAnswer = questions.map((question) => {
      const matchAnswer = answers.find((answer) =>
        answer.question_id.equals(question._id)
      );
      return {
        ...question,
        _id: question._id.toString(),
        created_at: question.created_at.toISOString(),
        answer: matchAnswer?.value || [],
        no: matchAnswer?.no
      } as GetQuestionResponse;
    });

    return questionsWithAnswer;
  }

  async send(questions: Question[]) {
    const result = await databaseService.questions.insertMany(questions);

    return result;
  }

  async delete(questionId: string) {
    const deletedQuestion = await databaseService.questions.findOneAndDelete({
      _id: ObjectId.createFromHexString(questionId)
    });

    return deletedQuestion;
  }
}

const questionsService = new QuestionService();

export default questionsService;
