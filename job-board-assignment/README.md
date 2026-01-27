## Job Board Assignment – Monorepo

This repository contains three TypeScript applications for the WeTheMakers LLC tech assignment:

- **backend** – NestJS REST API for jobs and job applications
- **frontend** – Next.js job board UI with Tailwind + shadcn-style components
- **mobile** – React Native (Expo) app consuming the same backend API

All three projects share the same domain model and use Jest for unit testing.

---

### 1. Backend (`/backend`) – NestJS

- **Tech**: NestJS, TypeScript, class-validator, Helmet, @nestjs/throttler, Jest
- **Features**:
  - Jobs CRUD: `POST /jobs`, `GET /jobs`, `GET /jobs/:id`, `PATCH /jobs/:id`, `DELETE /jobs/:id`
  - Applications: `POST /jobs/:jobId/applications`, `GET /applications`, `GET /applications/:id`
  - Validation on all inputs, rate limiting, security headers, CORS
  - In-memory storage (no DB) for simplicity

**Setup**

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

**Tests**

```bash
cd backend
npm test
```

**API Docs**

- Import `backend/postman/job-board-backend.postman_collection.json` into Postman.

---

### 2. Frontend (`/frontend`) – Next.js

- **Tech**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn-style UI components, axios, zod, @tanstack/react-query, next-themes, Jest + Testing Library
- **Features**:
  - Job listing page with filters-ready layout
  - Sidebar form to **create jobs** (server actions + Zod validation + action state)
  - Apply form tied to selected job using server actions
  - Global dark/light mode toggle (with `next-themes`)
  - Shared axios client in `lib/api/client.ts`
  - Form validation with Zod schemas in `lib/validation`

**Setup**

```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:3001" > .env.local
npm run dev
```

**Tests**

```bash
cd frontend
npm test
```

---

### 3. Mobile (`/mobile`) – React Native Expo

- **Tech**: Expo, React Native, TypeScript, NativeWind (Tailwind-style classes), axios, @tanstack/react-query, zod, React Navigation bottom tabs, Jest (jest-expo)
- **Features**:
  - Bottom tab navigation: **Jobs** and **Apply**
  - Jobs screen using TanStack Query to fetch jobs from the NestJS backend
  - Apply screen with validation via Zod and submission to `/jobs/:jobId/applications`
  - Dark/light mode following the device theme
  - Shared axios client in `src/api/client.ts`

**Setup**

```bash
cd mobile
npm install
expo start
```

To configure the backend base URL for the app:

```bash
set EXPO_PUBLIC_API_BASE_URL=http://localhost:3001   # Windows PowerShell (or use env file)
```

**Tests**

```bash
cd mobile
npm test
```

---

### Assumptions

- The assignment accepts **in-memory storage** (no persistent DB) in the backend.
- Authentication/authorization is **out of scope** for this version.
- Frontend and mobile focus on core job board flows: listing jobs and submitting applications.

### Known Limitations / Improvements

- Add a real database (PostgreSQL + ORM) and migrations.
- Add authentication (JWT or session) and roles (admin/candidate).
- Add pagination, sorting, and advanced filtering.
- Extract shared types to a separate package for stronger typing across layers.
- Add E2E tests (e.g., Playwright / Detox) in addition to existing unit tests.

---

### Free Deployment – How To

You can deploy **backend** and **frontend** for free using a service like **Render**:

1. Push this repo to GitHub.
2. Create a free account on Render.
3. **Backend**:
   - Create a new **Web Service** from your repo.
   - Set the root to `backend`.
   - Build command: `npm install && npm run build`
   - Start command: `npm run start:prod`
   - Add environment variable `PORT=10000` (or any), and expose HTTP port as Render suggests.
4. **Frontend**:
   - Create a new **Static Site** or Web Service (for Next.js SSR).
   - Root: `frontend`
   - Build command: `npm install && npm run build`
   - Start (for SSR): `npm start`
   - Set `NEXT_PUBLIC_API_BASE_URL` to the public URL of your deployed backend.

For **mobile**, you don’t need server deployment: just point `EXPO_PUBLIC_API_BASE_URL` to your deployed backend URL and run the app via Expo Go or EAS build.

