import { ObjectId } from 'mongodb';

type AnswerType = {
  _id?: ObjectId;
  question_id: ObjectId;
  no: number;
  answer: string;
  created_at?: Date;
  updated_at?: Date;
};

class Answer {
  _id: ObjectId;
  question_id: ObjectId;
  no: number;
  answer: string;
  created_at: Date;
  updated_at: Date;

  constructor(answer: AnswerType) {
    const now = new Date();

    this._id = answer._id || new ObjectId();
    this.question_id = answer.question_id;
    this.no = answer.no;
    this.answer = answer.answer;
    this.created_at = answer.created_at || now;
    this.updated_at = answer.updated_at || now;
  }
}

export default Answer;
