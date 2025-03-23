// src/common/dto/filter-options.dto.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class FilterOptionsDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'The field to filter by' })
  field: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'The value to filter by' })
  value: string;

  @IsOptional()
  @IsIn(['=', '!=', '>', '<', '>=', '<=', 'BETWEEN', 'LIKE', 'IN', 'NOT IN'], {
    message:
      'Operator must be one of: =, !=, >, <, >=, <=, BETWEEN, LIKE, IN, NOT IN',
  })
  @Field(() => String, {
    nullable: true,
    description: 'The operator to use for filtering',
  })
  operator?:
    | '='
    | '!='
    | '>'
    | '<'
    | '>='
    | '<='
    | 'BETWEEN'
    | 'LIKE'
    | 'IN'
    | 'NOT IN';
}