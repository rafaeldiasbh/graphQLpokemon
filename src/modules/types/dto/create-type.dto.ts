// src/modules/types/dto/create-type.dto.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTypeDto {
  @Field(() => String)
  name: string;
}