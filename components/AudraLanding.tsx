import Navbar from "../components/Navbar";
import { Mp4UploadButton } from "./Mp4UploadButton";
import Image from "next/image";

export function AudraLanding() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-(--bg) text-(--text) transition-colors duration-300 ease-out">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-260 w-260 -translate-x-1/2 rounded-full"
          style={{ background: "var(--hero-radial)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-52"
          style={{ background: "var(--hero-bottom-fade)" }}
        />
        <div
          className="absolute left-[8%] top-[22%] h-48 w-48 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--blob-left)" }}
        />
        <div
          className="absolute right-[6%] top-[12%] h-52 w-52 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--blob-right)" }}
        />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-5 sm:px-7 lg:px-8">
        <Navbar />

        <div className="mx-auto mt-1 mb-4 flex max-w-2xl flex-col items-center py-10 text-center sm:py-12">
          <h1 className="mt-7 max-w-3xl text-3xl font-black [font-family:var(--font-rosario)] leading-[0.98] tracking-normal text-(--headline) transition-colors duration-300 ease-out sm:text-4xl lg:text-[3rem]">
            Turn raw videos into polished notes with Audra.
          </h1>

          <p className="mt-4 max-w-xl text-xs italic leading-6 tracking-wide text-(--muted) transition-colors duration-300 ease-out sm:text-sm">
            Upload a video in any format and let Audra handle rapid transcript
            generation, compression-ready processing, and AI summaries designed
            for fast review.
          </p>

          <div className="mt-6 flex w-full justify-center">
            <Mp4UploadButton />
          </div>
        </div>
      </section>
      <div className="fixed top-5 right-5 z-50 hidden lg:block">
        <a href="https://groq.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://console.groq.com/powered-by-groq-dark.svg"
            alt="Powered by Groq for fast inference."
            width={0}
            height={0}
            unoptimized
            className="groq-badge-light h-9 w-auto opacity-80 transition hover:opacity-100"
          />
          <Image
            src="https://console.groq.com/powered-by-groq-light.svg"
            alt="Powered by Groq for fast inference."
            width={0}
            height={0}
            unoptimized
            className="groq-badge-dark h-9 w-auto opacity-80 transition hover:opacity-100"
          />
        </a>
      </div>
    </main>
  );
}
