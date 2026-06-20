import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { UserModule } from './user/user.module';
import { PrismaService } from './shared/services/prisma.service/prisma.service';
import { SharedModule } from './shared/modules/shared.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { InvestmentModule } from './investment/investment.module';
import { BudgetModule } from './budget/budget.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { HealthModule } from './health/health.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppThrottlerGuard } from './shared/guards/throttler.guard';

@Module({
  imports: [
    // core
    SharedModule,
    ThrottlerModule.forRoot([{
      ttl: 60_000,
      limit: 120,
    }]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      sortSchema: true,
      playground: false,
      graphiql: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    HealthModule,
    // entities
    AnalyticsModule,
    UserModule,
    AccountModule,
    InvestmentModule,
    BudgetModule,
    TransactionModule
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AppThrottlerGuard,
    },
  ],
})
export class AppModule { }
