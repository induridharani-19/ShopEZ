# ✨ ShopEZ Project Highlights

This document lists the technical innovations and functional highlights implemented in the **ShopEZ** secure storefront.

---

## 🤖 1. AI Recommendation System
- **TF-IDF Text Vectorization**: Categorizes product description text profiles.
- **Cosine Similarity Calculations**: Exposes similarity matching via a Flask microservice.
- **Auto-Degrading Fallback**: Node.js computes term similarity in memory if the Flask microservice is offline, avoiding any detail page load crashes.

## 💬 2. Natural Language AI Chatbot
- **Conversational Queries**: Floating shopping advisor dialog window.
- **NLP Product Matching**: Returns clickable product recommendation cards based on user query intents.

## 🛡 3. Authentication & RBAC Gates
- **Encrypted Password Storage**: User passwords are encrypted using `bcryptjs` (salt factor 10).
- **JWT Middleware Encryption**: JWT claims verify client identities.
- **Mongoose RBAC Validators**: Backend routers protect product creation, updates, and user accounts.
- **Protected Client Routes**: React `<ProtectedRoute>` wrappers prevent standard customers from accessing administrative panels.

## 📊 4. Dynamic Admin Analytics Dashboard
- **Live Summaries**: Admin dashboard charts load real-time user registrations, catalog sizes, orders count, and sales revenue aggregates via Express MongoDB queries.

## 📦 5. Deployment & Containerization
- **Multi-stage Dockerization**: Serves static frontend distributions via Nginx, alongside lightweight Node.js API and Python Flask AI service containers.
- **CI Pipelines**: Configured GitHub Actions CI workflow to run client builds, Node endpoint tests, and Python syntax tests on every push.
