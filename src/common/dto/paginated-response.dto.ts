// src/common/dto/paginated-response.dto.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

export function PaginatedResponse<T>(classRef: new () => T) {
  @ObjectType({ isAbstract: true }) // Mark as abstract to allow extension
  abstract class PaginatedResponseClass {
    @Field(() => [classRef], { description: 'List of items' }) // Explicitly define the type of `data`
    data: T[];

    @Field(() => Int, { description: 'Total number of items' })
    total: number;

    @Field(() => Int, { description: 'Current page number' })
    page: number;

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