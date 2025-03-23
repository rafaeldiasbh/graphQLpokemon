
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class PaginationOptionsDto {
    page: number;
    itemsPerPage: number;
}

export class SortOptionsDto {
    field: string;
    order: string;
}

export class FilterOptionsDto {
    field: string;
    value: string;
    operator?: Nullable<string>;
}

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
    types: Type[];
    created_at: string;
}

export class PokemonPaginatedResponse {
    data: Pokemon[];
    total: number;
    page: number;
    itemsPerPage: number;
}

export abstract class IQuery {
    abstract hello(): string | Promise<string>;

    abstract findAllPokemon(pagination?: Nullable<PaginationOptionsDto>, sort?: Nullable<SortOptionsDto>, filters?: Nullable<FilterOptionsDto[]>): PokemonPaginatedResponse | Promise<PokemonPaginatedResponse>;

    abstract findOnePokemon(id: number): Pokemon | Promise<Pokemon>;

    abstract findAllTypes(): Type[] | Promise<Type[]>;

    abstract findOneType(id: number): Type | Promise<Type>;
}

export abstract class IMutation {
    abstract createOnePokemon(input: CreatePokemonDto): Pokemon | Promise<Pokemon>;

    abstract updateOnePokemon(id: number, input: UpdatePokemonDto): Pokemon | Promise<Pokemon>;

    abstract deleteOnePokemon(id: number): Pokemon | Promise<Pokemon>;

    abstract importPokemonById(id: number): Pokemon | Promise<Pokemon>;

    abstract createType(input: CreateTypeDto): Type | Promise<Type>;

    abstract updateType(id: number, input: UpdateTypeDto): Type | Promise<Type>;

    abstract removeType(id: number): Type | Promise<Type>;
}

type Nullable<T> = T | null;
