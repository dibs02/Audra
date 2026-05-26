export function Mp4UploadButton() {
  return (
    <div className="flex w-full max-w-md justify-center">
      <button
        type="button"
        className="upload-button group flex w-56 cursor-pointer items-center justify-center gap-3 rounded-full py-4 pl-6 pr-10 transition duration-200 hover:-translate-y-0.5 sm:w-64"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md transition duration-200 group-hover:border-white/30 group-hover:bg-white/15">
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
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M12 16V4" />
            <path d="m7 9 5-5 5 5" />
            <path d="M20 16v4H4v-4" />
          </svg>
        </span>
        <span className="[font-family:var(--font-rosario)] text-xl font-bold tracking-wide">
          Upload
        </span>
      </button>
    </div>
  );
}
