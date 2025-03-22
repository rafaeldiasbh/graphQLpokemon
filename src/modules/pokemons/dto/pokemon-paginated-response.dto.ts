// src/modules/pokemons/dto/pokemon-paginated-response.dto.ts
import { ObjectType } from '@nestjs/graphql';
import { PaginatedResponse } from '../../../common/dto/paginated-response.dto';
import { Pokemon } from '../entities/pokemon.entity';

@ObjectType()
export class PokemonPaginatedResponse extends PaginatedResponse(Pokemon) {}