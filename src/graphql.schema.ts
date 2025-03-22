
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreatePokemonDto {
    name: string;
    typeIds: number[];
}

export class UpdatePokemonDto {
    id: number;
}

export class CreateTypeDto {
    name: string;
}

export class UpdateTypeDto {
    name?: Nullable<string>;
    id: number;
}

export class Type {
    id: number;
    name: string;
    pokemons?: Nullable<Pokemon[]>;
    created_at: string;
}

export class Pokemon {
    id: number;
    name: string;
    types?: Nullable<Type[]>;
    created_at: string;
}

export abstract class IQuery {
    abstract hello(): string | Promise<string>;

    abstract pokemons(): Pokemon[] | Promise<Pokemon[]>;

    abstract pokemon(id: number): Pokemon | Promise<Pokemon>;

    abstract findAllTypes(): Type[] | Promise<Type[]>;

    abstract findOneType(id: number): Type | Promise<Type>;
}

export abstract class IMutation {
    abstract createPokemon(createPokemonDto: CreatePokemonDto): Pokemon | Promise<Pokemon>;

    abstract updatePokemon(updatePokemonDto: UpdatePokemonDto): Pokemon | Promise<Pokemon>;

    abstract removePokemon(id: number): Pokemon | Promise<Pokemon>;

    abstract createType(input: CreateTypeDto): Type | Promise<Type>;

    abstract updateType(id: number, input: UpdateTypeDto): Type | Promise<Type>;

    abstract removeType(id: number): Type | Promise<Type>;
}

type Nullable<T> = T | null;
