// src/modules/pokemons/pokemons.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationOptions, SortOptions, FilterOptions } from '../../common/entities/base.entity';

@Resolver(() => Pokemon)
export class PokemonsResolver {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Query(() => [Pokemon])
  async findAllPokemon(
    @Args('pagination', { nullable: true }) pagination?: PaginationOptions,
    @Args('sort', { nullable: true }) sort?: SortOptions,
    @Args('filters', { nullable: true }) filters?: FilterOptions[],
  ): Promise<{ data: Pokemon[]; total: number }> {
    return this.pokemonsService.findAll(pagination, sort, filters);
  }

  @Query(() => Pokemon)
  async findOnePokemon(@Args('id') id: number): Promise<Pokemon> {
    return this.pokemonsService.findOne(id);
  }

  @Mutation(() => Pokemon)
  async createOnePokemon(@Args('input') input: CreatePokemonDto): Promise<Pokemon> {
    return this.pokemonsService.createOne(input);
  }

  @Mutation(() => Pokemon)
  async updateOnePokemon(
    @Args('id') id: number,
    @Args('input') input: UpdatePokemonDto,
  ): Promise<Pokemon> {
    return this.pokemonsService.updateOne(id, input);
  }

  @Mutation(() => Pokemon)
  async deleteOnePokemon(@Args('id') id: number): Promise<Pokemon> {
    return this.pokemonsService.deleteOne(id);
  }
}