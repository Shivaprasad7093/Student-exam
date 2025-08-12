
# Exam App - Full Stack (React + Express + MongoDB)

This is a minimal full-stack student exam-taking application implementing the assessment requirements.

## Features
- User registration & login (JWT)
- Start Exam (fetch randomized questions)
- MCQ display with Next / Previous navigation
- Countdown timer with auto-submit
- Submit exam -> score calculation -> result display

## Quick start (local)

1. Install & run backend:
```bash
cd backend
cp .env.example .env
# set MONGO_URI in .env
npm install
node seed.js      # creates sample questions (requires MONGO_URI)
npm start
```

2. Install & run frontend:
```bash
cd frontend
npm install
npm run dev
```

Backend runs on port 5000, frontend on 5173 by default.

## Postman
A simple Postman collection is included at `postman_collection.json`.

## Notes
- This is a demo starter project. For production use, secure secrets and improve validation.
