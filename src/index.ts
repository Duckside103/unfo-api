import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import { defaultErrorHandler } from './middlewares/errors.middlewares';
import answersRouter from './routes/answers.routes';
import filesRouter from './routes/files.routes';
import questionsRouter from './routes/questions.routes';
import databaseService from './services/database.services';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);
app.use('/files', filesRouter);

databaseService.connect();

app.use(defaultErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
