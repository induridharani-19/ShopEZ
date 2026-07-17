# System Architecture & Design Diagrams

This document outlines the software architecture, database models, and execution sequence diagrams for **ShopEZ**. All diagrams are built using **Mermaid** syntax for dynamic visualization.

---

## 1. System Flowchart

The system flowchart maps how a client browser makes requests, how they are filtered by authorization middlewares, and how the servers process and return responses.

```mermaid
graph TD
    Client["Client Browser (React)"]
    Server["Express API Server (Node.js)"]
    Database[("MongoDB Database")]
    Flask["Flask AI Server (Python)"]

    Client -->|HTTP Request| Server
    Server -->|Read/Write Queries| Database
    Server -->|POST /recommend & /chat| Flask
    Flask -->|Return ML Predictions| Server
    Server -->|JSON Response| Client
```

---

## 2. Use Case Diagram

Defines how users (Customers and Administrators) interact with various services in ShopEZ.

```mermaid
graph LR
    subgraph Users ["👤 Roles"]
        Customer["Customer"]
        Administrator["Administrator"]
    end

    subgraph System ["🛒 ShopEZ System"]
        UC1["Browse Catalog"]
        UC2["Use AI Chatbot"]
        UC3["Add to Cart & Checkout"]
        UC4["Manage Profile"]
        UC5["Manage Products Catalog"]
        UC6["Update Orders Status"]
        UC7["Monitor Analytics Dashboard"]
    end

    Customer --> UC1
    Customer --> UC2
    Customer --> UC3
    Customer --> UC4

    Administrator --> UC5
    Administrator --> UC6
    Administrator --> UC7
```

---

## 3. Class Diagram

Describes the core data schemas and the relationships between various entities in the codebase.

```mermaid
classDiagram
    class User {
        +ObjectId _id
        +String name
        +String email
        +String password
        +Boolean isAdmin
        +Date date
    }
    
    class Product {
        +ObjectId _id
        +Number id
        +String title
        +Number price
        +String description
        +String category
        +String image
        +Object rating
    }

    class Order {
        +ObjectId _id
        +String id
        +ObjectId userId
        +Array items
        +String shippingAddress
        +String paymentMethod
        +Object paymentDetails
        +Number subtotal
        +Number total
        +String status
        +Date date
    }

    User "1" --> "many" Order : places
    Order "1" --> "many" Product : contains
```

---

## 4. Sequence Diagram

Illustrates the execution sequence for an authenticated admin attempting to query the Dashboard statistics.

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Admin Browser
    participant Express as Node Server
    participant Auth as adminMiddleware
    participant DB as MongoDB

    Admin->>Express: GET /api/orders/dashboard-stats (Bearer JWT Token)
    Express->>Auth: Verify JWT & Query isAdmin
    alt Token is valid & isAdmin === true
        Auth-->>Express: Authorized
        Express->>DB: Count Users, Products, Orders & Sum Revenue
        DB-->>Express: Return counts and aggregations
        Express-->>Admin: 200 OK (Stats JSON Payload)
    else Token is invalid / Not Admin
        Auth-->>Express: Rejected
        Express-->>Admin: 403 Forbidden / 401 Unauthorized
    end
```

---

## 5. Entity Relationship (ER) Diagram

Represents the relational schema structure mapped inside MongoDB Atlas.

```mermaid
erDiagram
    USER {
        ObjectId id PK
        string name
        string email
        string password
        boolean isAdmin
        date date
    }
    PRODUCT {
        ObjectId mongo_id PK
        int id
        string title
        float price
        string description
        string category
        string image
    }
    ORDER {
        ObjectId mongo_id PK
        string id
        ObjectId userId FK
        array items
        string shippingAddress
        string paymentMethod
        float total
        string status
    }

    USER ||--o{ ORDER : places
    ORDER ||--|{ PRODUCT : includes
```

---

## 6. Data Flow Diagram (DFD - Level 1)

Illustrates how data passes through processes to databases.

```mermaid
graph LR
    User([Customer]) -->|1. Browses Catalog| P1["View Catalog Process"]
    P1 <-->|Fetch Catalog| DB_Products[(Products DB)]

    User -->|2. Submits Order| P2["Checkout Process"]
    P2 -->|Save Order| DB_Orders[(Orders DB)]
    P2 -->|Read Profile| DB_Users[(Users DB)]

    User -->|3. Query Chatbot| P3["AI Chatbot Process"]
    P3 <-->|TF-IDF Description Match| DB_Products
```

---

## 7. Deployment Diagram

Depicts the host topology of the production system.

```mermaid
graph TD
    UserDev["Developer Desktop"] -->|Pushes Code| GitHub["GitHub Repository"]
    
    subgraph Vercel_Cloud [Vercel Hosting]
        ReactApp["Vite + React SPA"]
    end
    
    subgraph Render_Cloud [Render Platform]
        NodeApp["Express API Server"]
        PythonApp["Flask AI Recommender"]
    end

    subgraph MongoDB_Cloud [MongoDB Atlas]
        DB[("MongoDB Cluster")]
    end

    GitHub -->|CI/CD Deploy| ReactApp
    GitHub -->|CI/CD Deploy| NodeApp
    ReactApp -->|REST Calls| NodeApp
    NodeApp -->|Inference APIs| PythonApp
    NodeApp -->|Mongoose Connection| DB
```
