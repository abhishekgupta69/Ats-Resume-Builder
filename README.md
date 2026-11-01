<p align="center">
  <img src="client/public/logo.png" alt="ATS Resume Builder logo" width="120"/>
</p>

<p align="center">
  <strong>Build, customize and export professional resumes — then check how well they score against any job description.</strong><br/>
  A full-stack MERN app for job seekers who want to get past the ATS and reach a real recruiter.
</p>

<p align="center">
  <a href="https://ats-resume-builder-one-gamma.vercel.app/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-2563EB?style=for-the-badge&labelColor=0f172a" alt="Live Demo"/>
  </a>
  <a href="https://github.com/abhishekgupta69/Ats-Resume-Builder/stargazers">
    <img src="https://img.shields.io/github/stars/abhishekgupta69/Ats-Resume-Builder?style=for-the-badge&color=2563EB&labelColor=0f172a" alt="Stars"/>
  </a>
  <a href="https://github.com/abhishekgupta69/Ats-Resume-Builder/network/members">
    <img src="https://img.shields.io/github/forks/abhishekgupta69/Ats-Resume-Builder?style=for-the-badge&color=2563EB&labelColor=0f172a" alt="Forks"/>
  </a>
  <a href="https://github.com/abhishekgupta69/Ats-Resume-Builder/issues">
    <img src="https://img.shields.io/github/issues/abhishekgupta69/Ats-Resume-Builder?style=for-the-badge&color=2563EB&labelColor=0f172a" alt="Issues"/>
  </a>
  <a href="https://github.com/abhishekgupta69/Ats-Resume-Builder/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/abhishekgupta69/Ats-Resume-Builder?style=for-the-badge&color=2563EB&labelColor=0f172a" alt="License"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-Fast_Build-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-Backend-000000?style=flat-square&logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens" />
  <img src="https://img.shields.io/badge/Vercel-Frontend-000000?style=flat-square&logo=vercel" />
  <img src="https://img.shields.io/badge/Render-Backend-46E3B7?style=flat-square&logo=render&logoColor=black" />
</p>

<br/>

<img src="client/public/screenshots/home.png" alt="ATS Resume Builder Home" width="85%" />

</div>

---

## 📌 Table of Contents

- [🌟 Overview](#-overview)
- [🌐 Live Demo](#-live-demo)
- [✨ Features](#-features)
- [📸 Screenshots](#-screenshots)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎯 How It Works](#-how-it-works)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔑 Environment Variables](#-environment-variables)
- [📡 API Endpoints](#-api-endpoints)
- [☁️ Deployment](#️-deployment)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [👨‍💻 Author](#-author)
- [📄 License](#-license)

---

## 🌟 Overview

**ATS Resume Builder** helps job seekers create a clean, professional resume and then test it the way a company's hiring software would. Most companies use an **Applicant Tracking System (ATS)** to filter resumes before a human ever reads them. A good-looking resume can still get rejected if it doesn't match the job description.

This app solves both problems in one place: **build the resume**, then **score it** against the job you are applying for.

> 💡 **Our goal:** Help every fresher and job seeker send a resume that is clear, well-formatted and ready for the ATS.

### Why ATS Resume Builder?

| Typical Resume Maker | ATS Resume Builder |
|----------------------|--------------------|
| 🎨 Only focuses on design | 🎯 Design **and** ATS score together |
| 📄 Starts from a blank form | 🔄 Auto-fill from your old PDF resume |
| 💸 Often locks PDF download behind payment | 📥 One-click PDF export |
| 📌 One resume, one device | ☁️ Multiple resumes saved in the cloud |

---

## 🌐 Live Demo

| Service | Link |
|---------|------|
| 🖥️ Frontend (Vercel) | [ats-resume-builder-one-gamma.vercel.app](https://ats-resume-builder-one-gamma.vercel.app/) |
| ⚙️ Backend API (Render) | [ats-resume-builder-cb3f.onrender.com/api](https://ats-resume-builder-cb3f.onrender.com/api) |
| 📦 GitHub Repository | [abhishekgupta69/Ats-Resume-Builder](https://github.com/abhishekgupta69/Ats-Resume-Builder) |

> ⏳ **Note:** The backend runs on a free Render plan, so the **first request after a period of inactivity can take up to a minute** while the server wakes up.

---

## ✨ Features

### 📝 Resume Builder
- **Live preview** — see your resume update in real time as you type
- **Multiple templates** — switch between **Classic** and **Modern**
- **Auto-fill from PDF** — upload an existing resume and all fields are filled for you

### 🎯 ATS Score Checker
- Paste a job description and compare it with your resume
- Get a **compatibility score** and **actionable feedback** to improve it

### 📥 Export
- **One-click PDF download** using `html2canvas` and `jsPDF`

### 🔐 Accounts & Storage
- **Secure login and registration** with JWT and bcrypt password hashing
- **Cloud persistence** — save and manage multiple resumes in MongoDB

### 📱 Responsive Design
- Works on desktop, tablet and mobile

---

## 📸 Screenshots

> 📝 Add your screenshots to `client/public/screenshots/` using the file names below.

<details>
<summary><strong>🏠 Home Page</strong> — Click to expand</summary>
<br/>
<img src="client/public/screenshots/home.png" alt="Home Page" width="100%"/>
<p><em>Landing page introducing the builder and the ATS checker</em></p>
</details>

<details>
<summary><strong>📝 Resume Builder</strong> — Click to expand</summary>
<br/>
<img src="client/public/screenshots/builder.png" alt="Resume Builder" width="100%"/>
<p><em>Form on one side, live resume preview on the other</em></p>
</details>

<details>
<summary><strong>🎨 Templates</strong> — Click to expand</summary>
<br/>
<img src="client/public/screenshots/templates.png" alt="Templates" width="100%"/>
<p><em>Switch between Classic and Modern layouts instantly</em></p>
</details>

<details>
<summary><strong>🎯 ATS Score Checker</strong> — Click to expand</summary>
<br/>
<img src="client/public/screenshots/ats-checker.png" alt="ATS Checker" width="100%"/>
<p><em>Compare your resume with a job description and see your score</em></p>
</details>

<details>
<summary><strong>📂 Dashboard</strong> — Click to expand</summary>
<br/>
<img src="client/public/screenshots/dashboard.png" alt="Dashboard" width="100%"/>
<p><em>Manage all your saved resumes in one place</em></p>
</details>

---

## 🛠️ Tech Stack

<table>
  <tr>
    <td align="center" width="50%">

### 🖥️ Frontend
| Technology | Purpose |
|------------|---------|
| **React.js** | UI library |
| **Vite** | Fast build tool |
| **JavaScript, HTML5, CSS3** | Core web stack |
| **Axios** | API calls |
| **html2canvas + jsPDF** | PDF export |
| **pdfjs-dist** | Read text from uploaded PDFs |
| **Vercel** | Deployment |

  </td>
  <td align="center" width="50%">

### ⚙️ Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime |
| **Express.js** | Web framework |
| **MongoDB + Mongoose** | Database and ODM |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **Render** | Deployment |

  </td>
  </tr>
</table>

### 🔧 Tools
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white)

---

## 🎯 How It Works

```
Step 1 ─── Sign Up / Log In ─────► Secure JWT-based account
    │
Step 2 ─── Build Your Resume ────► Fill the form or upload an old PDF
    │
Step 3 ─── Pick a Template ──────► Classic or Modern, with live preview
    │
Step 4 ─── Check ATS Score ──────► Paste a job description, get feedback
    │
Step 5 ─── Improve & Download ───► Fix the gaps, export as PDF, apply!
```

### Request Flow

```
👤 User
  │
  ▼
🖥️ React + Vite (Vercel)
  │   Axios + JWT token
  ▼
⚙️ Express API (Render)
  ├── /api/auth     → Register / Login
  ├── /api/resumes  → Create, read, update, delete
  └── /api/ats      → Score resume vs job description
  │
  ▼
🗄️ MongoDB Atlas
```

---

## 📂 Project Structure

```
ats-resume-builder/
│
├── 📁 client/                  # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Builder, ATSChecker, Dashboard, etc.
│   │   ├── api/                # Axios configuration for API calls
│   │   └── App.jsx             # Main application router
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── 📁 server/                  # Backend Node.js / Express application
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication middleware
│   │   └── errorHandler.js     # Global error handler
│   ├── models/
│   │   ├── Resume.js           # Resume schema
│   │   └── User.js             # User schema
│   ├── routes/
│   │   ├── ats.js              # ATS scoring endpoints
│   │   ├── auth.js             # Authentication endpoints
│   │   └── resume.js           # Resume CRUD endpoints
│   ├── utils/                  # Helper functions
│   ├── app.js                  # Express app configuration
│   ├── index.js                # Server entry point
│   └── package.json
│
├── 📁 api/
│   └── index.js                # API utilities
│
├── .gitignore
├── package.json                # Root package.json
└── README.md
```

---

## 🚀 Getting Started

### 📋 Prerequisites

```bash
Node.js   v18+
npm       (comes with Node.js)
Git
MongoDB   Atlas account (or a local MongoDB instance)
```

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/abhishekgupta69/Ats-Resume-Builder.git
cd Ats-Resume-Builder
```

---

### 2️⃣ Backend Setup

**1. Go to the `server` folder**
```bash
cd server
```

**2. Install dependencies**
```bash
npm install
```

**3. Create a `.env` file in the `server` folder**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here
```

**4. Start the backend server**
```bash
npm run dev
```

> ✅ The server should start on **http://localhost:5000**

---

### 3️⃣ Frontend Setup

**1. Open a new terminal** (keep the backend running) and go to the `client` folder
```bash
cd client
```

**2. Install dependencies**
```bash
npm install
```

**3. Create a `.env` file in the `client` folder**
```env
VITE_API_URL=http://localhost:5000/api
```

**4. Start the development server**
```bash
npm run dev
```

**5. Open your browser**

| Service | URL |
|---------|-----|
| 🌐 Frontend | http://localhost:5173 |
| 🔌 Backend API | http://localhost:5000/api |

> 🟢 Vite usually runs on port **5173**. If your terminal shows a different port, use that one.

---

## 🔑 Environment Variables

### Backend (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port for the backend server | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://<user>:<password>@cluster.mongodb.net/ats-resume` |
| `JWT_SECRET` | Secret key used to sign JWT tokens | `use_a_long_random_string` |

### Frontend (`client/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Base URL for backend API calls | `http://localhost:5000/api` |

> ⚠️ **Never commit your `.env` files.** Make sure `.env` is listed in `.gitignore`.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login an existing user | ❌ |
| `GET` | `/api/resumes` | Get all resumes of the logged-in user | ✅ |
| `POST` | `/api/resumes` | Create a new resume | ✅ |
| `PUT` | `/api/resumes/:id` | Update an existing resume | ✅ |
| `DELETE` | `/api/resumes/:id` | Delete a resume | ✅ |
| `POST` | `/api/ats/score` | Get the ATS score for a resume | ✅ |

> 🔒 Protected routes need this header: `Authorization: Bearer <your_token>`

---

## ☁️ Deployment

### 🖥️ Frontend → Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Set **Root Directory** to `client`
4. Set **Framework Preset** to `Vite`
5. Add the environment variable `VITE_API_URL` pointing to your live backend URL
6. Click **Deploy**

### ⚙️ Backend → Render

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repository
3. Set **Root Directory** to `server`
4. Set **Build Command** to `npm install`
5. Set **Start Command** to `node index.js`
6. Add all environment variables from `server/.env`
7. Click **Create Web Service**

---

## 🧪 Testing

You can test the API with [Postman](https://www.postman.com/) or any HTTP client.

**Example login request:**

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "yourpassword"
}
```

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/Ats-Resume-Builder.git

# 3. Create a feature branch
git checkout -b feature/AmazingFeature

# 4. Make your changes and commit
git commit -m "feat: add AmazingFeature"

# 5. Push to your fork
git push origin feature/AmazingFeature

# 6. Open a Pull Request 🎉
```

### Contribution Guidelines

- ✅ Follow the existing code style and naming
- ✅ Write clear commit messages
- ✅ Keep each PR focused on one feature or fix
- ✅ Update this README if your change affects setup or features

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea? [Open an issue](https://github.com/abhishekgupta69/Ats-Resume-Builder/issues) and include:

- **Clear description** of the problem or idea
- **Steps to reproduce** (for bugs)
- **Expected vs actual behavior**
- **Screenshots**, if they help

---

## 👨‍💻 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/abhishekgupta69">
        <img src="https://github.com/abhishekgupta69.png" width="100" style="border-radius:50%" alt="Abhishek Kumar Gupta"/><br/>
        <sub><b>Abhishek Kumar Gupta</b></sub>
      </a><br/>
      <a href="https://github.com/abhishekgupta69">GitHub</a> ·
      <a href="https://linkedin.com/in/abhishek-gupta">LinkedIn</a> ·
      <a href="mailto:abhishek910265@gmail.com">Email</a>
    </td>
  </tr>
</table>

---

## 🙏 Acknowledgments

- [**Vite**](https://vitejs.dev) — Lightning-fast frontend build tool
- [**Vercel**](https://vercel.com) — Frontend hosting
- [**Render**](https://render.com) — Backend hosting
- [**MongoDB Atlas**](https://www.mongodb.com/cloud/atlas) — Cloud database
- The open-source community for the tools that made this possible

---

## 📄 License

This project is open-source and available under the **MIT License** 

---

<div align="center">

⭐ **If this project helped you, please give it a star!** ⭐

<br/>

Made with ❤️ by Abhishek Gupta

</div>
