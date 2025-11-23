import { Module } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsResolver } from "./analytics.resolver";
import { PrismaService } from "src/shared/services/prisma.service/prisma.service";

@Module({
  providers: [AnalyticsService, AnalyticsResolver, PrismaService],
})
export class AnalyticsModule { }