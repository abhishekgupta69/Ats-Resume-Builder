# ResumeATS — AI-Powered Resume Builder with ATS Score Checker

A full-stack MERN application that lets users build professional resumes with a live
preview and score them against any job description using a custom ATS (Applicant
Tracking System) analysis engine.

Recruiters filter ~75% of resumes through ATS software before a human ever reads them.
This tool tells you exactly which keywords you're missing and how to fix it.

## Features

- **Auth** — JWT-based register/login with bcrypt password hashing
- **Resume Builder** — live A4-style preview, two templates (Modern / Classic), skills
  tags, multiple experience & education entries, PDF export via print stylesheet
- **ATS Score Checker** — paste any job description and get:
  - Overall ATS score (0–100) with an animated gauge
  - Score breakdown: keyword match, contact info, sections, length, quantified impact
  - Matched vs missing keywords extracted from the job description
  - Actionable suggestions to improve the score
- **Dashboard** — manage multiple resume versions
- Security: protected routes, owner-only resume access, hashed passwords, centralized
  error handling

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18, Redux Toolkit, React Router 6, Axios, Vite |
| Backend  | Node.js, Express |
| Database | MongoDB + Mongoose |
| Auth     | JSON Web Tokens, bcryptjs |

## Project Structure

```
ats-resume-builder/
├── server/                  # Express API
│   ├── config/db.js         # MongoDB connection
│   ├── models/              # User, Resume schemas
│   ├── middleware/          # auth (JWT), errorHandler
│   ├── routes/              # auth, resumes, ATS scoring
│   └── utils/atsScore.js    # Custom ATS scoring engine
├── client/                  # React SPA
│   └── src/
│       ├── api/axios.js     # Axios instance with JWT interceptor
│       ├── store/           # Redux Toolkit store + auth slice
│       ├── components/      # ResumePreview, ScoreGauge, ProtectedRoute
│       └── pages/           # Login, Register, Dashboard, Builder, ATSChecker
└── package.json             # Root scripts (concurrently)
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works) or local MongoDB

### 1. Clone & install

```bash
npm run install-all
```

### 2. Configure environment

```bash
cp server/.env.example server/.env
# Edit server/.env and set MONGO_URI and JWT_SECRET
```

### 3. Run

```bash
npm run dev
```

- API: http://localhost:5000
- App: http://localhost:5173

## API Reference

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login, returns JWT | No |
| GET | `/api/auth/me` | Current user profile | Yes |
| GET | `/api/resumes` | List my resumes | Yes |
| POST | `/api/resumes` | Create resume | Yes |
| GET | `/api/resumes/:id` | Get one resume | Yes |
| PUT | `/api/resumes/:id` | Update resume | Yes |
| DELETE | `/api/resumes/:id` | Delete resume | Yes |
| POST | `/api/ats/score` | Score resume vs job description | Yes |

**POST /api/ats/score body:**

```json
{
  "jobDescription": "We are looking for a MERN developer with React, Node.js, MongoDB...",
  "resumeId": "64f..." // OR "resumeText": "plain resume text"
}
```

## How the ATS Engine Works

`server/utils/atsScore.js` mimics how real ATS parsers evaluate resumes:

1. **Keyword extraction** — tokenizes the job description, removes stopwords, and
   ranks the top 25 keywords by frequency
2. **Coverage scoring** — % of keywords present in the resume (worth 50 points)
3. **Parse checks** — email/phone/links (10 pts), standard sections (20 pts),
   ideal length 250–900 words (10 pts), quantified achievements with numbers (10 pts)

## Deployment (Vercel — full-stack, one project)

This repo is pre-configured for Vercel: the Express API runs as a serverless
function (`api/index.js`), the React app builds from `client/`, and
`vercel.json` routes everything. No CORS issues, no separate backend host.

1. **Push to GitHub** (`node_modules`, `.env` and `client/dist` are git-ignored)
2. **MongoDB Atlas** → Network Access → allow `0.0.0.0/0` (required so Vercel's
   serverless IPs can connect)
3. **[vercel.com/new](https://vercel.com/new)** → Import the repo. Vercel reads
   `vercel.json` automatically — no build settings to change
4. **Environment Variables** (Project → Settings → Environment Variables):

   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | your MongoDB Atlas connection string |
   | `JWT_SECRET` | long random string |

5. **Deploy** — then test `https://your-app.vercel.app/api/health`
6. Put the live URL on your resume 🎉

Notes:
- Backend runtime deps live in the **root** `package.json` on purpose — that is
  the only `package.json` Vercel installs for the serverless function.
- `VITE_API_URL` is **not needed**: `/api/*` is proxied to the function by a
  rewrite, so the same-origin axios calls work in dev (Vite proxy) and prod
  (Vercel rewrite) with zero config.
- Local development is unchanged: `npm run dev`.

## Future Enhancements

- OpenAI API for AI-written summaries & bullet-point suggestions
- React-PDF or Puppeteer for pixel-perfect PDF export
- Resume parsing from uploaded PDF/DOCX (pdf-parse)
- Real-time collaboration on resumes (Socket.io)
- Jest + Supertest unit tests, GitHub Actions CI/CD
