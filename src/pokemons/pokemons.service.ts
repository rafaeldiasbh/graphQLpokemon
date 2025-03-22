import { Injectable } from '@nestjs/common';
import { CreatePokemonInput } from './dto/create-pokemon.input';
import { UpdatePokemonInput } from './dto/update-pokemon.input';

@Injectable()
export class PokemonsService {
  create(createPokemonInput: CreatePokemonInput) {
    return 'This action adds a new pokemon';
  }

  findAll() {
    return `This action returns all pokemons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonInput: UpdatePokemonInput) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
