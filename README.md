# 🏋️‍♀️ Smart Fitness – Frontend

## 📑 Table of Contents
1. [Project Overview](#🌟-project-overview)  
2. [Technologies & Tools](#🛠️-technologies--tools)  
3. [Features](#✨-features)  
4. [Installation & Setup](#⚙️-installation--setup)  
5. [Environment Variables](#🔧-environment-variables)  
6. [Folder Structure](#📂-folder-structure)  
7. [Screenshots](#📸-screenshots)  
8. [Author](#👩‍💻-author)  

---

## 🌟 Project Overview
Smart Fitness Frontend is an **AI-powered fitness web application** developed using **React + TypeScript**.  
It provides users with a modern and responsive interface to:

- 🥗 Generate AI-based meal plans  
- 💪 Generate AI-based workout plans  
- 💾 View and save meal/workout plans  
- 🗑️ Delete saved plans  
- 🔐 Securely login and access protected routes  

This frontend communicates with a secure backend API built using **Node.js, Express, and MongoDB Atlas**.

---

## 🛠️ Technologies & Tools
- **React** - Frontend framework  
- **TypeScript** - Typed JavaScript for maintainability  
- **Material UI (MUI)** - UI components & design system  
- **React Router DOM** - Routing & navigation  
- **Axios** - HTTP requests  
- **JWT Authentication** - Secure user authentication  
- **Vite / Create React App** - Project scaffolding & build tooling  

---

## ✨ Features
- 🔑 **User Authentication:** Registration and login using JWT  
- 🥗 **AI Meal Plan Generation**  
- 💪 **AI Workout Plan Generation**  
- 💾 **View Saved Plans:** Meal & Workout  
- 🗑️ **Delete Saved Plans**  
- 👤 **Profile View**  
- 📱 **Responsive UI Design**  
- 🔒 **Protected Routes**  

---

## ⚙️ Installation & Setup

1️⃣ Clone the Repository

- git clone <[frontend-repo-url](https://github.com/sithumini-silva/final_smart_fitness_frontend.git)>
  cd frontend
      
2️⃣ Install Dependencies

   - npm install
    
3️⃣ Environment Variables

   - Create a .env file in the root directory:
        VITE_API_BASE_URL=http://localhost:5000/api
        
4️⃣ Run the Application

   - npm run dev
   - The frontend will run on: http://localhost:5174

---

📂 Folder Structure

    frontend/
    │
    ├─ public/                 # Static assets     
    ├─ src/
    │   ├─ api/                # Axios API calls
    │   ├─ components/         # Reusable UI components
    │   ├─ pages/              # App pages (Dashboard, Register, Login, etc.)
    │   ├─ styles/             # Global CSS / Tailwind / MUI overrides
    │   └─ App.tsx             # App entry
    ├─ .env                    # Environment variables
    ├─ package.json
    └─ vite.config.ts / tsconfig.json

---

📸 Screenshots
    👉 [Click to view the screenshots document] (https://docs.google.com/document/d/1AV8gzH4f-cC35Cwm-HzWBt9i4e2yuM7YYkG-XGAbejU/edit?usp=sharing)

---

👩‍💻 Author

Sithumini Chathurya

GDSE 71 Batch

GitHub: sithumini-silva
