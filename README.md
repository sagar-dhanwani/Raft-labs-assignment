# Raft Labs Assignment

A robust GraphQL API developed with Node.js, Express, TypeScript, and MongoDB for Raft Labs assignment. This project includes real-time communication using WebSockets, JWT authentication, and API documentation using Swagger.

## Table of Contents
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Postman Collection](#postman-collection)
- [License](#license)

## Project Structure

Raft-labs-assignment/ ├── src/ │ ├── app.ts │ ├── config/ │ │ ├── config.ts │ │ ├── database.ts │ │ └── swagger.ts │ ├── middleware/ │ │ ├── auth.ts │ │ └── socketAuth.ts │ ├── modules/ │ │ ├── auth/ │ │ │ ├── resolvers/ │ │ │ │ ├── auth.resolvers.ts │ │ │ │ └── authResponse.ts │ │ │ └── services/ │ │ │ └── authService.ts │ │ ├── users/ │ │ │ ├── resolvers/ │ │ │ │ └── userResolvers.ts │ │ │ ├── schema/ │ │ │ │ └── userSchema.ts │ │ │ └── services/ │ │ │ └── userServices.ts │ ├── utils/ │ │ └── logger.ts │ └── index.ts ├── .env ├── Dockerfile ├── docker-compose.yml ├── package.json ├── tsconfig.json └── README.md

## Getting Started
### Prerequisites
- Node.js
- Docker
- Docker Compose

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/raft-labs-assignment.git
   cd raft-labs-assignment

2. Install dependencies:
npm install

3. Create a .env file in the root directory with the following content:
JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb://mongo:27017/raft-labs-db

Environment Variables
Ensure that the following environment variables are set:

JWT_SECRET: The secret key for JWT authentication.
MONGO_URI: The MongoDB connection URI.
Running the Project
To run the project, use the following commands:

docker-compose up --build

This will build and start the Docker containers for the application and MongoDB.

API Documentation
The API documentation is available at http://localhost:4000/api-docs.

Postman Collection
A Postman collection for all the APIs is included in the project. You can import the collection into Postman using the following steps:

Open Postman.
Click on the "Import" button.
Select the Raft-Labs-Assignment-API.postman_collection.json file from the postman folder in the project directory.
Click "Import" to add the collection to Postman.