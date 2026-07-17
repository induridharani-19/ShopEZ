# ShopEZ Bug Triage & Audit Matrix

This document tracks security flaws, usability gaps, and performance bugs discovered during the repository audit, along with their corresponding architectural fixes.

---

## 1. Bug Classification Criteria
We classify bugs based on standard industry severity parameters:
- **Critical**: Security vulnerabilities exposing administrative endpoints, credentials, or client data.
- **High**: Functional breakdowns preventing users from completing actions (e.g., checkout, dashboard viewing).
- **Medium**: UI flaws, performance delays, or missing graceful error recovery.
- **Low**: Naming inconsistencies or boilerplate readme descriptions.

---

## 2. Bug Triage & Resolution Table

| Bug ID | Component | Severity | Bug Description | Resolution Action | Status |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **BUG-01** | Backend API | **Critical** | Product creation (`POST`), edit (`PUT`), and deletion (`DELETE`) routes had zero authentication checks. Any guest could rewrite the database. | Imported `authMiddleware` and `adminMiddleware` to secure all catalog operations. | **RESOLVED** |
| **BUG-02** | Backend API | **Critical** | Admin endpoints for user retrieval (`GET /users`) and account deletion were completely public. | Protected routes via administrator role token validations. | **RESOLVED** |
| **BUG-03** | Database | **High** | No administrator accounts existed. The seed script only populated a standard customer profile. | Upgraded `db.js` seeder to register a default admin account (`admin@shopez.com` / `admin123`). | **RESOLVED** |
| **BUG-04** | Frontend Client | **High** | The `/admin` Dashboard routes were unprotected in React. Standard clients could manually navigate to admin layouts. | Created `<ProtectedRoute>` checking `user.isAdmin` before rendering dashboard nodes. | **RESOLVED** |
| **BUG-05** | Frontend Client | **High** | The Admin Dashboard statistics were hardcoded texts representing static counts instead of live DB summaries. | Refactored Express APIs to return live aggregates and configured React to fetch on mount. | **RESOLVED** |
| **BUG-06** | AI Engine | **Medium** | If the Python Flask recommendation server went offline, the product detail pages threw network errors and failed. | Engineered a native JavaScript term frequency fallback inside `aiRoutes.js` to preserve recommendations. | **RESOLVED** |
| **BUG-07** | Repository | **Low** | The root repository lacked package configurations, licensing information, or setup directories. | Authored root-level `README.md`, `.gitignore`, `LICENSE`, `CONTRIBUTING.md` guides. | **RESOLVED** |
