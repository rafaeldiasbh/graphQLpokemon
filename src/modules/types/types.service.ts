// src/modules/types/types.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './entities/type.entity';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async create(createTypeDto: CreateTypeDto): Promise<Type> {
    const type = this.typeRepository.create(createTypeDto)[0];
    return this.typeRepository.save(type);
  }

  async findAll(): Promise<Type[]> {
    return this.typeRepository.find();
  }

  async findOne(id: number): Promise<Type> {
    const type = await this.typeRepository.findOneBy({ id });

    if (!type) {
      throw new NotFoundException(`Type with ID ${id} not found`);
    }

    return type;
  }

  async findByIds(ids: number[]): Promise<Type[]> {
    return this.typeRepository.findByIds(ids);
  }

  async update(id: number, updateTypeDto: UpdateTypeDto): Promise<Type> {
    const type = await this.typeRepository.findOneBy({ id });

    if (!type) {
      throw new NotFoundException(`Type with ID ${id} not found`);
    }

    Object.assign(type, updateTypeDto); 
    return this.typeRepository.save(type);
  }

  async remove(id: number): Promise<Type> {
    const type = await this.typeRepository.findOneBy({ id });

    if (!type) {
      throw new NotFoundException(`Type with ID ${id} not found`);
    }

    await this.typeRepository.delete(id);
    return type;
  }
}