import { loadEnvConfig } from "@next/env";
import { Groq } from "groq-sdk";

loadEnvConfig(process.cwd());

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
