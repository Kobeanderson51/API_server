# API_server# Collectible Card Game API Server

## Overview

This project involves building an Express.js API server for a fictional collectible card game. The server is designed to handle authentication, CRUD operations for cards, and token-based authorization.

## Requirements

### Authentication Endpoint (15 points)

Implement a `/getToken` endpoint that:

- Accepts a username and password.
- Validates the credentials against a user JSON file.
- Returns a JSON Web Token (JWT) upon successful authentication.
- Returns a 401 status code with an error message if authentication fails.

### Card Management Endpoints (45 points)

Implement a `/cards` endpoint supporting the following functionalities:

- Retrieve all cards with optional query parameters for filtering (8 points).
  - Filtering supports equality matches.
  - Example: `http://localhost:3000/cards?set=Base%20Set&type=Creature&rarity=Common`
- Create a new card at the `/cards/create` endpoint (8 points).
  - Creates a new card using information from the request body.
  - Ensures cardIds are unique.
- Update an existing card using the `/cards/:id` (PUT) endpoint (7 points).
  - Updates a card using information from the request body and the id in the request params.
  - Ensures cardIds are unique.
- Delete an existing card using the `/cards/:id` (DELETE) endpoint (7 points).
  - Deletes a card using the id in the request params.
  - Create, update, and delete endpoints are protected; accessible only with a valid JWT.
  - All endpoints return either an errorMessage or a successMessage along with the created/updated/deleted object.

### File Operations (10 points)

Utilize file operations for reading and writing card data to a JSON file:

- Ensures file operations do not compromise data integrity and correctly persist data.

### Authentication Middleware (10 points)

Implement middleware to validate incoming JWT tokens for protected routes:

- Respond appropriately to unauthorized requests.
- Store the JWT signing secret in a `.env` file (not included in the Git repo).

### Error Handling (10 points)

Implement error handling middleware that:

- Returns a 401 status code for invalid tokens.
- Returns a 500 status code for other errors.
- Includes descriptive error messages in all cases.

### Additional Features (Optional - up to 10 points)

Implement extra functionality through additional endpoints:

- Get Sets: `GET /sets` - Retrieve a list of all card sets available.
- Get Types: `GET /types` - Retrieve a list of all card types available.
- Get Rarities: `GET /rarities` - Retrieve a list of all card rarities available.
- Get Card Count: `GET /cards/count` - Retrieve the total number of cards.
- Get Random Card: `GET /cards/random` - Retrieve information about a randomly selected card.