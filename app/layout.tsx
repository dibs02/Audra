import type { Metadata } from "next";
import { Manrope, Playfair_Display, Rosario } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const rosario = Rosario({
  variable: "--font-rosario",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Audra",
  description: "Upload MP4 videos and turn them into clear AI summaries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${playfairDisplay.variable} ${rosario.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              const storedTheme = localStorage.getItem("theme");
              const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              const isDark = storedTheme ? storedTheme === "dark" : prefersDark;
              document.documentElement.classList.toggle("dark", isDark);
            })();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
