# AGENTS.md

## Project Overview

- This project is built with Next.js App Router.
- TypeScript is used.
- Styling is done with Tailwind CSS.
- json-server is used as a mock REST API.
- TanStack Query may be used for server state management.
- Zustand should only be used when global client state is necessary.

## Development Commands

- Install dependencies: `npm install`
- Start Next.js dev server: `npm run dev`
- Run lint: `npm run lint`
- Start json-server: `npm run server`

## Project Structure

- `app/`: pages, layouts, and route-level components
- `components/`: reusable UI components
- `lib/`: API clients and utility functions
- `types/`: shared TypeScript types
- `public/`: static assets

## Code Style

- Use TypeScript.
- Prefer functional React components.
- Prefer `const` over `let`.
- Use async/await for asynchronous code.
- Avoid `any` unless absolutely necessary.
- Keep components small and focused on a single responsibility.
- Extract reusable logic when duplication appears.

## React / Next.js

- Use the App Router.
- Use Server Components by default.
- Add `"use client"` only when client-side features are required.
- Do not add `"use client"` unnecessarily.
- Use Client Components for hooks such as `useState`, `useEffect`, and event handlers.

## API

- Keep API request logic separate from UI components when possible.
- Handle loading, error, and success states.
- Use REST conventions when interacting with json-server.
- Do not hardcode API URLs repeatedly. Define them in one place.

## TanStack Query

- Use TanStack Query for server state.
- Use `useQuery` for GET requests.
- Use `useMutation` for POST, PATCH, PUT, and DELETE requests.
- Define clear and consistent query keys.

## Zustand

- Do not use Zustand for server state.
- Use Zustand only when client state needs to be shared across multiple components.

## TypeScript

- Prefer explicit interfaces or types for API response data.
- Avoid overly complex TypeScript patterns.
- Prefer readable types suitable for developers still learning TypeScript.
- Do not introduce advanced generics unless they provide a clear benefit.

## Before Finishing a Task

- Check for TypeScript errors.
- Run ESLint.
- Remove unused imports and variables.
- Verify that existing features still work.
- Do not modify unrelated files.
