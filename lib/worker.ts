import { loadEnvConfig } from "@next/env";
import { Worker, Job } from "bullmq";
import { createRedisConnection } from "./redis";

loadEnvConfig(process.cwd());

const worker = new Worker(
  "videoqueue",
  async (job: Job) => {
    await job.updateProgress(42);

    return "Job processed";
  },
  {
    connection: createRedisConnection(),
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
  console.log(job.data);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});
