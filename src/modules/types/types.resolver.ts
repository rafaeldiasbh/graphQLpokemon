// src/modules/types/types.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TypesService } from './types.service';
import { Type } from './entities/type.entity';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Resolver(() => Type)
export class TypesResolver {
  constructor(private readonly typesService: TypesService) {}

  @Mutation(() => Type)
  createType(@Args('input') input: CreateTypeDto): Promise<Type> {
    return this.typesService.createOne(input);
  }

  @Query(() => [Type])
  findAllTypes(): Promise<Type[]> {
    return this.typesService.findAll();
  }

  @Query(() => Type)
  findOneType(@Args('id') id: number): Promise<Type> {
    return this.typesService.findOne(id);
  }

  @Mutation(() => Type)
  updateType(
    @Args('id') id: number,
    @Args('input') input: UpdateTypeDto,
  ): Promise<Type> {
    return this.typesService.update(id, input);
  }

  @Mutation(() => Type)
  removeType(@Args('id') id: number): Promise<Type> {
    return this.typesService.remove(id);
  }
}