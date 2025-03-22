// src/types/types.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './entities/type.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async findByNames(names: string[]): Promise<Type[]> {
    return this.typeRepository.find({ where: names.map((name) => ({ name })) });
  }
}