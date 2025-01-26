// src/utils/redis.ts
import Redis from "ioredis";

const redis = new Redis();

export const cacheResource = async (key: string, value: string, ttl: number) => {
  await redis.set(key, value, "EX", ttl);
};

export const getCachedResource = async (key: string) => {
  return await redis.get(key);
};
