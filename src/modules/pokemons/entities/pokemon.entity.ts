// src/modules/pokemons/entities/pokemon.entity.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Type } from '../../types/entities/type.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

@ObjectType()
@Entity()
export class Pokemon extends BaseEntity {
  @Field(() => Int) // GraphQL field
  @PrimaryGeneratedColumn() // TypeORM column
  id: number;

  @Field(() => String) // GraphQL field
  @Column()  // TypeORM column
  name: string;

  @ManyToMany(() => Type, (type) => type.pokemons)
  @JoinTable()
  @Field(() => [Type])
  types: Type[];

  @Field(() => String)
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;
}

