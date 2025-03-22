import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsResolver } from './pokemons.resolver';
import { PokemonsService } from './pokemons.service';

describe('PokemonsResolver', () => {
  let resolver: PokemonsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonsResolver, PokemonsService],
    }).compile();

    resolver = module.get<PokemonsResolver>(PokemonsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
