import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import { defaultErrorHandler } from './middlewares/errors.middlewares';
import answersRouter from './routes/answers.routes';
import questionsRouter from './routes/questions.routes';
import databaseService from './services/database.services';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);

databaseService.connect();

app.use(defaultErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
