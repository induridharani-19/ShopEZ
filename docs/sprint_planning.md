# Sprint Planning & Burndown Chart

This document details the Agile project management plan, sprint lifecycles, user stories, story points estimation, team velocity, and burndown chart for **ShopEZ**.

---

## 1. Sprint Cycles Overview

We split the project into three distinct 2-week Sprints:

```
[Sprint 1: Core Foundation] ➔ [Sprint 2: E-commerce Features] ➔ [Sprint 3: AI & Security Audit]
       (Weeks 1 - 2)                   (Weeks 3 - 4)                   (Weeks 5 - 6)
```

---

## 2. Sprint Backlogs & Story Points

Story points are estimated using the Fibonacci sequence based on complexity.

### Sprint 1: Core MERN Setup (Weeks 1-2)
- **US-01**: Setup MongoDB database structure and write Express seed scripts. *(3 SP)*
- **US-02**: Establish JWT login/register routines and Google OAuth endpoints. *(5 SP)*
- **US-03**: Create React main layouts, navigation shell, and theme variables. *(3 SP)*
- **US-04**: Build product listing catalog and details page layout. *(5 SP)*
- **Sprint 1 Target**: **16 Story Points**

### Sprint 2: E-commerce Flow (Weeks 3-4)
- **US-05**: Implement CartContext state and local storage caching. *(3 SP)*
- **US-06**: Write checkout forms, address collection, and mock payment validator. *(5 SP)*
- **US-07**: Design customer profile views and order history lists. *(3 SP)*
- **US-08**: Develop Admin layouts (Manage Products, Users, and Order list). *(8 SP)*
- **Sprint 2 Target**: **19 Story Points**

### Sprint 3: AI Engine & Security Auditing (Weeks 5-6)
- **US-09**: Write Python TF-IDF recommendation trainer and pickle the model. *(5 SP)*
- **US-10**: Develop Flask server and mount Node.js API wrappers. *(3 SP)*
- **US-11**: Implement Javascript-native TF-IDF fallback recommender in Express. *(5 SP)*
- **US-12**: Protect backend admin routes with authorization middlewares. *(5 SP)*
- **US-13**: Add global floating AI Chatbot in frontend. *(3 SP)*
- **Sprint 3 Target**: **21 Story Points**

---

## 3. Team Velocity & Burndown Chart

- **Total Estimated Story Points**: **56 SP**
- **Sprints**: 3 Sprints (6 Weeks)
- **Average Velocity**: **18.7 Story Points per Sprint**

### Text-Based Project Burndown Chart
Below is the burndown chart demonstrating the actual remaining work versus the ideal work profile.

```text
Story Points
  60 |  \ (Start: 56 SP)
  50 |   *
  40 |    \----\  (End of Sprint 1: 40 SP Remaining)
  30 |          \
  20 |           *-----\ (End of Sprint 2: 21 SP Remaining)
  10 |                  \
   0 |                   * (End of Sprint 3: 0 SP Remaining)
     +---------------------------------------------------
       Sprint 0    Sprint 1    Sprint 2    Sprint 3
```

- **Sprint 1 Actual Completion**: Completed US-01, US-02, US-03, US-04 (16 SP completed).
- **Sprint 2 Actual Completion**: Completed US-05, US-06, US-07, US-08 (19 SP completed).
- **Sprint 3 Actual Completion**: Completed US-09, US-10, US-11, US-12, US-13 (21 SP completed).
