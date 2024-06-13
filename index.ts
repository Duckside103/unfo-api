import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import { defaultErrorHandler } from './src/middlewares/errors.middlewares';
import answersRouter from './src/routes/answers.routes';
import filesRouter from './src/routes/files.routes';
import questionsRouter from './src/routes/questions.routes';
import databaseService from './src/services/database.services';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);
app.use('/files', filesRouter);

databaseService.connect();

app.use(defaultErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
