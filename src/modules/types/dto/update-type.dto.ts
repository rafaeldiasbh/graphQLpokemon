import { CreateTypeDto } from './create-type.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTypeDto extends PartialType(CreateTypeDto) {
  @Field(() => Int)
  id: number;
}
