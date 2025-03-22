// src/common/dto/sort-options.dto.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SortOptionsDto {
  @Field(() => String)
  field: string;

  @Field(() => String)
  order: 'ASC' | 'DESC';
}