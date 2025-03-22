import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Type {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
