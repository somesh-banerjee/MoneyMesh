import * as Joi from 'joi';

export const ConfigValidation = Joi.object({

  SYSTEM_PORT: Joi.number().integer().min(2999).max(65535).default(3000),
  NODE_ENV: Joi.string().valid('dev', 'production', 'test', 'provision', 'qa').default('dev'),
  LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly').default('info'),

  JWT_SECRET: Joi.string().default('secret'),
  JWT_EXPIRES_IN: Joi.number().integer().min(100).max(60 * 60 * 24).default(3600),
  BCRYPT_SALT_ROUNDS: Joi.number().integer().min(10).max(3000).default(10),

  DATABASE_URL: Joi.string().required(),
});