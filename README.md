# 🚀 TaskFlow Todo App — DevOps Project

> React + Docker + Jenkins ke saath ek complete CI/CD pipeline

---

## 📁 Project Structure

```
todo-devops-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TodoInput.js / .css
│   │   ├── TodoItem.js  / .css
│   │   ├── TodoList.js  / .css
│   │   ├── FilterBar.js / .css
│   │   └── StatsBar.js  / .css
│   ├── App.js / App.css
│   ├── index.js / index.css
├── Dockerfile          ← Docker image banane ke liye
├── docker-compose.yml  ← App + Jenkins dono chalane ke liye
├── Jenkinsfile         ← CI/CD pipeline
├── nginx.conf          ← Nginx config
└── package.json
```

---

## ⚡ Quick Start

### Option 1: Local Development
```bash
npm install
npm start
# http://localhost:3000 pe open karo
```

### Option 2: Docker se chalao
```bash
# Image build karo
docker build -t taskflow-todo .

# Container run karo
docker run -p 3000:80 taskflow-todo

# http://localhost:3000 pe dekho
```

### Option 3: Docker Compose (App + Jenkins dono)
```bash
docker-compose up --build

# Todo App: http://localhost:3000
# Jenkins:  http://localhost:8080
```

---

## 🔧 Jenkins Setup

1. `docker-compose up` se Jenkins start karo
2. `http://localhost:8080` pe browser mein jao
3. Initial password ke liye:
   ```bash
   docker exec taskflow-jenkins cat /var/jenkins_home/secrets/initialAdminPassword
   ```
4. Plugins install karo: Git, Docker Pipeline
5. New Pipeline job banao → SCM se Jenkinsfile use karo
6. Build Now karo 🎉

---

## 🐳 Docker Commands

```bash
# Image build karo
docker build -t taskflow-todo .

# Container chalao
docker run -d -p 3000:80 --name taskflow-app taskflow-todo

# Logs dekho
docker logs taskflow-app

# Container band karo
docker stop taskflow-app

# Compose se sab chalao
docker-compose up --build -d

# Sab band karo
docker-compose down
```

---

## 📋 Features

- ✅ Task add, edit, delete karo
- ✅ Priority set karo (High/Medium/Low)
- ✅ Filter: All / Active / Done
- ✅ Sort: Newest / Oldest / Priority
- ✅ Search karo tasks mein
- ✅ Progress bar
- ✅ LocalStorage mein data save
- ✅ Dark theme UI

---

## 🏗️ Tech Stack

| Part | Technology |
|------|-----------|
| Frontend | React 18 |
| Styling | CSS Variables + Custom CSS |
| Web Server | Nginx (Alpine) |
| Container | Docker (Multi-stage build) |
| Orchestration | Docker Compose |
| CI/CD | Jenkins Pipeline |

---

Made with ❤️ for DevOps Learning
