// src/common/dto/sort-options.dto.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SortOptionsDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'The field to sort by' })
  field: string;

  
  @IsString()
  @IsIn(['ASC', 'DESC'], { message: 'Order must be either "ASC" or "DESC"' })
  @Field(() => String, { description: 'The sort order (ASC or DESC)' })
  order: 'ASC' | 'DESC';
}