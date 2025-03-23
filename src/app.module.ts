// ./app.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { HelloModule } from './modules/hello/hello.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PokemonsModule } from './modules/pokemons/pokemons.module'; 
import { TypesModule } from './modules/types/types.module'; 
import { GqlThrottlerGuard } from './common/guards/gql-throttler.guard';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Changed to code first aproach
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }) => ({ req, res }), // Inject request & into graph's context
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/database_orm.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      migrations: ['../typeorm/migrations/*.ts'],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // Time-to-live in milliseconds (60 seconds)
          limit: 30, // Maximum number of requests within the TTL
        },
      ],
    }),
    HelloModule,
    PrismaModule,
    PokemonsModule,
    TypesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard, // Apply rate limiting globally
    },
  ],
})
export class AppModule {}