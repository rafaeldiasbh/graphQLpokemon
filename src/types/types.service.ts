import { Injectable } from '@nestjs/common';
import { CreateTypeInput } from './dto/create-type.input';
import { UpdateTypeInput } from './dto/update-type.input';

@Injectable()
export class TypesService {
  create(createTypeInput: CreateTypeInput) {
    return 'This action adds a new type';
  }

  findAll() {
    return `This action returns all types`;
  }

  findOne(id: number) {
    return `This action returns a #${id} type`;
  }

  update(id: number, updateTypeInput: UpdateTypeInput) {
    return `This action updates a #${id} type`;
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
