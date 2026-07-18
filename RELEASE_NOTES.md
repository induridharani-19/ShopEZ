# 🚀 Release Notes - ShopEZ v1.0.0

We are proud to announce the production release of **ShopEZ v1.0.0**. This release represents a complete refactoring of the storefront repository, introducing secure administrative access keys, automated recommendations, and a complete suite of documentation for evaluation.

---

## 📅 Release Metadata
- **Version**: `v1.0.0`
- **Date**: July 18, 2026
- **Status**: Production Ready
- **Target Platform**: Vercel (Frontend), Render (Backend & AI), MongoDB Atlas (Database)

---

## ✨ Features Added

### 1. Storefront & Core MERN Services
- **React Frontend**: A fully responsive SPA using Vite, Axios, and React Router v7.
- **Cart & Wishlist**: Context-managed client state supporting promotions coupon `SAVE10`.
- **Order Pipeline**: Secure checkout accepting credit card inputs and UPI handles with instant verification.

### 2. Administrator Access Controls
- **Dynamic Metrics**: Admin dashboard querying MongoDB for counts of catalog items, registered users, and total revenues.
- **Catalog Management**: Admin-only forms to add, edit, and delete products from the database.

---

## 🤖 AI & Recommendation Improvements
- **TF-IDF & Cosine Similarity**: Analyzes categories and description structures to recommend 5 matching products on detail pages.
- **Flask Inference Service**: Lightweight Python microservice serving recommendation vectors.
- **Node-Native Fallback**: Automatic failover logic calculating TF-IDF matches inside Express if Flask is down, ensuring 100% storefront uptime.
- **Conversational Chatbot**: Chat advisor returning clickable product suggestions from NLP text matching.

---

## 🐛 Bug Fixes
- **CORS Configuration**: Corrected server response headers allowing frontend requests across different hosting domains.
- **Vite Asset Imports**: Fixed broken paths for logo graphics.
- **Mermaid Graph Renderings**: Re-architected use cases into standard flowcharts to fix render errors in markdown.

---

## 🛡 Security Improvements
- **Password Hashing**: Configured password encryption via `bcryptjs` with salt round factors of 10.
- **RBAC API Protection**: Enforced JWT validations on all modify-level backend endpoints.
- **Database Password Rotation**: Safely rotated cloud database user passwords and moved credentials to local environment variables.

---

## 📂 Documentation Updates
- Compiled markdown reports into PDF format: `Final_Project_Report.pdf`, `Testing_Report.pdf`, and `UAT_Report.pdf`.
- Created Slide presentation: `ShopEZ_Presentation.pptx` for project defense.
- Drafted developer guides: `docs/deployment.md`, `docs/testing.md`, and `docs/highlights.md`.
