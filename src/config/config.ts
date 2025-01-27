import dotenv from 'dotenv';

dotenv.config();

export const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'testing',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/raft-labs-db',
};
