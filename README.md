# Pokémon GraphQL API

This is a **NestJS** and **GraphQL** API for managing Pokémon data. It uses **TypeORM** with an **SQLite** database and provides CRUD operations, pagination, sorting, filtering, and rate limiting. The API is designed to be scalable, maintainable, and secure.

---

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
   - [Queries](#queries)
   - [Mutations](#mutations)
4. [Key Features Explained](#key-features-explained)
   - [Pagination](#pagination)
   - [Sorting](#sorting)
   - [Filtering](#filtering)
   - [SQL Injection Protection](#sql-injection-protection)
   - [Rate Limiting](#rate-limiting)
   - [Input Validation](#input-validation)
5. [Project Architecture](#project-architecture)
   - [Modular Design](#modular-design)
   - [Scalability](#scalability)
6. [To-Do and Improvements](#to-do-and-improvements)
   - [To-Do](#to-do)
   - [Improvements](#improvements)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

- **CRUD Operations**: Create, read, update, and delete Pokémon.
- **Pagination**: Fetch Pokémon in pages with customizable page size.
- **Sorting**: Sort Pokémon by any field (e.g., `name` in ascending or descending order).
- **Filtering**: Filter Pokémon using SQL-like operators (`=`, `!=`, `>`, `<`, `LIKE`, `IN`, `BETWEEN`, etc.).
- **Rate Limiting**: Protect the API from abuse with rate limiting.
- **Input Validation**: Ensure data integrity with `class-validator`.
- **Scalable Architecture**: Modular design with separation of concerns.

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - The project uses SQLite for simplicity. The database file will be created automatically at `./database/database_orm.sqlite`.

4. **Run the application**:
   ```bash
   npm run start
   ```

5. **Access the GraphQL Playground**:
   - Open your browser and navigate to [http://localhost:4000/graphql](http://localhost:4000/graphql).
   - Use the GraphQL Playground to interact with the API.

---

## Usage

### Queries

#### Fetch All Pokémon with Pagination, Sorting, and Filtering
```graphql
query {
  findAllPokemon(
    pagination: { page: 1, itemsPerPage: 10 }
    sort: { field: "name", order: "ASC" }
    filters: [
      { field: "name", value: "Pikachu", operator: "=" }
      { field: "type", value: "Electric", operator: "LIKE" }
    ]
  ) {
    data {
      id
      name
      types {
        id
        name
      }
    }
    total
    page
    itemsPerPage
  }
}
```

#### Fetch a Single Pokémon by ID
```graphql
query {
  findOnePokemon(id: 1) {
    id
    name
    types {
      id
      name
    }
  }
}
```

### Mutations

#### Create a Pokémon
```graphql
mutation {
  createOnePokemon(input: { name: "Pikachu", typeIds: [1] }) {
    id
    name
    types {
      id
      name
    }
  }
}
```

#### Update a Pokémon
```graphql
mutation {
  updateOnePokemon(id: 1, input: { name: "Raichu" }) {
    id
    name
    types {
      id
      name
    }
  }
}
```

#### Delete a Pokémon
```graphql
mutation {
  deleteOnePokemon(id: 1) {
    id
    name
  }
}
```

## Key Features Explained

### Pagination
- Use the `pagination` argument to fetch data in chunks.
- Example: `pagination: { page: 1, itemsPerPage: 10 }` fetches the first 10 Pokémon.

### Sorting
- Use the `sort` argument to sort results by a specific field.
- Example: `sort: { field: "name", order: "ASC" }` sorts Pokémon by name in ascending order.

### Filtering
- Use the `filters` argument to filter results using SQL-like operators.
- Supported operators: `=`, `!=`, `>`, `<`, `>=`, `<=`, `LIKE`, `IN`, `NOT IN`, `BETWEEN`.
- Example: `filters: [{ field: "name", value: "Pikachu", operator: "=" }]` filters Pokémon by name.

#### SQL Injection Protection
- The `filters` argument is validated against the entity metadata to ensure only valid fields are used.
- This prevents SQL injection by restricting filter fields to those defined in the `Pokemon` entity.

### Rate Limiting
- The API is protected by rate limiting (10 requests per minute per IP address).
- Exceeding the limit will result in a `429 Too Many Requests` response.

### Input Validation
- All inputs are validated using `class-validator`.
- Example: The `CreatePokemonDto` ensures that `name` is a non-empty string and `typeIds` is an array of valid numbers.

---

## Project Architecture

### Modular Design
- The project is organized into modules (`pokemons`, `types`, etc.), each with its own:
  - **Entities**: Define the database schema.
  - **DTOs**: Validate input data.
  - **Resolvers**: Handle GraphQL queries and mutations.
  - **Services**: Contain business logic and interact with the database.

### Scalability
- **Separation of Concerns**: Each module is independent, making it easy to add new features or modify existing ones.
- **Code Reusability**: Common functionality (e.g., pagination, filtering) is abstracted into reusable classes like `BaseEntity`.
- **Extensibility**: The use of TypeORM and GraphQL makes it easy to integrate with other databases or APIs.

---

## To-Do and Improvements

### To-Do
1. **Add Unit Tests**:
   - Write unit tests for types module.

2. **Add Authentication**:
   - Implement JWT or equivalent authentication to secure the API.

3. **Enhance Error Handling**:
   - Provide more detailed custom error messages for debugging.

### Improvements
- **Database Migrations**: Disable TypeORM automatic synchronize and use migrations to manage database schema changes.
- **Logging**: Add logging to monitor API usage and errors.
- **Deployment**: Dockerize the application for easy deployment.

---