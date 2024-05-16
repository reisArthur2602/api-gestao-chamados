import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { router } from './routes';
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server rodando na porta ${process.env.PORT}`)
);
