import dotenv from "dotenv";
import { cleanEnv, host, port, str } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  HOST: host({ devDefault: "localhost" }),
  PORT: port({ devDefault: 5500 }),
  AUTH_KEY: str({ devDefault: "secret" }),
});
