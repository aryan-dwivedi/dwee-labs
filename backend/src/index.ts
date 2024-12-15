import { env } from "@/utils/envConfig";
import { app, logger } from "@/server";

const startServer = () => {
  const server = app.listen(env.PORT, () => {
    const { HOST, PORT } = env;
    logger.info(`Server Running on port http://${HOST}:${PORT} 🚀`);
  });

  const onCloseSignal = () => {
    logger.info("sigint received, shutting down");
    server.close(() => {
      logger.info("server closed");
      process.exit();
    });
    setTimeout(() => process.exit(1), 10000).unref();
  };

  process.on("SIGINT", onCloseSignal);
  process.on("SIGTERM", onCloseSignal);
};


startServer();