import "dotenv/config";
import "express-async-errors";

import express from "express";
import cors from "cors";

import { ErrorMiddleware } from "../middlewares/error.middleware";
import MainRoutes from "./main.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(MainRoutes);

app.use(ErrorMiddleware);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server rodando na porta ${process.env.PORT}`)
);
