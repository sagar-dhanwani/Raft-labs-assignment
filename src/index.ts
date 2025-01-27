import createApp from './app';
import { ApolloServer, ServerRegistration } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './modules/auth/resolvers/auth.resolvers';
import { UserResolver } from './modules/users/resolvers/userResolvers';

import dotenv from 'dotenv';
import { authChecker } from './middleware/auth';
import express from 'express';
import connectToDatabase from './config/database';
import logger from './utils/logger';

dotenv.config();

const startServer = async () => {
  const app: express.Application = createApp();

  // Connect to MongoDB
  await connectToDatabase();

  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver],
    authChecker,
  });

  // Setup Apollo Server
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });

  await server.start();

  // Apply the Apollo GraphQL middleware and set the path to /graphql
  server.applyMiddleware({ app, path: '/graphql' } as unknown as ServerRegistration);

  // Start the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer().catch((error) => {
  logger.error('Error starting server:', error);
});
