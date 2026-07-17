# ShopEZ Project Slide Presentation

This slide deck outlines the core project defense slides and speaking script for **ShopEZ**.

---

## Slide 1: Project Overview
- **Title**: ShopEZ - AI-Enhanced Secure MERN Storefront
- **Visuals**: Platform badges (MERN, Python Flask, Docker, MongoDB Atlas)
- **Speaker Script**:
  > "Good morning, evaluators. Today I am introducing ShopEZ, a secure e-commerce storefront utilizing MERN APIs combined with an AI recommendation and conversational assistant microservice."

---

## Slide 2: Problem Statement & Motivation
- **Core Topics**:
  - Exposing administrative databases and APIs in MERN boilerplate repositories.
  - Hardcoded dashboard analytics causing static and unmaintainable storefronts.
  - Standard shop search engines failing to engage clients.
- **Speaker Script**:
  > "Many standard MERN projects suffer from security issues where admin APIs are left unprotected. ShopEZ fixes these vulnerabilities with robust authorization guards while adding AI-driven product recommendations."

---

## Slide 3: System Architecture
- **Key Services**:
  - React Single Page Application (Client)
  - Node.js/Express REST API (Backend Gateway)
  - Python Flask Content-Similarity recommender (AI Engine)
  - MongoDB Atlas (Cloud database)
- **Speaker Script**:
  > "Our system separates concerns. React handles the UI layout, Node enforces role authentication, Flask manages description vector mathematics, and Atlas stores database records."

---

## Slide 4: Security & Route Protection
- **Enforcements**:
  - JWT tokens verify customer logins.
  - Mongoose-based `adminMiddleware` checks roles before executing database writes.
  - Route guards restrict customer browsers from accessing admin control paths.
- **Speaker Script**:
  > "We implemented security gates at both ends. The React client blocks non-admins from opening dashboard views, and the Express backend returns a 403 Forbidden status if authorization claims are missing."

---

## Slide 5: The AI Recommendation Engine
- **Specifications**:
  - Vectorizes description text using TF-IDF weights.
  - Measures cosine angles between product vectors to return 5 recommended items.
  - Integrates a Node.js-native fallback engine to calculate recommendations locally if Flask is unreachable.
- **Speaker Script**:
  > "To personalize the catalog, we compute term vectors using TF-IDF. A key engineering highlight is our Node-side fallback: if the Python service is down, Node calculates document similarity in-memory, ensuring continuous service."

---

## Slide 6: Automated Verification & Testing
- **Coverage**:
  - Hashing and JWT verification logic.
  - Auth and Admin gate checks.
  - Fallback TF-IDF matrix calculations.
  - Input validations for card formats and UPI handles.
- **Speaker Script**:
  > "We tested our application using an automated Node script. It runs 6 validation suites verifying auth gates, card validator math, and similarity fallbacks, all passing successfully."

---

## Slide 7: Deployment & CI/CD
- **Topology**:
  - Frontend: Vercel / Netlify
  - Backend API: Render / Railway
  - AI Engine: Render / Railway
  - Database: MongoDB Atlas cloud cluster
  - CI workflow committed to GitHub Action runners.
- **Speaker Script**:
  > "Our topology is deployment-ready. We provide multi-stage Docker builds and automated CI pipelines, and MongoDB Atlas coordinates database connectivity securely."
