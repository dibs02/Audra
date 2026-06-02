"use client";

import Image from "next/image";
import { useState } from "react";
import Logo from "../public/assets/audra.png";

export default function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === "undefined") {
      return false;
    }

    return document.documentElement.classList.contains("dark");
  });

  function toggleTheme() {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");

    root.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  }

  return (
    <header className="mx-auto flex w-full max-w-xl items-center justify-between rounded-full border border-(--surface-border) bg-(--surface) px-6 py-3 shadow-[0_14px_40px_rgba(40,21,13,0.06)] backdrop-blur transition-colors duration-300 ease-out">
      <div className="flex items-center gap-2.5">
        <Image src={Logo} alt="Audra logo" className="h-7 w-7" />
        <p className="text-xl font-black [font-family:var(--font-rosario)] tracking-wide text-(--headline) transition-colors duration-300 ease-out">
          Audra
        </p>
      </div>
      <div>
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-(--toggle-border) bg-(--toggle-bg) text-(--toggle-text) transition-colors duration-300 ease-out"
        >
          <span className="flex items-center justify-center transition-transform duration-300 ease-out">
            {isDark ? (
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
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
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
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 1 0 9 9 9 9 0 1 1-9-9z" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </header>
  );
}
