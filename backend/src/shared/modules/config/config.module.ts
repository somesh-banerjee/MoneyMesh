
import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigSchema } from './config.schema';
import { ConfigValidation } from './config.validation';

@Module({
  exports: [ConfigModule],
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      load: [ConfigSchema],
      validationOptions: {
        abortEarly: false,
        allowUnknown: true,
      },
      validationSchema: ConfigValidation,
    }),
  ],
})
export class ConfigSharedModule implements OnModuleInit, OnModuleDestroy {
  private readonly className = ConfigSharedModule.name;
  private readonly logger = new Logger(this.className);

  onModuleInit(): void {
  }

  onModuleDestroy(): void {
  }
}