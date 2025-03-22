import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Resolver(() => Pokemon)
export class PokemonsResolver {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Mutation(() => Pokemon)
  createPokemon(@Args('createPokemonDto') createPokemonDto: CreatePokemonDto) {
    return this.pokemonsService.createOne(createPokemonDto);
  }

  @Query(() => [Pokemon], { name: 'pokemons' })
  findAll() {
    return this.pokemonsService.findAll();
  }

  @Query(() => Pokemon, { name: 'pokemon' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pokemonsService.findOne(id);
  }

  @Mutation(() => Pokemon)
  updatePokemon(@Args('updatePokemonDto') updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonsService.updateOne(updatePokemonDto.id, updatePokemonDto);
  }

  @Mutation(() => Pokemon)
  removePokemon(@Args('id', { type: () => Int }) id: number) {
    return this.pokemonsService.deleteOne(id);
  }
}
