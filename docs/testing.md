# 🧪 ShopEZ Testing and QA Documentation

This document describes the automated, manual, and model-validation tests established for the **ShopEZ** e-commerce platform.

---

## 1. Automated Test Suite (Backend)

We run backend tests using a custom Node-native assertion script. 

To execute the tests locally:
```bash
cd backend
node tests/run_tests.js
```

### 📋 Assertions Covered:
1. **JWT Signature Integrity**: Checks that payload properties (`id`, `name`, `isAdmin`) are signed, serialized, and decrypted correctly.
2. **Auth Middleware Gate**: Verifies that requests without valid Bearer headers are rejected with a `401 Unauthorized` status.
3. **JS Recommender Fallback**: Simulates Flask downtime and checks if Node's native TF-IDF Cosine Similarity successfully falls back to suggest relevant products.
4. **Admin Role Guard**: Verifies that standard customer tokens are blocked from accessing protected admin APIs, returning `403 Forbidden`.
5. **Card Checksums**: Validates credit card number digits (16 characters) and CVV length checks.
6. **UPI String Checks**: Validates UPI payment IDs contain the `@` character.

---

## 2. AI Model Performance Validation

We evaluate our Content-Based Recommendation system using Precision@K, Recall@K, and F1-Score metrics calculated against seeded user purchase and description overlaps:

- **Precision@3**: `0.7900`
- **Recall@3**: `0.3099`
- **F1-Score@3**: `0.4452`

### 📊 Performance Plots:
The following evaluation files are saved under the `ai_module/` and `screenshots/` folders:
- **`confusion_matrix.png`**: Category prediction overlaps.
- **`metrics_plot.png`**: Precision vs. Recall curves.

---

## 3. Manual Testing Plan (UAT)

For step-by-step user flow testing (account creation, shopping cart item editing, admin catalog CRUD operations, order status updates), refer to the [User Acceptance Testing (UAT) Report](UAT_Report.md).
