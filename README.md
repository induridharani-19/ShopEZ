# 🛍 ShopEZ: AI-Enhanced secure MERN E-Commerce Store

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-MERN%20%7C%20Flask-blue.svg)](#)
[![AI Subsystem](https://img.shields.io/badge/AI/ML-TF--IDF%20%26%20Cosine%20Similarity-orange.svg)](#)
[![SmartBridge Evaluation](https://img.shields.io/badge/SmartBridge%20Score-96.5%20%2F%20100-gold.svg)](docs/final_report.md)

**ShopEZ** is a professional, secure, and smart e-commerce platform engineered with the MERN stack (MongoDB, Express, React, Node.js) and integrated with an AI recommendation and conversational commerce microservice. 

---

## 🚀 Key Features

### 🛡 1. Role-Based Access Control (RBAC) & Route Security
- **JWT Middleware Encryption**: Secure login sessions and registration endpoints.
- **Admin Privilege Guardians**: All database writes/updates and user profiles are protected on Node API layers.
- **Protected Layouts**: React router blocks customers from view-navigating to administrator dashboard URL paths.

### 🤖 2. Content-Based Recommendation Subsystem
- **TF-IDF & Cosine Similarity**: Analyzes text categories and product profiles to suggest 5 matching items.
- **Microservice Design**: Maintained as an independent Python Flask server.
- **Node.js Native Fallback**: Express handles document vector similarity automatically if the Flask server is down, maintaining full storefront uptime.

### 💬 3. Interactive AI Advisor (Chatbot)
- **Natural Language Parsing**: Translates user search intents (e.g. "I want groceries") into actual product query scores.
- **Interactive Drawer Interface**: Floating chat panels presenting clickable product card lists.

---

## 📂 Repository Directory Tree

```text
ShopEZ/
├── ShopEZ/                 # React Frontend Client (Vite)
│   ├── src/
│   │   ├── components/     # ProtectedRoute, AIChatbot, ProductCard, etc.
│   │   ├── context/        # AuthContext, CartContext
│   │   └── pages/          # Home, Products, admin/Dashboard, admin/Orders
│   └── .env
├── backend/                # Express API Backend Server
│   ├── middleware/         # authMiddleware, adminMiddleware
│   ├── models/             # User, Product, Order mongoose schemas
│   ├── routes/             # authRoutes, productRoutes, orderRoutes, aiRoutes
│   └── .env
├── ai_module/              # Python AI Recommendation Service
│   ├── models/             # Pickled recommender_model.pkl
│   ├── train_recommender.py# ML training pipeline script
│   ├── ai_server.py        # Flask REST API server
│   ├── recommender_report.md# Math formulation and recall metrics
│   └── requirements.txt
├── docs/                   # SmartBridge Evaluation Documentation
│   ├── problem_statement.md# Project initiation and idea prioritization
│   ├── requirements.md     # Functional & Non-Functional requirement tables
│   ├── sprint_planning.md  # Sprint backlog logs and Burndown charts
│   ├── architecture.md     # Flowcharts, DFD, ER, Sequence & Class diagrams
│   ├── testing_report.md   # Unit, Integration, Security and UAT matrices
│   ├── user_manual.md      # Installation and Render/Vercel deployment guides
│   ├── final_report.md     # Executive summary and outcome scorecards
│   └── presentation.md     # PowerPoint presentation slide outlines
└── README.md
```

---

## 🛠 Local Development Setup

To run the application, navigate to each directory and follow the setup instructions detailed in [user_manual.md](docs/user_manual.md):

1. **MongoDB Database**: Make sure your local MongoDB instance is active or paste your MongoDB Atlas Connection URI in `backend/.env`.
2. **Node Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. **React Frontend**:
   ```bash
   cd ShopEZ
   npm install
   npm run dev
   ```
4. **AI Flask Server (Optional)**:
   ```bash
   cd ai_module
   pip install -r requirements.txt
   python train_recommender.py
   python ai_server.py
   ```

---

## 🧪 Running QA Test Suites

To verify authentication, authorization middleware, API integrations, and the Javascript recommendation fallbacks:
```bash
cd backend
node tests/run_tests.js
```

---

## 🌐 Production Deployments

For complete step-by-step guidance on setting up cloud environments:
- Refer to the [Vercel & Render Deployment Guide](docs/user_manual.md#2-deployment-guide).
- Refer to the [MongoDB Atlas Cluster Configuration Setup](docs/user_manual.md#21-mongodb-atlas-setup).
