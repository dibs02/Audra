import { Queue } from "bullmq";
import { createRedisConnection } from "./redis";

export const videoqueue = new Queue("videoqueue", {
  connection: createRedisConnection(),
});
