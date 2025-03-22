// src/modules/pokemons/dto/create-pokemon.dto.ts
import { InputType, Field, Int  } from '@nestjs/graphql';

@InputType()
export class CreatePokemonDto {
  @Field(() => String, {description: "Pokemon Name"})
  name: string;

 @Field(() => [Int], { description: "An array of types Ids" }) 
  typeIds?: number[];
}
