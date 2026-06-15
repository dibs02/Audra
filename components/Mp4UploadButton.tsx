"use client";

import { useRef, useState } from "react";

import { useUploadThing } from "@/utils/uploadthing";

type JobResponse = {
  id: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  summary: string | null;
};

function getJobStatusCopy(status: JobResponse["status"]) {
  if (status === "COMPLETED") {
    return {
      eyebrow: "Summary ready",
      title: "Your notes are ready",
      body: null,
    };
  }

  if (status === "FAILED") {
    return {
      eyebrow: "Processing failed",
      title: "Something interrupted this job",
      body: "Try uploading the video again.",
    };
  }

  return {
    eyebrow: "Processing video",
    title: "Preparing your summary",
    body: "Audra is extracting audio, transcribing speech, and shaping the final notes.",
  };
}

export function Mp4UploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollingRef = useRef<number | null>(null);
  const [job, setJob] = useState<JobResponse | null>(null);

  const { startUpload, isUploading } = useUploadThing("videoUploader", {
    onClientUploadComplete: (res) => {
      console.log("Upload complete:", res);
      const jobId = res[0]?.serverData.jobId;

      if (jobId) {
        setJob({ id: jobId, status: "PENDING", summary: null });
        pollJob(jobId);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    onUploadError: (error) => {
      console.error("Upload failed:", error);
      alert(error.message);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (pollingRef.current) {
      window.clearInterval(pollingRef.current);
      pollingRef.current = null;
    }

    setJob(null);
    void startUpload([file]);
  };

  const pollJob = (jobId: string) => {
    const fetchJob = async () => {
      const response = await fetch(`/api/jobs/${jobId}`);
      if (!response.ok) throw new Error("Failed to fetch job");

      const nextJob = (await response.json()) as JobResponse;
      setJob(nextJob);

      if (nextJob.status === "COMPLETED" || nextJob.status === "FAILED") {
        if (pollingRef.current) {
          window.clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
      }
    };

    void fetchJob();
    pollingRef.current = window.setInterval(() => {
      void fetchJob();
    }, 3000);
  };

  const statusCopy = job ? getJobStatusCopy(job.status) : null;

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        className="sr-only"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="upload-button group flex w-48 cursor-pointer items-center justify-center gap-2 rounded-full mb-5 py-3 pl-4 pr-6 transition duration-200 hover:-translate-y-0.5 sm:w-52"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md transition duration-200 group-hover:border-white/30 group-hover:bg-white/15">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M12 16V4" />
            <path d="m7 9 5-5 5 5" />
            <path d="M20 16v4H4v-4" />
          </svg>
        </span>
        <span className="[font-family:var(--font-rosario)] text-base font-bold tracking-wide">
          {isUploading ? "Uploading..." : "Upload"}
        </span>
      </button>
      {job && statusCopy ? (
        <section
          aria-live="polite"
          className="w-full max-w-xl overflow-hidden rounded-lg border border-(--surface-border) bg-(--surface) text-left shadow-[0_12px_32px_rgba(40,21,13,0.06)] backdrop-blur transition-colors duration-300 ease-out"
        >
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/8 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-4">
              <span
                className={[
                  "flex h-3.5 w-3.5 shrink-0 rounded-full ring-4",
                  job.status === "COMPLETED"
                    ? "bg-[#4f8f68] ring-[#4f8f68]/15"
                    : job.status === "FAILED"
                      ? "bg-[#b85c4a] ring-[#b85c4a]/15"
                      : "bg-(--chip-text) ring-(--chip-border)",
                ].join(" ")}
              />

              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-(--chip-text) [font-family:var(--font-rosario)]">
                {statusCopy.eyebrow}
              </p>
            </div>

            <p className="shrink-0 rounded-full border border-(--chip-border) bg-(--chip-bg) px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-(--chip-text) [font-family:var(--font-rosario)]">
              {job.status.toLowerCase()}
            </p>
          </div>

          <div className="px-6 pt-3 pb-7">
            {job.status === "COMPLETED" ? (
              <p className="whitespace-pre-line text-[0.96rem] italic leading-6 text-(--text)">
                {job.summary || "No summary was generated."}
              </p>
            ) : (
              <div className="space-y-4">
                <p className="text-[0.9rem] leading-6 text-(--muted)">
                  {statusCopy.body}
                </p>

                {job.status !== "FAILED" ? (
                  <div className="h-1.5 overflow-hidden rounded-full bg-(--chip-bg)">
                    <div className="h-full w-1/2 rounded-full bg-(--chip-text)" />
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}
