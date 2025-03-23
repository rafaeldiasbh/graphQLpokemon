// src/modules/pokemons/dto/update-pokemon.dto.ts
import { InputType, Field } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto'
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {
  @IsInt()
  @IsNotEmpty()
  @Field(() => Number, {description: "Pokemon Id"})
  id: number;
}