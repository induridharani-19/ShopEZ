# Functional & Non-Functional Requirements

This document presents the detailed requirements specification for **ShopEZ**, satisfying the functional and non-functional matrices of SmartBridge.

---

## 1. Functional Requirements (FR)

Functional requirements define what the system must do—the actions, transactions, and behaviors.

| Req ID | Component | Requirement Description | User Role |
| :--- | :--- | :--- | :--- |
| **FR-01** | Authentication | Users must be able to Register, Login, and Authenticate via Google Sign-In. | All |
| **FR-02** | Catalog | Users can browse, search, category-filter, and sort products by price/rating. | All |
| **FR-03** | Cart & Wishlist | Users can add items to cart, modify quantities, and manage a wishlist. | Customer |
| **FR-04** | Checkout | Users can specify addresses and checkout using card, UPI, or Cash-on-Delivery. | Customer |
| **FR-05** | Profile | Users can edit profile details (name, email, password) and view order history. | Customer |
| **FR-06** | AI Recommendations | The system must calculate and show 5 related items using content similarity. | Customer |
| **FR-07** | AI Chatbot | A floating chatbot must converse with users and recommend matching products. | Customer |
| **FR-08** | Admin Dashboard | Admins can view database counts, users list, order statuses, and sales revenue. | Admin |
| **FR-09** | Admin Products | Admins can add, edit, and delete products from the catalog. | Admin |
| **FR-10** | Admin Orders | Admins can update shipping statuses (Pending, Shipped, Delivered) or cancel orders. | Admin |

---

## 2. Non-Functional Requirements (NFR)

Non-functional requirements describe constraints on how the system accomplishes its functions (security, performance, compatibility).

### 2.1 Security & Compliance (NFR-SEC)
- **Encryption**: Passwords must be hashed using `bcryptjs` with a salt factor of 10.
- **Authorization**: All admin endpoints must reject requests lacking a valid, signed JWT payload containing administrator privileges.
- **Data Protection**: Sensitive payment tokens (such as credit card details) must be masked, storing only the card brand and the last 4 digits.

### 2.2 Performance & Scalability (NFR-PERF)
- **API Response Time**: Core product querying endpoints must respond in less than 200ms under ordinary conditions.
- **AI Recommendation Latency**: Similar item generation must execute in under 100ms using either the Flask pickle model or the lightweight node-side fallback.
- **Concurrent Connections**: The Node server must handle at least 50 concurrent API requests using asynchronous connection pooling.

### 2.3 Usability & Design (NFR-USE)
- **Responsiveness**: The user interface must adapt dynamically to mobile screens, tablets, and wide desktop displays.
- **Accessibility**: Standard fonts (e.g. Outfit, Inter) and highly legible color contrast ratios must be implemented.
- **Interactions**: Button states must display hover animations, and network operations must present loaders/spinners.
