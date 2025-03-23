// src/common/loaders/pokemons.loader.ts
import * as DataLoader from 'dataloader';
import { PokemonsService } from '../../modules/pokemons/pokemons.service';
import { Pokemon } from '../../modules/pokemons/entities/pokemon.entity';

export function createPokemonsLoader(pokemonsService: PokemonsService) {
  return new DataLoader<number, Pokemon>(async (ids) => {
    const mutableIds = [...ids];

    const pokemons = await pokemonsService.findByIds(mutableIds);
    // Map IDs to Pokémon
    const pokemonMap = new Map(pokemons.map((pokemon) => [pokemon.id, pokemon]));
    return ids.map((id) => pokemonMap.get(id)!);
  });
}