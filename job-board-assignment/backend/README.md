# Job Board Backend (NestJS + Prisma + PostgreSQL)

Secure REST API for the Job Board assignment, with JWT auth, role-based access (admin vs job seeker), Prisma/PostgreSQL, and Vercel-ready serverless handler.

## Stack

- **NestJS 10** (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`)
- **Prisma** ORM + **PostgreSQL**
- **Auth**: JWT (`@nestjs/jwt`, `passport-jwt`), bcrypt password hashing
- **Security**: Helmet, rate limiting (`@nestjs/throttler`)
- **Testing**: Jest

## Environment variables

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Variables:

- `PORT` – Local dev port (default: `3001`)
- `DATABASE_URL` – PostgreSQL connection string
- `JWT_SECRET` – Secret key for JWT
- `JWT_EXPIRES_IN` – Token lifetime (e.g. `1h`)

## Local setup (PostgreSQL + Prisma)

1. Start a local Postgres (Docker example):

```bash
docker run --name job-board-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=jobboard -p 5432:5432 -d postgres
```

2. Set `DATABASE_URL` in `.env`, for example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jobboard?schema=public"
```

3. Install deps and run migrations:

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
```

4. Run the app:

```bash
npm run start:dev
```

5. Run tests:

```bash
npm test
```

## Entities & roles

- **Users**
  - Fields: `id`, `fullName`, `email`, `password`, `role (ADMIN|JOBSEEKER)`, `createdAt`
  - Registration creates **JOBSEEKER** accounts.
- **Jobs**
  - Fields: `id`, `title`, `description`, `location`, `salary`, `status (OPEN|CLOSED)`, `createdBy`, `createdAt`, `updatedAt`
  - Only **admins** can create, edit, delete (via `/admin/jobs` routes).
- **Applications**
  - Fields: `id`, `jobId`, `userId`, `resumeText`, `coverLetter`, `status (SUBMITTED|REVIEWED|REJECTED)`, `createdAt`
  - Only **job seekers** can apply.

## API Overview

Base URL (local): `http://localhost:3001`

### Auth

- `POST /auth/register` – register as job seeker
- `POST /auth/login` – login, returns `{ accessToken }`

### Job Seeker endpoints

- `GET /jobs` – list jobs (public)
  - Query:
    - `page`, `pageSize`
    - `location`
    - `status` (`OPEN` / `CLOSED`)
    - `search` (title/description)
- `GET /jobs/:id` – job details (public)
- `POST /jobs/:jobId/applications` – create application (requires `JOBSEEKER` JWT)
- `GET /me/applications` – list my applications

### Admin endpoints

- `POST /admin/jobs` – create job
- `PATCH /admin/jobs/:id` – update job
- `DELETE /admin/jobs/:id` – delete job
- `GET /admin/applications` – list all applications
- `GET /admin/applications/:id` – single application
- `GET /admin/users` – list basic user info

All admin endpoints require a JWT with role `ADMIN`.

## Postman collection

Import `postman/job-board-backend.postman_collection.json` into Postman.

The collection is organized into folders:

- **Auth** – register/login
- **Job Seeker** – browsing jobs, applying, viewing own applications
- **Admin** – job management, viewing users & applications

Set the `baseUrl` variable in Postman (e.g. `http://localhost:3001` or your deployed URL).

## Deployment on Vercel (serverless)

This backend is prepared for Vercel:

- `api/index.ts` exports a default handler that boots the Nest app once per serverless instance.
- `src/main.ts` only runs `bootstrap()` when not in Vercel (`process.env.VERCEL !== '1'`).

**Steps:**

1. Push the `backend` folder to its own GitHub repo (or use the monorepo and set `backend` as project root in Vercel).
2. On Vercel:
   - Create a **New Project** → import repo.
   - Project root: `backend`
   - Build command: `npm install && npm run build`
   - Output: (default)
   - Vercel will detect the `api/index.ts` function and deploy as Node serverless.
3. Add environment variables in Vercel Project Settings → Environment Variables:
   - `DATABASE_URL` – use a managed Postgres (see below).
   - `JWT_SECRET`, `JWT_EXPIRES_IN`.

## Free PostgreSQL options without credit card

You can use providers like:

- **Neon** (`https://neon.tech`) – serverless PostgreSQL with free tier; GitHub/Google sign-in, usually no credit card needed.
- **Supabase** (`https://supabase.com`) – Postgres + auth + storage; free tier with GitHub login, often without requiring a card.

General steps (e.g. Neon):

1. Create account (GitHub login).
2. Create new Postgres project.
3. Copy the connection string (PostgreSQL format).
4. Paste it into Vercel `DATABASE_URL`.
5. In Vercel, run `npm run prisma:migrate` once (via Vercel CLI or locally pointing to Neon) to apply migrations.

## File uploads (resume storage) – Firebase or Supabase

Currently, applications store **`resumeText`** as plain text. To store actual files:

- Upload the file from frontend/mobile to **Firebase Storage** or **Supabase Storage**.
- Store only the **public URL** in `resumeText` or extend the Prisma model with a `resumeUrl` field.

For **Firebase Storage**, you would typically need:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

For **Supabase Storage**, you would use:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (for server-side uploads) or `SUPABASE_ANON_KEY` (for client-side uploads).

Because Vercel functions are stateless, this pattern (upload file → get URL → send URL to backend) fits serverless very well.


