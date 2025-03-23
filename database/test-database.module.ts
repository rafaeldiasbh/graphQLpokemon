import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeOrmSQLITETestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: entities,
    synchronize: true,
    dropSchema: true, // Clear the database schema after each test
  });