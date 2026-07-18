# 🚀 ShopEZ Cloud Deployment Guide

This document provides step-by-step instructions to deploy the **ShopEZ** e-commerce store to cloud platforms.

---

## 1. Database Setup: MongoDB Atlas

1. Log into [MongoDB Atlas](https://cloud.mongodb.com).
2. Create a new Cluster (Shared Free Sandbox).
3. Navigate to **Security ➔ Database Access**:
   - Create a database user (e.g. `shopez_db_user`).
   - Configure a strong password.
4. Navigate to **Security ➔ Network Access**:
   - Add IP Access List: Select `0.0.0.0/0` (Allow Access from Anywhere) to permit cloud platform connections.
5. Go to **Database ➔ Connect ➔ Drivers**:
   - Copy the MongoDB connection URI string (e.g. `mongodb+srv://...`).

---

## 2. AI Server Deployment: Render or Railway

The Python Flask AI microservice is deployed as a Web Service.

1. Create a new **Web Service** on Render and link your GitHub repository.
2. Configure Build & Start settings:
   - **Environment**: `Python 3`
   - **Root Directory**: `ai_module`
   - **Build Command**: `pip install -r requirements.txt && python train_recommender.py`
   - **Start Command**: `gunicorn -w 4 -b :5001 ai_server:app`
3. Configure Environment Variables:
   - `PORT=5001`
4. Copy the generated Render Service URL (e.g., `https://shopez-ai.onrender.com`).

---

## 3. Backend API Deployment: Render or Railway

The Node.js Express server is deployed as a Web Service.

1. Create a new **Web Service** on Render and link your GitHub repository.
2. Configure settings:
   - **Environment**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
3. Configure Environment Variables:
   - `MONGO_URI` = `mongodb+srv://shopez_db_user:password@yourcluster.mongodb.net/shopez`
   - `JWT_SECRET` = `your_secure_jwt_secret_key`
   - `PORT` = `5000`
   - `AI_SERVER_URL` = `https://shopez-ai.onrender.com` (Your deployed Python microservice URL)
4. Copy the generated API URL (e.g., `https://shopez-api.onrender.com`).

---

## 4. Frontend Client Deployment: Vercel or Netlify

The React SPA is deployed as a static site.

1. Log into Vercel and import your GitHub repository.
2. Configure Build Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `ShopEZ`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Configure Environment Variables:
   - `VITE_API_URL` = `https://shopez-api.onrender.com/api` (Your deployed Node API backend URL)
4. Click **Deploy**. Your React client is now live!
