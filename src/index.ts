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
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { verifyToken } from './middleware/socketAuth';

dotenv.config();

const startServer = async () => {
  const app: express.Application = createApp();
  const httpServer = createServer(app);
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

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
    context: ({ req }) => ({ req, io }), // Pass io instance to context
  });

  await server.start();

  // Apply the Apollo GraphQL middleware and set the path to /graphql
  server.applyMiddleware({ app, path: '/graphql' } as unknown as ServerRegistration);

  // Setup Socket.IO
  io.use(verifyToken);
  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    socket.on('joinRoom', (room) => {
      socket.join(room);
      logger.info(`Client ${socket.id} joined room ${room}`);
    });

    socket.on('leaveRoom', (room) => {
      socket.leave(room);
      logger.info(`Client ${socket.id} left room ${room}`);
    });

    socket.on('message', (data) => {
      const { room, message } = data;
      io.to(room).emit('message', message);
      logger.info(`Message sent to room ${room}: ${message}`);
    });

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });

  // Start the server
  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer().catch((error) => {
  logger.error('Error starting server:', error);
});
