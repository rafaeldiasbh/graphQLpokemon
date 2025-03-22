// src/modules/types/entities/type.entity.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';
import { Pokemon } from '../../pokemons/entities/pokemon.entity';

@ObjectType()
@Entity()
export class Type {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ unique: true }) // Ensure the name is unique
  name: string;

  @ManyToMany(() => Pokemon, (pokemon) => pokemon.types) 
  @Field(() => [Pokemon], { nullable: true }) 
  pokemons?: Pokemon[];

  @Field(() => String)
  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) 
  created_at?: Date;
}