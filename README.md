# Audra

Audra is an AI-powered SaaS platform that transforms videos into transcripts, concise summaries, and actionable notes.
Upload a video and let Audra handle audio extraction, speech-to-text transcription, and AI summarization through a scalable fullstack processing pipeline.

---

## Features

- Upload MP4 meeting or discussion videos
- AI-powered speech-to-text transcription
- Automatic meeting summaries
- Actionable note generation
- Background media processing pipeline
- Responsive modern SaaS UI
- Dark/light theme support
- Scalable architecture for async processing

---

## Tech Stack

### Frontend
- Next.js App Router
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js Route Handlers
- PostgreSQL
- Prisma ORM

### AI & Media Processing
- FFmpeg
- Groq Whisper API
- Groq LLM APIs

### Storage & Infrastructure
- UploadThing
- Background Jobs / Queue Processing

---

## Architecture Overview

```text
Client Upload
    ↓
UploadThing Storage
    ↓
PostgreSQL Metadata Storage
    ↓
Background Processing Worker
    ↓
FFmpeg Audio Extraction & Compression
    ↓
Groq Whisper Transcription
    ↓
Groq LLM Summarization
    ↓
Summary + Transcript Persistence
    ↓
Frontend Rendering
```

---

## Status

Currently under active development.

More features, infrastructure improvements, and realtime AI workflows coming soon.

```text
— END —
```
