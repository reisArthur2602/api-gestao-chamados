import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import routes from './routes';
import { hasError } from './middlewares/hasError';

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(hasError);

app.listen(process.env.PORT, () =>
    console.log(`🚀 Server rodando na porta ${process.env.PORT}`)
);
