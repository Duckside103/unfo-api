import { Collection, Db, MongoClient } from 'mongodb';

import Answer from '~/models/schemas/Answer.schema';
import Question from '~/models/schemas/Question.schema';

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cheat.mk3uvwd.mongodb.net/?retryWrites=true&w=majority&appName=cheat`;

class DatabaseService {
  private client: MongoClient;
  private db: Db;

  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(process.env.DB_NAME);
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 });
      console.log(
        'Pinged your deployment. You successfully connected to MongoDB!'
      );
    } catch (error) {
      console.log('Can not connect to MongoDB: ', error);
    }
  }

  get questions(): Collection<Question> {
    return this.db.collection(
      process.env.DB_QUESTIONS_COLLECTION_NAME as string
    );
  }

  get answers(): Collection<Answer> {
    return this.db.collection(process.env.DB_ANSWERS_COLLECTION_NAME as string);
  }
}

const databaseService = new DatabaseService();

export default databaseService;
