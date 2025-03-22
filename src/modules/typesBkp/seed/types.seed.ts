import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from '../entities/type.entity';

@Injectable()
export class TypesSeed implements OnModuleInit {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async onModuleInit() {
    const types = [
       'NORMAL',
       'FIRE',
       'WATER',
       'ELECTRIC',
       'GRASS',
       'ICE',
       'FIGHTING',
       'POISON',
       'GROUND',
       'FLYING',
       'PSYCHIC',
       'BUG',
       'ROCK',
       'GHOST',
       'DRAGON',
       'DARK',
       'STEEL',
       'FAIRY',
    ];

    for (const name of types) {
      const typeExists = await this.typeRepository.findOneBy({ name });
      if (!typeExists) {
        await this.typeRepository.save({ name });
      }
    }
  }
}