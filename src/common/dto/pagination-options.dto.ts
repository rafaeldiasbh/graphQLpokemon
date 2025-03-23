// src/common/dto/pagination-options.dto.ts
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class PaginationOptionsDto {
  @IsInt()
  @Min(1, { message: 'Page number must be at least 1' })
  @Field(() => Int, {
    defaultValue: 1,
    description: 'Page number (starts from 1)',
  })
  page: number;

  @IsInt()
  @Min(1, { message: 'Items per page must be at least 1' })
  @Field(() => Int, {
    defaultValue: 10,
    description: 'Number of items per page (Defaults to 10)',
  })
  itemsPerPage: number;
}