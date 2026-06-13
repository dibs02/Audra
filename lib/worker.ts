import { loadEnvConfig } from "@next/env";
import fs from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import ffmpeg from "@ffmpeg-installer/ffmpeg";
import { execSync } from "node:child_process";
import { Groq } from "groq-sdk";

loadEnvConfig(process.cwd());

let prisma: Awaited<typeof import("@/lib/prisma")>["prisma"];

async function audioExtract(job: { id: string; fileUrl: string }) {
  console.log("Processing job:", job.id, job.fileUrl);

  const response = await fetch(job.fileUrl);
  const arrayBuffer = await response.arrayBuffer();

  const inputPath = path.join(process.cwd(), "/tmp", "/input.mp4");
  const outputPath = path.join(process.cwd(), "/tmp", "/output.mp3");

  await fs.mkdir(path.dirname(inputPath), { recursive: true });

  await fs.writeFile(inputPath, Buffer.from(arrayBuffer));
  console.log("Video saved");

  await execSync(`"${ffmpeg.path}" -i "${inputPath}" -vn "${outputPath}" -y`);
  console.log("Audio saved");

  return outputPath;
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

async function groqTranscribe(outputPath: string) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const transcription = await groq.audio.transcriptions.create({
    file: createReadStream(outputPath),
    model: "whisper-large-v3-turbo",
    prompt: "Specify context or spelling",
    response_format: "verbose_json",
    timestamp_granularities: ["word", "segment"],
  });

  console.log(transcription.text);
}

async function main() {
  ({ prisma } = await import("@/lib/prisma"));

  while (true) {
    const job = await claimJob();

    if (!job) {
      console.log("No pending jobs found");
      console.log(ffmpeg.version);
      break;
    }

    try {
      const outputPath = await audioExtract(job);

      await groqTranscribe(outputPath);

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
