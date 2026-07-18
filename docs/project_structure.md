# 📁 Repository Directory Structure

This document outlines the detailed folder layout of the **ShopEZ** repository, clarifying the segregation of frontend components, backend REST APIs, machine learning pipelines, and evaluation configurations.

---

## 🌳 Folder Tree Representation

```text
ShopEZ/
├── .github/                   # GitHub Community and Actions configurations
│   ├── ISSUE_TEMPLATE/        # Standardized issue templates
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/             # GitHub Actions CI workflow
│   │   └── ci.yml
│   └── PULL_REQUEST_TEMPLATE.md
│
├── ShopEZ/                    # React SPA Client (Vite + JavaScript)
│   ├── public/                # Static assets (Favicons, SVG graphics)
│   ├── src/
│   │   ├── assets/            # UI background graphics
│   │   ├── components/        # AIChatbot, ProtectedRoute, Navbar, Footer
│   │   ├── context/           # React State (AuthContext, CartContext)
│   │   ├── data/              # Static product mocks (fallback seed values)
│   │   ├── pages/             # Home, Login, Register, Cart, Wishlist, Profile
│   │   │   └── admin/         # Admin Dashboard, Orders, Products, User Lists
│   │   ├── App.jsx            # App shell and routing layout
│   │   └── main.jsx           # Vite entrypoint mounting node
│   ├── .env.example           # Client environmental configuration template
│   ├── index.html             # HTML mounting document
│   ├── package.json           # Frontend dependency declarations
│   └── vite.config.js         # Vite dev configuration
│
├── backend/                   # Node.js/Express API Gateway Server
│   ├── data/                  # Seeder backup payloads
│   ├── middleware/            # Security filters (authMiddleware, adminMiddleware)
│   ├── models/                # MongoDB Mongoose Schemas (User, Product, Order)
│   ├── routes/                # Endpoint routers (auth, product, order, ai)
│   ├── tests/                 # QA automated testing suite
│   │   └── run_tests.js       # Assertions validation runner
│   ├── .env.example           # Backend credentials template
│   ├── db.js                  # MongoDB Atlas connection and seeder script
│   ├── package.json           # Node package registry
│   └── server.js              # Server entry point
│
├── ai_module/                 # Python AI Recommendation Service
│   ├── models/                # Pickled Cosine Similarity model
│   │   └── recommender_model.pkl
│   ├── ai_server.py           # Flask REST microservice (inference endpoints)
│   ├── train_recommender.py   # TF-IDF training & matrix export pipeline
│   ├── requirements.txt       # Python environment dependencies
│   ├── confusion_matrix.png   # ML classification matrix plots
│   └── metrics_plot.png       # Recall/Precision curve outputs
│
├── docs/                      # Submission Artifacts & Manuals
│   ├── architecture.png       # System deployment diagram
│   ├── API.md                 # Detailed endpoint references
│   ├── deployment.md          # Cloud setup step-by-step
│   ├── testing.md             # Automated & manual testing plans
│   ├── highlights.md          # Technical implementation notes
│   ├── bug_reports.md         # QA triage logs
│   ├── user_manual.md         # Deployment and user guide
│   └── final_report.md        # Evaluator scorecards
│
├── screenshots/               # Application execution evidence
│   ├── README.md              # Screenshot mapping checklists
│   └── *.png                  # Captured UI pages
│
├── docker-compose.yml         # Container coordination orchestrator
├── CHANGELOG.md               # Version changes tracker
├── RELEASE_NOTES.md           # Product release notes
├── CONTRIBUTING.md            # Open-source setup guidelines
├── LICENSE                    # MIT License credentials
└── README.md                  # Main overview readme page
```
