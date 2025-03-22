import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TypesService } from './types.service';
import { Type } from './entities/type.entity';
import { CreateTypeInput } from './dto/create-type.input';
import { UpdateTypeInput } from './dto/update-type.input';

@Resolver(() => Type)
export class TypesResolver {
  constructor(private readonly typesService: TypesService) {}

  @Mutation(() => Type)
  createType(@Args('createTypeInput') createTypeInput: CreateTypeInput) {
    return this.typesService.create(createTypeInput);
  }

  @Query(() => [Type], { name: 'types' })
  findAll() {
    return this.typesService.findAll();
  }

  @Query(() => Type, { name: 'type' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.typesService.findOne(id);
  }

  @Mutation(() => Type)
  updateType(@Args('updateTypeInput') updateTypeInput: UpdateTypeInput) {
    return this.typesService.update(updateTypeInput.id, updateTypeInput);
  }

  @Mutation(() => Type)
  removeType(@Args('id', { type: () => Int }) id: number) {
    return this.typesService.remove(id);
  }
}
