import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonInput } from './dto/create-pokemon.input';
import { UpdatePokemonInput } from './dto/update-pokemon.input';

@Resolver(() => Pokemon)
export class PokemonsResolver {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Mutation(() => Pokemon)
  createPokemon(@Args('createPokemonInput') createPokemonInput: CreatePokemonInput) {
    return this.pokemonsService.create(createPokemonInput);
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
  updatePokemon(@Args('updatePokemonInput') updatePokemonInput: UpdatePokemonInput) {
    return this.pokemonsService.update(updatePokemonInput.id, updatePokemonInput);
  }

  @Mutation(() => Pokemon)
  removePokemon(@Args('id', { type: () => Int }) id: number) {
    return this.pokemonsService.remove(id);
  }
}
