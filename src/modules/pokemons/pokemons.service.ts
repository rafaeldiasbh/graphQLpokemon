// src/modules/pokemons/pokemons.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { TypesService } from '../types/types.service';
import { FilterOptionsDto } from '../../common/dto/filter-options.dto';
import { SortOptionsDto } from '../../common/dto/sort-options.dto';
import { PaginationOptionsDto } from '../../common/dto/pagination-options.dto';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    private readonly typesService: TypesService, // Inject TypesService
  ) {}

  async findAll(
    pagination?: PaginationOptionsDto,
    sort?: SortOptionsDto,
    filters?: FilterOptionsDto[],
  ): Promise<{ data: Pokemon[]; total: number }> {
    return Pokemon.findWithPagination(
      this.pokemonRepository,
      pagination,
      sort,
      filters,
      // (query) => { //callback funtion to run additional non standart queries.
      //   query.leftJoinAndSelect('entity.types', 'types'); // Add the join for the `types` table
      // }, //removed to prevent eager loading
    );
  }

  async findOne(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({
      where: { id },
      relations: ['types'], // Include the related types
    });

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }

    return pokemon;
  }

  async findByIds(ids: number[]): Promise<Pokemon[]> {
    return this.pokemonRepository.find({
      where: { id: In(ids) }, 
      relations: ['types'], 
    });
  }

  async createOne(input: CreatePokemonDto): Promise<Pokemon> {
    const pokemon = this.pokemonRepository.create(input);

    if (input.typeIds) {
      const types = await this.typesService.findByIds(input.typeIds); 
      pokemon.types = types;
    }

    return this.pokemonRepository.save(pokemon);
  }

  async updateOne(id: number, input: UpdatePokemonDto): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOneBy({ id });

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }

    if (input.name) {
      pokemon.name = input.name;
    }

    if (input.typeIds) {
      const types = await this.typesService.findByIds(input.typeIds); 
      pokemon.types = types;
    }

    return this.pokemonRepository.save(pokemon);
  }

  async deleteOne(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOneBy({ id });

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }

    await this.pokemonRepository.delete(id);
    return pokemon;
  }

  async importPokemonById(id: number): Promise<Pokemon> {
    const pokemonApiUri = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const response = await fetch(pokemonApiUri);
    if (!response.ok) {
      throw new NotFoundException(`Pokemon with ID ${id} not found in PokeAPI`);
    }

    const pokemonData = await response.json();

    const pokemon = new Pokemon();
    pokemon.id = pokemonData.id;
    pokemon.name = pokemonData.name;

    // Handle types
    const typeNames = pokemonData.types.map((type) => type.type.name);
    const types = await this.typesService.findOrCreateTypesByName(typeNames);
    pokemon.types = types;
    
    // create or update the pokemon
    return this.pokemonRepository.save(pokemon);
    
  }
}