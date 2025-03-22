import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  //typePaths: ['./src/**/*.graphql'],
  typePaths: ['./src/schema.gql'],
  path: join(process.cwd(), 'src/graphql.schema.ts'),
  outputAs: 'class',
});
