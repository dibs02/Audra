import { loadEnvConfig } from "@next/env";
import fs from "node:fs/promises";
import path from "node:path";

loadEnvConfig(process.cwd());

let prisma: Awaited<typeof import("@/lib/prisma")>["prisma"];

async function processJob(job: { id: string; fileUrl: string }) {
  console.log("Processing job:", job.id, job.fileUrl);

  const response = await fetch(job.fileUrl);
  const arrayBuffer = await response.arrayBuffer();

  const inputPath = path.join(process.cwd(), "/tmp", "/input.mp4");

  await fs.mkdir(path.dirname(inputPath), { recursive: true });

  await fs.writeFile(inputPath, Buffer.from(arrayBuffer));
}

async function claimJob() {
  const job = await prisma.job.findFirst({
    where: {
      status: {
        in: ["PENDING", "FAILED"],
      },
    },
    orderBy: { createdAt: "asc" },
  });

  if (!job) return null;

  const claimed = await prisma.job.updateMany({
    where: {
      id: job.id,
      status: {
        in: ["PENDING", "FAILED"],
      },
    },
    data: {
      status: "PROCESSING",
    },
  });

  if (claimed.count === 0) return null;

  return job;
}

async function main() {
  ({ prisma } = await import("@/lib/prisma"));

  while (true) {
    const job = await claimJob();

    if (!job) {
      console.log("No pending jobs found");
      break;
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

main()
  .catch((error) => {
    console.error("Worker failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma?.$disconnect();
  });
