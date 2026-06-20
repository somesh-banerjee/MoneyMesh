import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { PrismaService } from 'src/shared/services/prisma.service/prisma.service';

@Module({
  controllers: [HealthController],
  providers: [PrismaService],
})
export class HealthModule {}
