// src/common/loaders/types.loader.ts
import * as DataLoader from 'dataloader';
import { TypesService } from '../../modules/types/types.service';
import { Type } from '../../modules/types/entities/type.entity';

export function createTypesLoader(typesService: TypesService) {
  return new DataLoader<number, Type[]>(async (pokemonIds) => {
    const mutablePokemonIds = [...pokemonIds];

    const types = await typesService.findByPokemonIds(mutablePokemonIds);
    // Map Pokémon IDs to their types
    return pokemonIds.map((id) => types.filter((type) => type.pokemons.some((pokemon) => pokemon.id === id)));
  });
}