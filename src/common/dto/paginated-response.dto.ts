// src/common/dto/paginated-response.dto.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsArray, IsInt, Min } from 'class-validator';

export function PaginatedResponse<T>(classRef: new () => T) {
  @ObjectType({ isAbstract: true }) // Mark as abstract to allow extension
  abstract class PaginatedResponseClass {
    @IsArray()
    @Field(() => [classRef], { description: 'List of items' }) // Explicitly define the type of `data`
    data: T[];
    
    @IsInt()
    @Min(0)
    @Field(() => Int, { description: 'Total number of items' })
    total: number;

    @IsInt()
    @Min(1)
    @Field(() => Int, { description: 'Current page number' })
    page: number;

    @IsInt()
    @Min(1)
    @Field(() => Int, { description: 'Number of items per page' })
    itemsPerPage: number;

    constructor(data: T[], total: number, page: number, itemsPerPage: number) {
      this.data = data;
      this.total = total;
      this.page = page;
      this.itemsPerPage = itemsPerPage;
    }
  }

  return PaginatedResponseClass;
}