# Installation, Developer Guide & Deployment Manuals

This manual contains installation procedures, developer workspace instructions, and step-by-step deployment templates for **ShopEZ**.

---

## 1. Quick-Start Installation (Local Setup)

### 1.1 Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: Local Community Server OR MongoDB Atlas account
- **Python**: v3.9+ (optional, only needed for the Flask AI server; otherwise Javascript native fallback runs automatically)

### 1.2 Running Backend Server
1. Navigate to backend:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_uri
   JWT_SECRET=shopez_secret_key_2026
   ```
4. Start server:
   ```bash
   npm run dev
   ```

### 1.3 Running Frontend Client
1. Navigate to frontend:
   ```bash
   cd ShopEZ
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `ShopEZ/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   ```
4. Start dev server:
   ```bash
   npm run dev
   ```

### 1.4 Starting Python AI Server (Optional)
1. Navigate to AI module:
   ```bash
   cd ai_module
   ```
2. Install python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run model training:
   ```bash
   python train_recommender.py
   ```
4. Start inference server:
   ```bash
   python ai_server.py
   ```

---

## 2. Deployment Guide

### 2.1 MongoDB Atlas Setup
1. Log into your [MongoDB Atlas Portal](https://www.mongodb.com/cloud/atlas).
2. Create a Free Cluster (Shared). Select your preferred cloud host (AWS) and region.
3. Under **Database Access**, create a user account with readWrite permissions.
4. Under **Network Access**, add IP `0.0.0.0/24` or click "Allow Access from Anywhere".
5. Click **Connect** -> **Connect your application** and copy the URI string. Update your backend `.env` file.

### 2.2 Render Deployment (Backend Server & AI microservice)
Render is ideal for hosting our Node.js and Python microservices.

#### Hosting Node Backend:
1. Create a Render account and connect your GitHub.
2. Select **New** -> **Web Service**. Select the `ShopEZ` repository.
3. Configure settings:
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add **Environment Variables** in the Render settings dashboard:
   - `MONGO_URI`: (Your Atlas connection URI string)
   - `JWT_SECRET`: (Your cryptographically random secret string)
5. Click **Deploy**. Copy the provided URL for frontend config.

#### Hosting Python AI Service:
1. Click **New** -> **Web Service**. Select the `ShopEZ` repository.
2. Configure settings:
   - **Root Directory**: `ai_module` (Wait! In Render, specify `ai_module` or root directory with custom commands)
   - **Build Command**: `pip install -r requirements.txt && python train_recommender.py`
   - **Start Command**: `python ai_server.py`
3. Click **Deploy**. Note the URL (e.g. `https://shopez-ai.onrender.com`). Update Node's fetch calls if desired, or let Render keep both on the same private network.

### 2.3 Vercel Deployment (Frontend Client)
Vercel is optimized for React/Vite builds.
1. Create a Vercel account and install Vercel CLI (or connect your GitHub).
2. Link your repository.
3. Choose the frontend folder `ShopEZ` as the project root.
4. Configure Vercel settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under Environment Variables, add:
   - `VITE_API_URL`: (Your backend Web Service URL, e.g. `https://shopez-backend.onrender.com/api`)
6. Click **Deploy**.

---

## 3. Developer Guidelines
- **Adding new APIs**: Place routes under `backend/routes/`. Secure them using `authMiddleware` (for authentication) and `adminMiddleware` (for admin verification).
- **Adding UI Pages**: Save React components in `src/pages/`. Make sure routes in `App.jsx` are wrapped in `<ProtectedRoute>` if they require specific authentication levels.
