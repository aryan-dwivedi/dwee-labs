import cors from "cors";
import express, { type Express } from "express";

import { errorMiddleware } from "@/middleware/errorHandler";
import requestLogger from "@/utils/requestLogger";
import router from "@/routes";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ level, message, timestamp }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(requestLogger);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

app.get("/", async (_, res) =>
  res.status(200).send({ msg: "Backend is up and running" })
);

app.use("/", router);

app.use(errorMiddleware);

export { app, logger };
