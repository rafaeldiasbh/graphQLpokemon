// src/common/dto/filter-options.dto.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FilterOptionsDto {
  @Field(() => String)
  field: string;

  @Field(() => String)
  value: string;

  @Field(() => String, { nullable: true })
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