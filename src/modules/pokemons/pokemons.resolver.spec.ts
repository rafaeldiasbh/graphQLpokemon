import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonsResolver } from './pokemons.resolver';
import { PokemonsService } from './pokemons.service';
import { TypesService } from '../types/types.service';
import { Pokemon } from './entities/pokemon.entity';
import { Type } from '../types/entities/type.entity';
import { PokemonPaginatedResponse } from './dto/pokemon-paginated-response.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationOptionsDto } from '../../common/dto/pagination-options.dto';
import { SortOptionsDto } from '../../common/dto/sort-options.dto';
import { FilterOptionsDto } from '../../common/dto/filter-options.dto';
import { TypeOrmSQLITETestingModule } from '../../../database/test-database.module';

describe('PokemonsResolver (E2E Style No Service Mocking)', () => {
  let resolver: PokemonsResolver;
  let pokemonsService: PokemonsService;
  let typesService: TypesService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmSQLITETestingModule([Pokemon, Type]), // Use an in-memory database
        TypeOrmModule.forFeature([Pokemon, Type]),
      ],
      providers: [PokemonsResolver, PokemonsService, TypesService],
    }).compile();

    resolver = module.get<PokemonsResolver>(PokemonsResolver);
    pokemonsService = module.get<PokemonsService>(PokemonsService);
    typesService = module.get<TypesService>(TypesService);
  });

  afterAll(async () => {
    await module.close(); // Close the testing module and database connection
  });

  beforeEach(async () => {
    // Clear the database before each test
    await module.get('PokemonRepository').clear();
    await module.get('TypeRepository').clear();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(pokemonsService).toBeDefined();
    expect(typesService).toBeDefined();
  });

  describe('findAllPokemon', () => {
    it('should return a paginated response of pokemons', async () => {
      // Seed the database with test data
      const type = await typesService.createOne({ name: 'ELETRIC' });
      await pokemonsService.createOne({ name: 'Pikachu', typeIds: [type.id] });

      const pagination: PaginationOptionsDto = { page: 1, itemsPerPage: 10 };
      const sort: SortOptionsDto = { field: 'name', order: 'ASC' };
      const filters: FilterOptionsDto[] = [
        { field: 'name', value: 'Pikachu', operator: '=' },
      ];

      const result = await resolver.findAllPokemon(pagination, sort, filters);

      expect(result).toBeInstanceOf(PokemonPaginatedResponse);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe('Pikachu');
      expect(result.total).toBe(1);
    });
  });

  describe('findOnePokemon', () => {
    it('should return a pokemon by id', async () => {
      // Seed the database with test data
      const type = await typesService.createOne({ name: 'ELETRIC' });
      const pokemon = await pokemonsService.createOne({
        name: 'Pikachu',
        typeIds: [type.id],
      });

      const result = await resolver.findOnePokemon(pokemon.id);

      expect(result).toBeDefined();
      expect(result.name).toBe('Pikachu');
      expect(result.types).toHaveLength(1);
      expect(result.types[0].name).toBe('ELETRIC');
    });

    it('should throw NotFoundException if pokemon is not found', async () => {
      await expect(resolver.findOnePokemon(999)).rejects.toThrow(
        'Pokemon with ID 999 not found',
      );;
    });
  });

  describe('createOnePokemon', () => {
    it('should create and return a new pokemon', async () => {
      const type = await typesService.createOne({ name: 'ELETRIC' });
      const input: CreatePokemonDto = { name: 'Pikachu', typeIds: [type.id] };

      const result = await resolver.createOnePokemon(input);

      expect(result).toBeDefined();
      expect(result.name).toBe('Pikachu');
      expect(result.types).toHaveLength(1);
      expect(result.types[0].name).toBe('ELETRIC');
    });
  });

  describe('updateOnePokemon', () => {
    it('should update and return a pokemon', async () => {
      const type = await typesService.createOne({ name: 'ELETRIC' });
      const pokemon = await pokemonsService.createOne({
        name: 'Pikachu',
        typeIds: [type.id],
      });

      const input: UpdatePokemonDto = { id: pokemon.id, name: 'Raichu' };

      const result = await resolver.updateOnePokemon(pokemon.id, input);

      expect(result).toBeDefined();
      expect(result.name).toBe('Raichu');
    });

    it('should throw NotFoundException if pokemon is not found', async () => {
      const input: UpdatePokemonDto = { id: 999, name: 'Unknown' };

      await expect(resolver.updateOnePokemon(999, input)).rejects.toThrowError(
        'Pokemon with ID 999 not found',
      );
    });
  });

  describe('deleteOnePokemon', () => {
    it('should delete and return a pokemon', async () => {
      const type = await typesService.createOne({ name: 'ELETRIC' });
      const pokemon = await pokemonsService.createOne({
        name: 'Pikachu',
        typeIds: [type.id],
      });

      const result = await resolver.deleteOnePokemon(pokemon.id);

      expect(result).toBeDefined();
      expect(result.name).toBe('Pikachu');
    });

    it('should throw NotFoundException if pokemon is not found', async () => {
      await expect(resolver.deleteOnePokemon(999)).rejects.toThrowError(
        'Pokemon with ID 999 not found',
      );
    });
  });

  describe('types', () => {
    it('should return types for a pokemon', async () => {
      const type = await typesService.createOne({ name: 'ELETRIC' });
      const pokemon = await pokemonsService.createOne({
        name: 'Pikachu',
        typeIds: [type.id],
      });

      const result = await resolver.types(pokemon);

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('ELETRIC');
    });
  });
});