import { Queue } from "bullmq";

export const videoqueue = new Queue("videoqueue", {
  connection: {
    url: process.env.REDIS_URL,
  },
});
