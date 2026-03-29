# Helena Explora

AI-assisted web platform focused on responsible, educational guidance about studying in the United States.

This project was built as a product-minded engineering exercise: design an AI feature that is useful to real users, constrained enough to be safe, and integrated into a production-style web application with clear frontend/backend boundaries.

## Why This Project Matters

A common failure mode in consumer AI products is over-promising expertise while under-controlling behavior. In this project, the goal was not to build a generic chatbot. The goal was to build a scoped AI assistant that:

- answers questions about U.S. study topics
- avoids drifting into personalized immigration, legal, or admissions advice
- preserves conversation continuity across sessions
- fits into a broader lead capture and email workflow
- remains understandable and maintainable as a software system

That framing drove the technical decisions more than the UI itself.

## AI-Centric Product Scope

The assistant is intentionally narrow. It is designed to help with:

- U.S. universities and study programs
- CPT and OPT basics
- student life and academic context
- English-learning and transition guidance
- general educational questions related to studying in the U.S.

It is explicitly not positioned as:

- a legal advisor
- an immigration consultant
- a personalized admissions strategist
- a general-purpose “ask me anything” chatbot

This constraint is part of the product design, backend prompt design, and frontend copy.

## Core AI Features

- Dedicated chatbot API integration with persisted `conversationId`
- Conversation history restore on reload
- Clear “new conversation” reset flow
- Frontend UX aligned to educational-only product scope
- Inline failure handling for unavailable API, invalid requests, and rate limits
- Support for both local and deployed chatbot backends

## System Design

The architecture is intentionally split so each layer owns a clear responsibility.

### Frontend

Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

Frontend responsibilities:

- create and persist the client-side `conversationId`
- restore prior conversation history from the chatbot API
- submit user prompts and render assistant responses
- manage loading, error, accessibility, and session UX
- collect lead data through a multi-step form
- invoke Supabase Edge Functions for email workflows

### Chatbot API

The chatbot logic itself is not embedded in the frontend. The app integrates with a dedicated Express API.

API responsibilities:

- receive prompts
- own server-side conversation history
- return assistant responses
- enforce backend prompt behavior and operational controls
- expose history and health endpoints

### Supabase Edge Function

A separate serverless function handles lead submission workflows.

Edge function responsibilities:

- verify Cloudflare Turnstile
- apply request rate limiting
- sanitize form content before email rendering
- send internal lead notification email
- send user welcome email

This separation keeps AI chat concerns independent from form/email concerns.

## AI Integration Details

The main chat flow works like this:

1. The frontend checks `localStorage` for a saved `conversationId`.
2. If missing, it creates a UUID and persists it.
3. On load, it calls `GET /api/conversations/:conversationId/messages`.
4. The UI restores the returned history in order.
5. When the user sends a message, the UI appends the user message optimistically.
6. The frontend sends `POST /api/chat` with `prompt` and `conversationId`.
7. The backend returns `{ message }`.
8. The frontend appends the assistant reply.

This keeps session ownership on the client while keeping history ownership on the backend.

## Engineering Decisions

### Scoped AI over generic AI

A narrow assistant is easier to reason about, safer to ship, and more defensible from a product and engineering perspective than a broad “chat with anything” experience.

### API boundary over embedded model logic

Moving chat behavior behind a dedicated API makes the frontend thinner, allows prompt/model evolution without redeploying the UI, and creates a cleaner seam for observability and backend controls.

### Explicit session model

Persisting `conversationId` on the client makes conversations feel continuous while keeping the implementation simple. Adding a visible “new conversation” action prevents users from getting stuck in a single long thread.

### Failure states as first-class UX

The app handles:

- unavailable chatbot API
- invalid requests
- rate-limited requests
- history restore failures
- Turnstile failures during form submission

The user gets short, actionable feedback instead of raw backend errors.

## Security and Safety

### AI safety

- product framing limits the assistant to educational guidance
- frontend copy avoids suggesting personalized advice
- backend prompt constraints enforce scope more reliably than UI text alone

### Application security

- Cloudflare Turnstile on lead submission
- rate limiting in the email edge function
- input sanitization before email generation
- masked logging for sensitive fields

## Refactoring and Maintainability

A meaningful part of the work in this codebase was separating concerns instead of leaving features as monoliths.

Examples:

- the chatbot UI was refactored into API, storage, state hook, constants, and presentational components
- the `send-lead-email` Supabase function was split into handlers, services, templates, utils, and config files

The goal was to keep product behavior stable while making the code easier to extend and review.

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- Chat API: Express
- Serverless workflows: Supabase Edge Functions
- Email: Resend
- Security: Cloudflare Turnstile

## Running the Project

By default:

- development uses `http://localhost:3000` for the chatbot API through the Vite `/api/*` proxy
- production uses `https://aichatbot-api.hmpedro.com`

You can override the chatbot backend with:

```env
VITE_CHATBOT_API_URL="http://localhost:3000"
```

or:

```env
VITE_CHATBOT_API_URL="https://aichatbot-api.hmpedro.com"
```

Supabase environment variables are still required for the lead email workflow.

## What This Demonstrates

From an SDE perspective, this project demonstrates:

- translating product constraints into system design
- integrating AI features without collapsing application boundaries
- building with safety, failure handling, and maintainability in mind
- treating AI as a controlled subsystem rather than a gimmick

That is the part of the project I would want an engineering reviewer to notice first.
