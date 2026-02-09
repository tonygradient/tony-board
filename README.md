# TONY Board

> Task management interface for Gradient's AI team member

**TONY** (The Orchestrating Network for You) is Gradient's AI team member. This is his task board — a kanban interface designed for human-AI collaboration.

---

## Overview

TONY Board is a fork of [jarvis-board](https://github.com/ashtalksai/jarvis-board), customized with Gradient's brand identity and design system.

**Key differences from the original:**
- Gradient brand colors (blue `#1032cf` + orange `#ef7847`)
- Montserrat typography for professional warmth
- Comprehensive design system with CSS variables
- All inline colors moved to design system
- WCAG AA contrast compliance
- TONY branding throughout

---

## Design System

See [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) for the complete design specification.

**Core principles:**
- **Professional** — Gradient is a B2B agency, this looks the part
- **Warm** — AI should feel helpful, not cold
- **Technical** — Monospace details, terminal aesthetic
- **Accessible** — Proper contrast, readable at all sizes

**Color palette:**
- **Blue:** Strategic, intelligent, technical work
- **Orange:** Urgent, human-facing, priority items
- **Neutral grays:** Most tags and background elements
- **Semantic colors:** Green (success), red (danger), amber (warning)

---

## Features

- **Kanban board** — Drag tasks between Backlog, Doing, Review, On Hold, Done
- **Calendar view** — See ETAs and due dates
- **Priority levels** — 1 (low) to 4 (🔥 critical)
- **Categories** — Strategy, Sales, Marketing, Product, Content, Operations
- **Tags** — Flexible tagging with design system colors
- **Activity feed** — Track all changes and updates
- **Comments** — Discuss tasks with threaded comments
- **Command palette** — ⌘K quick search and navigation
- **Authentication** — Session cookies + API bearer tokens

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** SQLite with better-sqlite3
- **Styling:** Tailwind CSS + CSS variables
- **Typography:** Montserrat (sans) + JetBrains Mono (mono)
- **Drag & Drop:** dnd-kit
- **Deployment:** Docker + Coolify

---

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
npm start

# Docker
docker compose up
```

**Environment variables:**
```env
DATABASE_PATH=./data/tasks.db
SESSION_SECRET=<random-secret>
API_TOKENS=token1,token2
```

---

## API

REST API for external integrations (cron jobs, webhooks, etc.)

**Authentication:** Bearer token in `Authorization` header

**Endpoints:**
- `GET /api/tasks` — List all tasks
- `POST /api/tasks` — Create task
- `GET /api/tasks/:id` — Get task details
- `PUT /api/tasks/:id` — Update task
- `DELETE /api/tasks/:id` — Delete task
- `POST /api/tasks/:id/comments` — Add comment
- `GET /api/activities` — Activity feed

---

## Deployment

This board is deployed privately for Gradient's internal use.

**Original repo (upstream):** https://github.com/ashtalksai/jarvis-board  
**This fork:** TONY Board (Gradient branding)

To deploy your own:
1. Clone this repo
2. Set environment variables
3. Run with Docker or Node.js
4. Configure authentication tokens

---

## Credits

- **Original:** [jarvis-board](https://github.com/ashtalksai/jarvis-board) by Ash
- **Design system:** Applied by TONY for Gradient
- **Company:** [Gradient](https://gradient.nl)

---

Built with 🦾 for Gradient's AI team.
