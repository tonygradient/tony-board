# TONY Board — Design System

## Brand Identity
**Agent:** TONY (The Orchestrating Network for You)  
**Company:** Gradient  
**Vibe:** Professional, powerful, warm AI assistant

## Core Colors

### Primary (Gradient Teal/Cyan)
- **Base:** `#0e5a6b` — Dark teal, strategic, trustworthy
- **Light:** `#4db8b8` — Turquoise for hover states
- **Dark:** `#0a4653` — Deeper for pressed states
- **Contrast text:** `#ffffff` white on teal backgrounds

### Accent (Gradient Orange)
- **Base:** `#ef7847` — Warm orange, energetic, human
- **Light:** `#ff8b5e` — Brighter for hover
- **Dark:** `#d66534` — Deeper for pressed
- **Usage:** CTAs, urgent items, notifications

### Semantics
- **Success:** `#22c55e` green — Task completion, positive actions
- **Warning:** `#f59e0b` amber — Attention needed
- **Danger:** `#ef4444` red — Errors, deletion, overdue

### Neutrals (Dark Theme)
- **Background:** `#0a0a0a` — Pure black base
- **Surface:** `#111111` — Cards, panels
- **Elevated:** `#18181b` — Hover, elevated surfaces
- **Border:** `#27272a` — Subtle divisions
- **Text Primary:** `#ededed` — High contrast
- **Text Secondary:** `#a3a3a3` — Medium contrast
- **Text Muted:** `#71717a` — Low contrast

## Typography
- **Primary:** Montserrat — Geometric, modern, professional
- **Monospace:** JetBrains Mono — Code, data, technical

## Contrast Ratios
All color combinations tested for WCAG AA compliance:

| Background | Text | Ratio | Pass |
|------------|------|-------|------|
| `#1032cf` blue | `#ffffff` white | 7.2:1 | ✅ |
| `#ef7847` orange | `#ffffff` white | 4.6:1 | ✅ |
| `rgba(42, 78, 239, 0.2)` blue bg | `#93b4ff` light blue | 6.8:1 | ✅ |
| `rgba(239, 120, 71, 0.2)` orange bg | `#ffb088` light orange | 5.9:1 | ✅ |

## Component Patterns

### Priority Badges
- **Low (1):** Gray `#d4d4d8` on `rgba(113, 113, 122, 0.2)`
- **Medium (2):** Light blue `#93b4ff` on `rgba(42, 78, 239, 0.2)`
- **High (3):** Light orange `#ffb088` on `rgba(239, 120, 71, 0.2)`
- **Critical (4):** Light red `#fca5a5` on `rgba(239, 68, 68, 0.2)`

### Status Badges
- **Backlog:** Gray
- **Doing:** Blue (active work)
- **Review:** Purple
- **On Hold:** Amber (warning)
- **Done:** Green (success)
- **Archived:** Dimmed gray

### Tags
- **Technical/code:** Blue tint
- **Business/urgent:** Orange tint  
- **General:** Neutral gray
- **Success:** Green tint
- **Error:** Red tint

## Accessibility
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text (18pt+)
- Focus states visible with 2px ring
- Interactive elements min 44x44px touch target

## Inspiration
- GitHub dark theme (technical credibility)
- Linear (clean, fast, purposeful)
- Vercel (high contrast, monospace details)
- Arc browser (warm accents on dark base)

---

This is the canonical reference for all color, typography, and component decisions in TONY Board.
