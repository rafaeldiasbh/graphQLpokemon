import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType() // GraphQL type
@Entity() // TypeORM entity
export class Pokemon {
  @Field(() => Int) // GraphQL field
  @PrimaryGeneratedColumn() // TypeORM column
  id: number;

  @Field(() => String) // GraphQL field
  @Column() // TypeORM column
  name: string;

  @Field(() => String)
  @Column() 
  type: string;

  @Field(() => String) // GraphQL field
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) 
  created_at: Date;
}