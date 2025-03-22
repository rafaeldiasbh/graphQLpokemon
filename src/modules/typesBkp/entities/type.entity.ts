import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Pokemon } from '../../pokemons/entities/pokemon.entity';

@ObjectType()
@Entity()
export class Type {
  @Field(() => String)
  @PrimaryColumn() // Use `typeName` as the primary key
  name: string;

  @ManyToMany(() => Pokemon, (pokemon) => pokemon.types)
  @JoinTable()
  @Field(() => [Pokemon], { nullable: true })
  pokemons: Pokemon[];
}