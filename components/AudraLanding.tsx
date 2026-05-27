import Navbar from "../components/Navbar";
import { Mp4UploadButton } from "./Mp4UploadButton";
import Image from "next/image";

export function AudraLanding() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-(--bg) text-(--text) transition-colors duration-300 ease-out">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-304 w-304 -translate-x-1/2 rounded-full"
          style={{ background: "var(--hero-radial)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-64"
          style={{ background: "var(--hero-bottom-fade)" }}
        />
        <div
          className="absolute left-[8%] top-[22%] h-56 w-56 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--blob-left)" }}
        />
        <div
          className="absolute right-[6%] top-[12%] h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--blob-right)" }}
        />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
        <Navbar />

        <div className="mx-auto my-12 flex max-w-3xl flex-col items-center py-12 text-center sm:py-16">
          <div className="inline-flex items-center rounded-full border border-(--chip-border) bg-(--chip-bg) px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-(--chip-text) [font-family:var(--font-rosario)] shadow-[0_12px_32px_rgba(42,25,18,0.06)] transition-colors duration-300 ease-out">
            From upload to lucid notes
          </div>

          <h1 className="mt-8 max-w-4xl text-5xl font-black [font-family:var(--font-rosario)] leading-[0.95] tracking-normal text-(--headline) transition-colors duration-300 ease-out sm:text-6xl lg:text-6xl">
            Turn raw videos into polished notes with Audra.
          </h1>

          <p className="mt-6 max-w-2xl text-base italic leading-8 tracking-wide text-(--muted) transition-colors duration-300 ease-out sm:text-lg">
            Upload a video in any format and let Audra handle rapid transcript
            generation, compression-ready processing, and AI summaries designed
            for fast review.
          </p>

          <div className="mt-10 flex w-full justify-center">
            <Mp4UploadButton />
          </div>
        </div>
      </section>
      <div className="fixed top-6 right-6 z-50">
        <a href="https://groq.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://console.groq.com/powered-by-groq-dark.svg"
            alt="Powered by Groq for fast inference."
            width={0}
            height={0}
            unoptimized
            className="groq-badge-light h-10 w-auto opacity-80 transition hover:opacity-100"
          />
          <Image
            src="https://console.groq.com/powered-by-groq-light.svg"
            alt="Powered by Groq for fast inference."
            width={0}
            height={0}
            unoptimized
            className="groq-badge-dark h-10 w-auto opacity-80 transition hover:opacity-100"
          />
        </a>
      </div>
    </main>
  );
}
