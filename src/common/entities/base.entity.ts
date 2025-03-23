// src/common/entities/base.entity.ts
import { Repository, SelectQueryBuilder } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PaginationOptionsDto } from '../dto/pagination-options.dto';
import { FilterOptionsDto } from '../dto/filter-options.dto';
import { SortOptionsDto } from '../dto/sort-options.dto';

export class BaseEntity {
  static applyFilters<T>(
    query: SelectQueryBuilder<T>,
    repository: Repository<T>,
    filters?: FilterOptionsDto[],
  ): SelectQueryBuilder<T> {
    if (filters && filters.length > 0) {
      const validFields = repository.metadata.columns.map((column) => column.propertyName);

      filters.forEach((filter) => {
        const { field, value, operator = '=' } = filter;

        // Validate the field to prevent SQL injection
        if (!validFields.includes(field)) {
          throw new NotFoundException(`Invalid filter field: ${field}`);
        }

        switch (operator) {
          case '=':
          case '!=':
          case '>':
          case '<':
          case '>=':
          case '<=':
            query.andWhere(`entity.${field} ${operator} :value`, { value });
            break;

          case 'BETWEEN':
            if (Array.isArray(value) && value.length === 2) {
              query.andWhere(`entity.${field} BETWEEN :value1 AND :value2`, {
                value1: value[0],
                value2: value[1],
              });
            } else {
              throw new Error('BETWEEN operator requires an array of two values.');
            }
            break;

          case 'LIKE':
            query.andWhere(`entity.${field} LIKE :value`, { value: `%${value}%` });
            break;

          case 'IN':
            if (Array.isArray(value)) {
              query.andWhere(`entity.${field} IN (:...values)`, { values: value });
            } else {
              throw new Error('IN operator requires an array of values.');
            }
            break;

          case 'NOT IN':
            if (Array.isArray(value)) {
              query.andWhere(`entity.${field} NOT IN (:...values)`, { values: value });
            } else {
              throw new Error('NOT IN operator requires an array of values.');
            }
            break;

          default:
            throw new Error(`Unsupported operator: ${operator}`);
        }
      });
    }
    return query;
  }

  static applySorting<T>(
    query: SelectQueryBuilder<T>,
    repository: Repository<T>,
    sort?: SortOptionsDto,
  ): SelectQueryBuilder<T> {
    if (sort) {
      const validFields = repository.metadata.columns.map((column) => column.propertyName);
      if (!validFields.includes(sort.field)) {
        throw new NotFoundException(`Invalid sort field: ${sort.field}`);
      }
      query.orderBy(`entity.${sort.field}`, sort.order);
    }
    return query;
  }

  static applyPagination<T>(
    query: SelectQueryBuilder<T>,
    pagination?: PaginationOptionsDto,
  ): SelectQueryBuilder<T> {
    if (pagination) {
      const { page, itemsPerPage } = pagination;
      const skip = (page - 1) * itemsPerPage;
      query.skip(skip).take(itemsPerPage);
    }
    return query;
  }

  static applyConditions<T>(
    repository: Repository<T>,
    pagination?: PaginationOptionsDto,
    sort?: SortOptionsDto,
    filters?: FilterOptionsDto[],
  ): SelectQueryBuilder<T> {
    const query = repository.createQueryBuilder('entity');
    this.applyFilters(query, repository, filters);
    this.applySorting(query, repository, sort);
    this.applyPagination(query, pagination);
    return query;
  }

  static async findWithPagination<T>(
    repository: Repository<T>,
    pagination?: PaginationOptionsDto, // Use PaginationOptionsDto
    sort?: SortOptionsDto, // Use SortOptionsDto
    filters?: FilterOptionsDto[], // Use FilterOptionsDto
    modifyQuery?: (query: SelectQueryBuilder<T>) => void, //Execute extra query commands afer base query
  ): Promise<{ data: T[]; total: number }> {
    const query = this.applyConditions(repository, pagination, sort, filters);
    if (modifyQuery) {
      modifyQuery(query); //run aditional non generic queries
    }
    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }
}