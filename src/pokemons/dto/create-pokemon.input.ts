import { InputType, Int, Field } from '@nestjs/graphql';

// @InputType()
// export class CreatePokemonInput {
//   @Field(() => Int, { description: 'Example field (placeholder)' })
//   exampleField: number;
// }

@InputType()
export class CreatePokemonInput {
  @Field(() => String, { description: "Pokemon name" })
  name: string;

  @Field(() => String, {description: "An array of type names"})
  type: string;
}
