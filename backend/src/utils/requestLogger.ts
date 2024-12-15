import type { IncomingMessage, ServerResponse } from "node:http";
import type { RequestHandler } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import winston from "winston";
import expressWinston from "express-winston";

import { env } from "@/utils/envConfig";

enum LogLevel {
  Fatal = "fatal",
  Error = "error",
  Warn = "warn",
  Info = "info",
  Debug = "debug",
  Trace = "trace",
  Silent = "silent",
}

const requestLogger = (): RequestHandler[] => {
  const winstonOptions: expressWinston.LoggerOptions = {
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
    ],
    format: winston.format.json(),
    meta: false,
    msg: createLogMessage,
    requestField: "request",
    responseField: "response",
    level: determineLogLevel,
    ignoreRoute: () => false,
    requestFilter: (req, propName) => req[propName],
    responseFilter: (res, propName) => res[propName],
  };

  return [responseBodyMiddleware, expressWinston.logger(winstonOptions)];
};

const responseBodyMiddleware: RequestHandler = (_req, res, next) => {
  if (!env.isProduction) {
    const originalSend = res.send;
    res.send = (content) => {
      res.locals.responseBody = content;
      res.send = originalSend;
      return originalSend.call(res, content);
    };
  }
  next();
};

const determineLogLevel = (_req: IncomingMessage, res: ServerResponse, err?: Error): string => {
  if (err || res.statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) return LogLevel.Error;
  if (res.statusCode >= StatusCodes.BAD_REQUEST) return LogLevel.Warn;
  if (res.statusCode >= StatusCodes.MULTIPLE_CHOICES) return LogLevel.Silent;
  return LogLevel.Info;
};

const createLogMessage = (req: IncomingMessage, res: ServerResponse): string => {
  if (res.statusCode === StatusCodes.NOT_FOUND) {
    return getReasonPhrase(StatusCodes.NOT_FOUND);
  }
  return `${req.method} ${req.url} completed with status code ${res.statusCode}`;
};

export default [...requestLogger()];