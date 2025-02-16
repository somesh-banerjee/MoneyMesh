import { Commons } from "src/shared/utils";
import { CONSTANTS } from "./constants";

export const ConfigSchema = () => ({
  CONSTANTS: {
    ...CONSTANTS,
  },

  SYSTEM: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.SYSTEM_PORT, 10),
    IS_PROD: Commons.compareString(process.env.SYSTEM_NODE_ENV, CONSTANTS.ENV.PRODUCTION),
  },

  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN, 10),
  },

  BCRYPT: {
    SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS),
  },
});