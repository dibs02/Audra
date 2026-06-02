/* eslint-disable @typescript-eslint/no-unused-vars */
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { videoqueue } from "@/lib/queue";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
  videoUploader: f({
    video: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
      const job = await videoqueue.add("video", {
        url: file.ufsUrl,
        userId: metadata.userId,
      });
      console.log(job.data);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploaded: true, jobId: job.id };
    }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;
