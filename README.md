# Campus-AI: Integrated Platform for Student & Faculty Management 🚀

Welcome to **Campus-AI**, a comprehensive, full-stack management platform designed to streamline campus operations. Featuring an AI-powered Chatbot, student management, and real-time database synchronization, this project is built using a modern **Monorepo** architecture with **Docker** for a seamless development experience.

---

## 🏗️ Architecture Overview

The project is structured as a **Monorepo**, where both the frontend and backend live in a single repository for easier coordination and deployment.

- **Frontend**: A high-performance React application built with **Vite**, **Tailwind CSS**, and **Framer Motion** for a premium UI/UX.
- **Backend**: A robust **FastAPI (Python)** application providing a stable and secure API layer.
- **Databases**:
    - **MySQL (Dockerized)**: For structured student data, registration, and administrative records.
    - **MongoDB (Dockerized)**: For persistent, flexible storage of Chatbot message history.
- **Orchestration**: **Docker Compose** manages all services, networks, and data volumes with a single command.

---

## 🚀 Quick Start (Local Presentation)

The most important feature of this setup is the **Single-Command Launch**. You don't need to manually install or configure databases on your host machine.

### Prerequisites:
- **Docker Desktop** installed and running on your system.

### Launch Command:
Open your terminal in the project's root directory and run:

```powershell
docker compose up --build
```

**Keep this terminal window open** while you interact with the application.

---

## 🌐 Accessing the Application

Once the Docker containers are running, you can access the following services:

| Component | URL | Description |
| :--- | :--- | :--- |
| **Frontend Web** | [http://localhost](http://localhost) | Main User Interface (Student/Admin Portal) |
| **Backend API** | [http://localhost:8000/docs](http://localhost:8000/docs) | Complete API Documentation (Swagger UI) |
| **MySQL Database** | `localhost:3307` | Connect using SQL Workbench |
| **MongoDB** | `localhost:27017` | Persistent Chat History Storage |

---

## 💾 Database Information (MySQL Workbench)

For your presentation, you can verify your data using **SQL Workbench**.

**Connection Settings:**
- **Hostname**: `localhost`
- **Port**: `3307` (Dockerized)
- **Username**: `root`
- **Password**: `(See .env file)`
- **Database Name**: `campus_ai`

> [!TIP]
> This project uses **Docker Volumes** (`mysql-data` and `mongo-data`). Even if you stop and restart the containers, your students and chat history will **NEVER** be deleted from your hard drive.

---

## 📂 Project Structure

```bash
CAMPUS-AI/
├── .github/workflows/   # CI/CD Pipeline (GitHub Actions)
├── backend/             # FastAPI Application
│   ├── .env             # Environment configs (DB URLs, API Keys)
│   ├── main.py          # Core logic and API endpoints
│   ├── models.py        # SQLAlchemy Database Models
│   ├── init_db.sql      # Database Initialization Script
│   └── Dockerfile       # Backend Container blueprint
├── frontend/            # React + Vite Application
│   ├── src/             # Source code (Pages, Components, Contexts)
│   └── Dockerfile       # Frontend Container blueprint
├── docker-compose.yml   # Project Orchestration Config
└── README.md            # You are here!
```

---

## 🛠️ Tech Stack & Features

- **Frontend**: React, Vite, Framer Motion (Animations), Lucide React (Icons), Tailwind CSS.
- **Backend**: Python, FastAPI, Pydantic, SQLAlchemy, OAuth2 (Authentication), PyMySQL.
- **Chatbot Power**: Groq SDK for ultra-fast LPU inference (Requires Internet connection).
- **Persistent Data**: MySQL (Students/Admin), MongoDB (Chat History).
- **Tooling**: Docker, GitHub Actions, SQL Workbench.

---

**Developed for Campus Management Excellence.**
**Ready for Local Presentation & Enterprise Handover.**
