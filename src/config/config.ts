export const config = {
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/graphql_api',
  };
  