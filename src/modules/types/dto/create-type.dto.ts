// src/modules/types/dto/create-type.dto.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string;
}