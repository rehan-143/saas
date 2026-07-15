# PulseCRM — SaaS Landing Page & Product Inquiry System

A full-stack assessment submission for the **React Full Stack Intern** role at HelloAaye.

A responsive marketing landing page for a fictional SaaS CRM product ("PulseCRM"), paired with
a Product Inquiry form backed by a REST API and MongoDB.

- **Live demo:** _add your deployed URL here after deploying (see [Deployment](#deployment))_
- **Repository:** _add your GitHub repo link here_

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Folder Structure](#folder-structure)
3. [Setup Instructions](#setup-instructions)
4. [Environment Variables](#environment-variables)
5. [API Documentation](#api-documentation)
6. [Running with Docker](#running-with-docker)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Bonus Features Implemented](#bonus-features-implemented)
10. [Notes & Assumptions](#notes--assumptions)

---

## Tech Stack

**Frontend**
- React 18 via **Next.js 14** (App Router)
- Plain JavaScript (no TypeScript, per assessment requirements)
- Tailwind CSS for styling and responsive layout
- Client-side form validation (no external form library — implemented by hand to show
  fundamentals)

**Backend**
- Node.js + Express.js
- MongoDB with Mongoose (schema validation, timestamps)
- CORS + JSON body parsing
- Centralized error-handling middleware

**Tooling**
- Jest + Supertest + mongodb-memory-server for API integration tests
- Docker + docker-compose for one-command local orchestration (frontend, backend, MongoDB)

---

## Folder Structure

```
helloaaye-saas-crm/
├── frontend/                     # Next.js app (App Router)
│   ├── app/
│   │   ├── layout.js             # Root layout, dark-mode bootstrap script
│   │   ├── page.js               # Landing page — composes all sections
│   │   ├── globals.css           # Tailwind directives + shared utility classes
│   │   └── admin/
│   │       └── page.js           # Bonus: admin dashboard (search/filter/delete)
│   ├── components/
│   │   ├── Header.js             # Nav bar + dark mode toggle
│   │   ├── Hero.js
│   │   ├── Features.js
│   │   ├── Pricing.js
│   │   ├── Testimonials.js
│   │   ├── FAQ.js                # Accordion
│   │   ├── InquiryForm.js        # Contact Sales / Product Inquiry form
│   │   └── Footer.js
│   ├── lib/
│   │   └── api.js                # fetch() wrappers around the backend REST API
│   ├── Dockerfile
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── package.json
│
├── backend/                      # Express REST API
│   ├── config/
│   │   └── db.js                 # Mongoose connection
│   ├── models/
│   │   └── Inquiry.js            # Mongoose schema + validation
│   ├── controllers/
│   │   └── inquiryController.js  # create / list / delete handlers
│   ├── routes/
│   │   └── inquiryRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js       # Centralized error + 404 handling
│   ├── tests/
│   │   └── inquiry.test.js       # Jest + Supertest integration tests
│   ├── app.js                    # Express app factory (used by tests)
│   ├── server.js                 # Entry point — connects DB, starts server
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml             # Orchestrates mongo + backend + frontend
└── README.md                      # You are here
```

---

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- A MongoDB instance — either a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster,
  or a local MongoDB server (`mongod`), or the Dockerized one described below.

### 1. Clone and install

```bash
git clone <your-repo-url>
cd helloaaye-saas-crm

# Backend
cd backend
npm install
cp .env.example .env
# edit .env and set MONGO_URI to your MongoDB connection string

# Frontend
cd ../frontend
npm install
cp .env.local.example .env.local
# edit .env.local if your backend isn't running on localhost:5000
```

### 2. Run in development

In one terminal:

```bash
cd backend
npm run dev        # starts the API on http://localhost:5000 with nodemon
```

In another terminal:

```bash
cd frontend
npm run dev        # starts the site on http://localhost:3000
```

Visit `http://localhost:3000` for the landing page and
`http://localhost:3000/admin` for the bonus admin dashboard.

### 3. Production build

```bash
cd frontend && npm run build && npm start
cd backend  && npm start
```

---

## Environment Variables

**backend/.env**

| Variable     | Description                                   | Example                                  |
|--------------|------------------------------------------------|-------------------------------------------|
| `PORT`       | Port the Express server listens on             | `5000`                                    |
| `MONGO_URI`  | MongoDB connection string                       | `mongodb://localhost:27017/saascrm`       |

**frontend/.env.local**

| Variable                | Description                                | Example                          |
|--------------------------|---------------------------------------------|-----------------------------------|
| `NEXT_PUBLIC_API_URL`    | Base URL of the backend REST API            | `http://localhost:5000/api`       |

---

## API Documentation

Base URL: `http://localhost:5000/api`

### `GET /health`
Simple health check.

```json
{ "success": true, "message": "API is healthy" }
```

### `POST /inquiry`
Creates a new product inquiry.

**Body**
```json
{
  "fullName": "Jane Doe",
  "companyName": "Acme Inc.",
  "email": "jane@acme.com",
  "phone": "+1 555-123-4567",
  "country": "United States",
  "industry": "Software / SaaS",
  "companySize": "11-50",
  "message": "We are evaluating CRMs for our 20-person sales team."
}
```

**Response — 201 Created**
```json
{ "success": true, "data": { "_id": "...", "fullName": "Jane Doe", "...": "..." } }
```

**Response — 400 Bad Request** (validation failure, e.g. invalid email or missing field)
```json
{ "success": false, "message": "Please provide a valid email address" }
```

### `GET /inquiry`
Returns all inquiries, most recent first.

**Response — 200 OK**
```json
{ "success": true, "count": 2, "data": [ { "_id": "...", "fullName": "..." }, ... ] }
```

### `DELETE /inquiry/:id`
Deletes a single inquiry by its MongoDB `_id`.

**Response — 200 OK**
```json
{ "success": true, "data": { "_id": "...", "fullName": "..." } }
```

**Response — 404 Not Found**
```json
{ "success": false, "message": "Inquiry not found" }
```

**Response — 400 Bad Request** (malformed id)
```json
{ "success": false, "message": "Invalid inquiry id" }
```

---

## Running with Docker

The whole stack (MongoDB + backend + frontend) can be started with one command from the
project root:

```bash
docker-compose up --build
```

- Frontend → `http://localhost:3000`
- Backend  → `http://localhost:5000`
- MongoDB  → `mongodb://localhost:27017/saascrm` (also reachable inside the Docker
  network at `mongo:27017`)

Stop everything with `docker-compose down` (add `-v` to also wipe the MongoDB volume).

---

## Testing

Backend integration tests use **Jest**, **Supertest**, and **mongodb-memory-server** (an
in-memory MongoDB instance, so no real database or network access is required to run them):

```bash
cd backend
npm test
```

Tests cover: creating a valid inquiry, rejecting invalid email / missing fields, listing all
inquiries, and deleting by valid / non-existent / malformed id.

> Note: `mongodb-memory-server` downloads a MongoDB binary the first time tests run in a new
> environment. This requires outbound internet access to `fastdl.mongodb.org`; on a fully
> offline CI runner you may need to pre-seed its binary cache or point `MONGOMS_DOWNLOAD_URL`
> at a mirror.

---

## Deployment

Suggested free-tier deployment path:

- **Frontend:** [Vercel](https://vercel.com) — connect the repo, set the root directory to
  `frontend`, and add `NEXT_PUBLIC_API_URL` pointing at your deployed backend.
- **Backend:** [Render](https://render.com) or [Railway](https://railway.app) — set the root
  directory to `backend`, add `PORT` and `MONGO_URI` as environment variables.
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) free tier (M0 cluster).

---

## Bonus Features Implemented

- ✅ **Dark mode** — toggle in the header, persisted to `localStorage`, respects the
  system preference on first visit.
- ✅ **Admin dashboard** (`/admin`) — lists all inquiries with **search** (name/company/email)
  and **industry filter**, plus delete.
- ✅ **Docker support** — `Dockerfile` for both apps + root `docker-compose.yml`.
- ✅ **Unit / integration testing** — Jest + Supertest suite for all three endpoints.
- ✅ **Loading & error states** — inquiry form (submitting/success/error) and admin dashboard
  (loading/error/empty states).
- ✅ **Meaningful Git commits** — see `git log` for incremental, scoped commits.
- ✅ **Documentation** — this README, plus inline comments in non-obvious code.

Not implemented (left for time-boxing reasons): CSV export from the admin dashboard, and a
recorded demo video — happy to add either if useful.

---

## Notes & Assumptions

- The assessment listed the backend as "preferred" rather than mandatory, but it's fully
  implemented here with all three required endpoints plus MongoDB persistence.
- Written in plain JavaScript (not TypeScript) to match the stated requirement.
- The product is a fictional CRM ("PulseCRM") built purely for this assessment — all pricing,
  testimonials, and stats are illustrative placeholder content.
