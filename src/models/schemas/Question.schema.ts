import { ObjectId } from 'mongodb';

type QuestionType = {
  _id?: ObjectId;
  created_at?: Date;
  image_id: string;
};

class Question {
  _id: ObjectId;
  created_at: Date;
  image_id: string;

  constructor(question: QuestionType) {
    this._id = question._id || new ObjectId();
    this.created_at = question.created_at || new Date();
    this.image_id = question.image_id;
  }
}

export default Question;
