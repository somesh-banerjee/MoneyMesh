import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Promise<JwtModuleOptions> | JwtModuleOptions => {

        const options: JwtModuleOptions = {
          secret: configService.get<string>('JWT.SECRET'),
          signOptions: {
            algorithm: 'HS256',
            expiresIn: configService.get<number>('JWT.EXPIRES_IN'),
          },
        };

        return options;
      },
    }),
  ],
  exports: [JwtModule],
})
export class JwtSharedModule implements OnModuleInit, OnModuleDestroy {

  private readonly className = JwtSharedModule.name;
  private readonly logger = new Logger(this.className);

  onModuleInit(): void {
  }

  onModuleDestroy(): void {
  }

}
