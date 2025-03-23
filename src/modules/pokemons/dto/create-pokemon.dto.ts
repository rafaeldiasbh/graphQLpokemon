// src/modules/pokemons/dto/create-pokemon.dto.ts
import { InputType, Field, Int  } from '@nestjs/graphql';
import { ArrayNotEmpty, IsAlpha, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreatePokemonDto {
  @IsAlpha()
  @IsNotEmpty()
  @Field(() => String, {description: "Pokemon Name"})
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @Field(() => [Int], { description: "An array of types Ids" }) 
  typeIds?: number[];
}
