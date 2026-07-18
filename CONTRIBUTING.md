# 🤝 Contributing to ShopEZ

We welcome contributions from developers! Please follow these guidelines to keep code quality consistent and help us merge your changes smoothly.

---

## 1. Local Environment Setup

1. **Fork & Clone**:
   ```bash
   git clone https://github.com/your-username/ShopEZ.git
   cd ShopEZ
   ```
2. **Configure Local Environment**:
   - Duplicate `backend/.env.example` as `backend/.env` and insert your MongoDB Atlas URI.
   - Duplicate `ShopEZ/.env.example` as `ShopEZ/.env` and set `VITE_API_URL=http://localhost:5000/api`.
3. **Install Dependencies**:
   - Install backend modules: `cd backend && npm install`.
   - Install frontend modules: `cd ../ShopEZ && npm install`.
   - Install Python dependencies: `cd ../ai_module && pip install -r requirements.txt`.

---

## 2. Branch Naming Conventions

Always create a descriptive feature branch from `main`:
- **Features**: `feat/feature-name` (e.g., `feat/wishlist-page`)
- **Bug Fixes**: `fix/bug-name` (e.g., `fix/jwt-expiration`)
- **Documentation**: `docs/update-name` (e.g., `docs/api-endpoints`)
- **CI/CD / Docker**: `devops/config-name` (e.g., `devops/docker-compose`)

---

## 3. Commit Message Guidelines

We follow semantic commits:
- `feat:` for new functional features (e.g., `feat: added floating AI chatbot overlay`)
- `fix:` for code bug mitigation (e.g., `fix: added adminMiddleware check on user deletes`)
- `docs:` for markdown file additions (e.g., `docs: added API routes specifications`)
- `refactor:` for edits improving readability without changing features
- `test:` for modifying automated assertions

---

## 4. Pull Request Checklist

Before submitting a Pull Request, ensure that:
- [ ] Code compiles without warning elements.
- [ ] Backend tests run and pass: `npm run test` inside the `backend` folder.
- [ ] No `.env` files are tracked by Git (check `git status`).
- [ ] You have updated corresponding documentation in `docs/` if modifying APIs.
