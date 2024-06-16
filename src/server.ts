import 'dotenv/config';

import express from 'express';
import cors from 'cors';


import { ClientRoutes, OrderRoutes, UserRoutes } from './routes';

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use(UserRoutes);
app.use(ClientRoutes);
app.use(OrderRoutes);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server rodando na porta ${process.env.PORT}`)
);
