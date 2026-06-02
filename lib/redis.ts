import type { ConnectionOptions } from "bullmq";

export function createRedisConnection(): ConnectionOptions {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error("REDIS_URL is not set");
  }

  return {
    url: redisUrl,
    maxRetriesPerRequest: null,
  };
}
