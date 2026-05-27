import Redis from "ioredis";

declare global {
  var redis: Redis | undefined;
}

export function getRedis() {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error("REDIS_URL environment variable is required");
  }

  if (!globalThis.redis) {
    globalThis.redis = new Redis(redisUrl, {
      connectTimeout: 10_000,
      maxRetriesPerRequest: 2,
    });

    globalThis.redis.on("error", (error) => {
      console.error("Redis connection error:", error);
    });
  }

  return globalThis.redis;
}
