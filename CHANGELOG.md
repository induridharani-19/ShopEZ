# 📝 Changelog

All notable changes to the **ShopEZ** e-commerce project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] - 2026-07-18

### Added
- Multi-job GitHub Actions CI/CD configuration checks (Vite build, Node API assertions, Python AI syntax tests).
- Multi-stage Dockerization support served via Nginx for static frontend and Node/Python containers.
- Standardized community templates: `.github/ISSUE_TEMPLATE/` bug and feature forms, `.github/PULL_REQUEST_TEMPLATE.md`.
- Comprehensive markdown guides: `docs/deployment.md`, `docs/testing.md`, `docs/highlights.md`, and `docs/project_structure.md`.
- Automated script to compile markdown documents into binary deliverables (`docs/generate_deliverables.py`).
- Security policy guidelines (`SECURITY.md`).

### Changed
- Refactored `README.md` to reference `.env.example` templates instead of `.env` files in directory trees.
- Corrected the GitHub Actions workflow directory nesting from `.github/.github/workflows/ci.yml` to `.github/workflows/ci.yml`.
- Updated database connection configuration strings to remove plain-text passwords and use environment values.

### Fixed
- Re-architected Mermaid UML Use Case schemas to flowchart formats to resolve viewer rendering crashes.
- Escaped HTML entities in table cells and headings inside the PDF report builder script to prevent parsing failures.
- Resolved database credentials leakage by rotating Atlas users passwords.
