# ATS Resume Builder

A full-stack, ATS-friendly resume builder application designed to help users create, manage, and optimize their resumes for Applicant Tracking Systems (ATS). Built with a modern tech stack and optimized for seamless serverless deployment on Vercel.

## ✨ Features

- 📄 **ATS-Optimized Templates**: Clean, professional layouts that pass ATS parsing algorithms.
-  **Secure Authentication**: JWT-based user authentication and session management.
- 💾 **Persistent Storage**: MongoDB database for saving user profiles and resume data.
- ⚡ **Serverless Backend**: Express.js API optimized for Vercel serverless functions with global connection caching.
- 🚀 **Fast Frontend**: React + Vite for rapid development and optimized production builds.
-  **Performance Tracking**: Integrated Vercel Speed Insights for real-time performance monitoring.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, React Router, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Deployment**: Vercel (Serverless Functions + Static Hosting)
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS / Tailwind (depending on your setup)

## 📂 Project Structure

```text
ats-resume-builder/
├── api/                # Vercel serverless function entry points
├── client/             # React + Vite frontend application
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── store/
├── server/             # Express.js backend application
│   ├── config/         # Database and environment configurations
│   ├── controllers/    # Route logic
│   ├── middleware/     # Auth and error handling middleware
│   ├── models/         # Mongoose schemas
│   └── routes/         # API route definitions
├── vercel.json         # Vercel deployment configuration
├── .gitignore          # Ignored files (e.g., .env, node_modules)
└── package.json        # Root dependencies and scripts
