import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, LogLevel, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONSTANTS, ConfigSchema } from './shared/modules/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: _getLogLevels(),
  });

  _printEnvVariables(app);
  await _configureServer(app);
}

const _printEnvVariables = (app: INestApplication) => {
  const { logger, isIAmProd } = _getHelpersFromINestApp(app);

  if (!isIAmProd) logger.debug(`Final Loaded Config: ${JSON.stringify(ConfigSchema(), null, 2)}`);
};

const _getLogLevels = (): LogLevel[] => {
  const isIAmProd = process.env.SYSTEM_NODE_ENV === CONSTANTS.ENV.PRODUCTION;

  if (isIAmProd) {
    return ['log', 'warn', 'error'];
  }

  return ['error', 'warn', 'log', 'verbose', 'debug'];
};

const _getHelpersFromINestApp = (app: INestApplication): { configService: ConfigService; logger: Logger; isIAmProd: boolean; } => {
  const configService = app.get(ConfigService);

  const isIAmProd = configService.get<boolean>('SYSTEM.IS_PROD');

  const logger = new Logger('Main.ts');

  return {
    configService,
    isIAmProd,
    logger,
  };
};


const _configureServer = async (app: INestApplication) => {
  const { logger, configService } = _getHelpersFromINestApp(app);

  const port = configService.get<number>('SYSTEM.PORT');
  await app.listen(port);

  logger.log(`Server started at ${port}`);
};

bootstrap();
