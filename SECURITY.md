# 🛡 Security Policy

This document defines the security standards, credentials handling protocols, and responsible vulnerability disclosure process for the **ShopEZ** storefront project.

---

## 1. Reporting Vulnerabilities

If you discover a security vulnerability in this application (such as database credentials exposure or route bypasses), **please do not open a public GitHub issue.** Instead, report your findings responsibly:

1. Send an email describing the vulnerability to: `security@shopez.com` (or contact the project evaluator privately).
2. Provide details including:
   - Endpoint paths or files involved.
   - Step-by-step reproduction instructions.
   - Potential impact or mitigation ideas.

We will acknowledge receipt of your report within 48 hours and work to resolve the issue as quickly as possible.

---

## 2. Responsible Disclosure Guidelines

- Give us a reasonable amount of time to remediate the vulnerability before publishing details.
- Avoid accessing or modifying customer data belonging to other accounts during your testing.
- Do not perform Denial of Service (DoS) attacks on active deployment servers.

---

## 3. Credentials & Keys Handling Policy

To ensure the safety of administrative and database access points, the following rules are strictly enforced:

- **Never Commit Secrets**: Raw passwords, API keys, Mongoose Atlas URLs, or JWT secrets must **never** be committed to Git.
- **Environment Separation**: Local configurations must reside only inside `.env` files, which are listed in `.gitignore` and kept local.
- **Config Templates**: Safe template files (`.env.example`) must be tracked in the repository with placeholder values representing config keys.
- **Rotation Requirements**: If any credentials (such as database passwords) are accidentally exposed in Git commits or logs, they must be rotated immediately on the database service console.
