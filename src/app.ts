import express from 'express';
import bodyParser from 'body-parser';
import recommendationsRouter from './routes/recommendations';
import usersRouter from './routes/users';
import { connectDB } from './utils/database';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()

const app = express();

const allowedOrigins = ['http://localhost:3000'];  

app.use(cors({
  origin: allowedOrigins,
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

const PORT = 8000;

app.use(bodyParser.json());

app.use('/recommendations', recommendationsRouter);
app.use('/users', usersRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;
