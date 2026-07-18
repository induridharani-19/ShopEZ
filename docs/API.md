# 🔌 ShopEZ REST API Documentation

This document describes the API specifications for the **ShopEZ** application, mapping endpoints, request bodies, and expected JSON responses.

---

## 🔒 Authentication APIs

### 1. Register User
- **Endpoint**: `POST /api/auth/register`
- **Authentication**: None (Public)
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "60d0fe4f5311236168a109ca",
      "name": "John Doe",
      "email": "john@example.com",
      "isAdmin": false
    }
  }
  ```

### 2. Login User
- **Endpoint**: `POST /api/auth/login`
- **Authentication**: None (Public)
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "60d0fe4f5311236168a109ca",
      "name": "John Doe",
      "email": "john@example.com",
      "isAdmin": false
    }
  }
  ```

---

## 🛍 Product Catalog APIs

### 1. Get All Products
- **Endpoint**: `GET /api/products`
- **Query Parameters**:
  - `search` (Optional): Filter by term (e.g. `t-shirt`)
  - `category` (Optional): Filter by product class (e.g. `beauty`)
- **Response (200 OK)**:
  ```json
  [
    {
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "price": 9.99,
      "category": "beauty",
      "description": "Black volumizing mascara..."
    }
  ]
  ```

### 2. Get Single Product
- **Endpoint**: `GET /api/products/:id`
- **Response (200 OK)**:
  ```json
  {
    "id": 1,
    "title": "Essence Mascara Lash Princess",
    "price": 9.99,
    "category": "beauty",
    "description": "Black volumizing mascara..."
  }
  ```

---

## 📦 Order & Transaction APIs

### 1. Place New Order
- **Endpoint**: `POST /api/orders`
- **Authentication**: Required (JWT Bearer Token)
- **Request Body**:
  ```json
  {
    "items": [
      {
        "id": 1,
        "title": "Essence Mascara Lash Princess",
        "price": 9.99,
        "quantity": 2
      }
    ],
    "totalAmount": 19.98,
    "shippingAddress": {
      "address": "123 Main St",
      "city": "Boston",
      "zip": "02108"
    },
    "paymentMethod": "Card"
  }
  ```
- **Response (210 Created)**:
  ```json
  {
    "message": "Order placed successfully",
    "order": {
      "orderId": "ORD-178435387805",
      "totalAmount": 19.98,
      "status": "Placed"
    }
  }
  ```

### 2. Get Personal Order History
- **Endpoint**: `GET /api/orders/my-orders`
- **Authentication**: Required (JWT Bearer Token)
- **Response (200 OK)**:
  ```json
  [
    {
      "orderId": "ORD-178435387805",
      "totalAmount": 19.98,
      "status": "Placed",
      "createdAt": "2026-07-18T10:00:00.000Z"
    }
  ]
  ```

---

## 🤖 AI & Recommendation APIs

### 1. Get Similar Product Recommendations
- **Endpoint**: `GET /api/ai/recommend/:productId`
- **Response (200 OK)**:
  ```json
  [
    {
      "id": 3,
      "title": "Eyeshadow Palette with Mirror",
      "price": 19.99,
      "category": "beauty",
      "description": "Volumizing cosmetic colors..."
    }
  ]
  ```

### 2. Conversational Chatbot Queries
- **Endpoint**: `POST /api/ai/chat`
- **Request Body**:
  ```json
  {
    "message": "Find me beauty products"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "reply": "Here are some beauty recommendations:",
    "products": [
      {
        "id": 3,
        "title": "Eyeshadow Palette with Mirror"
      }
    ]
  }
  ```

---

## 🔑 Administrator APIs (Role-Based Access)

### 1. Get Analytics Dashboard Stats
- **Endpoint**: `GET /api/orders/dashboard-stats`
- **Authentication**: Required (JWT Bearer Token + Admin Role Verification)
- **Response (200 OK)**:
  ```json
  {
    "usersCount": 15,
    "productsCount": 194,
    "ordersCount": 8,
    "totalRevenue": 245000
  }
  ```

### 2. Add New Product to Catalog
- **Endpoint**: `POST /api/products`
- **Authentication**: Required (JWT Bearer Token + Admin Role Verification)
- **Request Body**:
  ```json
  {
    "title": "Rolex Submariner",
    "price": 9500,
    "category": "watches",
    "description": "Luxurious diving watch..."
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "message": "Product added successfully",
    "product": {
      "id": 195,
      "title": "Rolex Submariner"
    }
  }
  ```
