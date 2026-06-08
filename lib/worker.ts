import { loadEnvConfig } from "@next/env";
import { prisma } from "@/lib/prisma";

loadEnvConfig(process.cwd());

async function processJob(job: { id: string; fileUrl: string }) {
  console.log("Processing job:", job.id, job.fileUrl);
}

async function claimJob() {
  const job = await prisma.job.findFirst({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
  });

  if (!job) return null;

  const claimed = await prisma.job.update({
    where: {
      id: job.id,
      status: "PENDING",
    },
    data: {
      status: "PROCESSING",
    },
  });

  if (!claimed) return null;

  return job;
}

async function main() {
  while (true) {
    const job = await claimJob();

    if (!job) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      continue;
    }

    try {
      await processJob(job);

      const updatedJob = await prisma.job.update({
        where: {
          id: job.id,
        },
        data: {
          status: "COMPLETED",
        },
      });

      console.log("Job completed", updatedJob);
    } catch (error) {
      console.error("Job failed", job.id, error);

      await prisma.job.update({
        where: { id: job.id },
        data: { status: "FAILED" },
      });
    }
  }
}

main();
