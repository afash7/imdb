# 🎬 IMDB Clone - Full Stack App

A modern full-stack clone of IMDB built with ❤️ by **Afash ツ**

---

## ✨ Tech Stack

### 🔧 Backend (Django + DRF)

* Django 5
* Django REST Framework
* PostgreSQL
* Modular app structure (`users`, `movies`, `reviews`, `notifications`)
* Clean and scalable architecture

### 🎨 Frontend (React + TailwindCSS)

* React with Vite
* TailwindCSS
* Modern component-based UI
* Simple and fast development with HMR

### 🐳 DevOps (Docker)

* Dockerized backend & frontend
* PostgreSQL as database container
* Docker Compose for multi-service orchestration

---

## 🗂 Project Structure

```
imdb_clone/
├── backend/
│   ├── config/              # Django settings and urls
│   ├── users/               # Authentication & user management
│   ├── movies/              # Movie models and API
│   ├── reviews/             # Review and rating logic
│   ├── notifications/       # Email or in-app notifications
│   ├── dockerfile           # Dockerfile for backend
│   ├── docker-compose.yml   # Full dev stack definition
│   ├── manage.py
│   └── requirements.txt
└── frontend/
    ├── src/                 # React components
    ├── public/              # Static assets
    ├── tailwind.config.js
    ├── vite.config.js
    ├── postcss.config.cjs
    └── index.html
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/afash7/imdb.git
cd imdb_clone
```

### 2. Run with Docker Compose

```bash
cd backend
docker-compose up --build
```

### 3. Frontend (Dev mode)

```bash
cd frontend
npm install
npm run dev
```

---

## 👨‍💼 Author

**Afash ツ**
Follow me for more full-stack madness!

---
