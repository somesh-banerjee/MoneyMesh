import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { UserModule } from './user/user.module';
import { PrismaService } from './shared/services/prisma.service/prisma.service';
import { SharedModule } from './shared/modules/shared.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    // core
    SharedModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      sortSchema: true,
    }),
    AuthModule,
    // entities
    UserModule,
    AccountModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
