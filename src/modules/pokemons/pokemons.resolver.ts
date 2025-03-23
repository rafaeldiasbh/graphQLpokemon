// src/modules/pokemons/pokemons.resolver.ts
import { Resolver, Query, Mutation, Args, ResolveField, Root } from '@nestjs/graphql';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { FilterOptionsDto } from '../../common/dto/filter-options.dto';
import { SortOptionsDto } from '../../common/dto/sort-options.dto';
import { PaginationOptionsDto } from '../../common/dto/pagination-options.dto';
import { PokemonPaginatedResponse } from './dto/pokemon-paginated-response.dto';
import { TypesService } from '../types/types.service';
import { Type } from '../types/entities/type.entity';
import { createTypesLoader } from '../../common/loaders/types.loader';
import DataLoader from 'dataloader';
import { Throttle } from '@nestjs/throttler';

@Resolver(() => Pokemon)
export class PokemonsResolver {
  private typesLoader: DataLoader<number, Type[]>;

  constructor(
    private readonly pokemonsService: PokemonsService,
    private readonly typesService: TypesService, 
  ) {
    this.typesLoader = createTypesLoader(typesService);
  }

  @Query(() => PokemonPaginatedResponse)
  async findAllPokemon(
    @Args('pagination', { type: () => PaginationOptionsDto, nullable: true }) pagination?: PaginationOptionsDto,
    @Args('sort', { type: () => SortOptionsDto, nullable: true }) sort?: SortOptionsDto,
    @Args('filters', { type: () => [FilterOptionsDto], nullable: true }) filters?: FilterOptionsDto[],
  ): Promise<PokemonPaginatedResponse> {
    const result = await this.pokemonsService.findAll(pagination, sort, filters);
    return new PokemonPaginatedResponse(
      result.data, // List of Pokémon
      result.total, // Total number of Pokémon
      pagination?.page || 1, // Current page number (default to 1 if not provided)
      pagination?.itemsPerPage || 10, // Items per page (default to 10 if not provided)
    );
  }

  @Throttle({ default: { limit: 10, ttl: 60000, blockDuration: 10000 } })
  @Query(() => Pokemon)
  async findOnePokemon(@Args('id') id: number): Promise<Pokemon> {
    return this.pokemonsService.findOne(id);
  }

  @Query(() => Pokemon)
  async importPokemonById(@Args('id') id: number): Promise<Pokemon> {
    return this.pokemonsService.importPokemonById(id);
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

  @ResolveField(() => [Type]) 
  async types(@Root() pokemon: Pokemon): Promise<Type[]> {
    const result = await this.typesLoader.load(pokemon.id);
    return result;
  }

}