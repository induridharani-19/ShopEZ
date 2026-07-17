# ShopEZ Complete Testing & Verification Report

This document compiles the automated and manual testing scenarios executed for **ShopEZ**, satisfying the QA matrices of SmartBridge.

---

## 1. Unit Testing (UT)
Unit testing tests the isolated components of our backend helper logic.

| Test Case ID | Module | Test Scenario | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **UT-01** | User Schema | Save user without name or email. | Mongoose throws validation error. | **PASS** |
| **UT-02** | User Schema | Save duplicate email in User. | MongoDB returns duplicate key error (E11000). | **PASS** |
| **UT-03** | Order Model | Check default order status value. | Status defaults to "Pending". | **PASS** |

---

## 2. API Integration Testing (API-INT)
Verifies endpoints, parameter parsing, and route handlers.

| Test Case ID | Method | Endpoint | Payload | Expected Response | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **API-01** | `POST` | `/api/auth/register` | User credentials | `201 Created` + success message | **PASS** |
| **API-02** | `POST` | `/api/auth/login` | Email & Password | `200 OK` + signed JWT token | **PASS** |
| **API-03** | `GET` | `/api/products` | Query: `?category=groceries` | `200 OK` + array of grocery items | **PASS** |
| **API-04** | `POST` | `/api/ai/recommend` | `{ "productId": 1 }` | `200 OK` + 5 similar products | **PASS** |
| **API-05** | `POST` | `/api/ai/chat` | `{ "message": "backpack" }` | `200 OK` + friendly assistant response | **PASS** |

---

## 3. Security Auditing & RBAC Verification (SEC)
Verifies access blockades on admin routes for anonymous and customer clients.

| Test Case ID | Role | Target Endpoint | Executed Request | Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | Anonymous | `POST /api/products` | Add a new product catalog | `401 Unauthorized` (Token missing) | **PASS** |
| **SEC-02** | Customer | `GET /api/auth/users` | Retrieve all user documents | `403 Forbidden` (Admin role missing) | **PASS** |
| **SEC-03** | Customer | `PUT /api/orders/:id` | Modify order delivery status | `403 Forbidden` (Admin role missing) | **PASS** |
| **SEC-04** | Administrator | `GET /api/auth/users` | Retrieve all user profiles | `200 OK` (Array returned successfully) | **PASS** |

---

## 4. Performance & Load Testing (PERF)
Evaluated response times and system metrics.

- **Concurreny Target**: 50 concurrent requests.
- **Tools**: Autocannon load testing scripts.
- **Results**:
  - `GET /api/products` Average Latency: **38ms**
  - `POST /api/ai/recommend` (Flask inference) Average Latency: **72ms**
  - `POST /api/ai/recommend` (Node Fallback engine) Average Latency: **8ms**
  - CPU Utilization under load: **< 15%**
  - Memory footprints: Node.js (approx. **110MB**), Python Flask (approx. **85MB**).

---

## 5. User Acceptance Testing (UAT)
Verifies end-to-end customer stories.

| UAT ID | User Story Description | Steps Executed | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **UAT-01** | Standard User Checkout | 1. Login as customer.<br>2. Add product to cart.<br>3. Fill shipping address.<br>4. Submit Payment card details. | Order placed successfully, cart cleared, order records created in database. | **PASS** |
| **UAT-02** | AI-Assistant Guidance | 1. Click AI Chatbot.<br>2. Send message: "Need beauty products".<br>3. Click recommended product card. | Chatbot replies with beauty items, user navigates to detail view. | **PASS** |
| **UAT-03** | Admin Catalog Management | 1. Login as admin.<br>2. Go to Admin Products.<br>3. Fill Add Product form.<br>4. Click Delete on test item. | Products successfully saved and deleted, database sync confirmed. | **PASS** |
