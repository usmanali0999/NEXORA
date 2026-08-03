# NEXORA

Enterprise-grade SaaS analytics and operations dashboard built with React, TypeScript, and modern frontend architecture.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-06B6D4)
![Zustand](https://img.shields.io/badge/Zustand-5-orange)
![React Query](https://img.shields.io/badge/React_Query-5-red)

---

## Overview

Nexora is a production-level enterprise dashboard featuring role-based access control, real-time analytics, modular architecture, and a professional dark UI — designed to demonstrate senior frontend engineering capabilities.

---

## Features

- **Role-Based Access Control** — Admin, Manager, and Analyst roles with route-level protection
- **Protected Routing** — Unauthorized users are redirected automatically
- **Dashboard Analytics** — Revenue trend charts, KPI stat cards, and activity feed
- **Users Management** — Searchable, filterable data table with status badges
- **Analytics Module** — Traffic source visualization with progress bars
- **Settings Panel** — Persisted toggle switches for security and notification preferences
- **Notification System** — Slide-in notification drawer with severity badges
- **Collapsible Sidebar** — Expand/collapse with icon-only mode
- **Persisted State** — Auth, sidebar, and settings survive page refresh
- **Loading Skeletons** — Professional loading states across all modules
- **Mock API Layer** — Service-based data fetching simulating real backend

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| State Management | Zustand |
| Server State | TanStack React Query |
| Routing | React Router v7 |
| Charts | Recharts |
| Icons | Lucide React |
| HTTP Client | Axios |
| Notifications | React Hot Toast |

---

## Architecture

```
src/
├── app/              # Providers, Router
├── config/           # App configuration
├── features/         # Feature modules
│   ├── auth/         # Login, Unauthorized
│   ├── dashboard/    # Stats, Charts, Hooks
│   ├── analytics/    # KPIs, Traffic
│   ├── users/        # Table, Filters
│   └── settings/     # Toggles, Preferences
├── layouts/          # Dashboard shell
├── routes/           # Protected routes, Role guards
├── services/         # API service layer
├── shared/           # Reusable UI components
│   ├── ui/           # Input, Select, Switch, DataTable, StatCard
│   └── components/   # Future shared components
├── store/            # Zustand stores
├── types/            # TypeScript type definitions
├── hooks/            # Custom hooks
└── styles/           # Global styles
```

---

## Role Access Matrix

| Page | Admin | Manager | Analyst |
|------|-------|---------|---------|
| Dashboard | ✅ | ✅ | ✅ |
| Analytics | ✅ | ✅ | ✅ |
| Users | ✅ | ✅ | ❌ |
| Settings | ✅ | ❌ | ❌ |

---

## Getting Started

```bash
git clone https://github.com/usmanali0999/NEXORA.git
cd NEXORA
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Login Options

The app provides three demo login roles:

- **Admin** — Full access to all modules including Settings and Users
- **Manager** — Access to Dashboard, Analytics, and Users
- **Analyst** — Access to Dashboard and Analytics only

---

## State Management

| Store | Purpose | Persisted |
|-------|---------|-----------|
| Auth Store | User session and role | Yes |
| UI Store | Sidebar collapse and notification panel | Yes |
| Settings Store | Security and notification preferences | Yes |

All stores use Zustand with localStorage persistence — state survives page refresh.

---

## API Layer

The project uses a mock service layer that simulates real API calls with async delays:

| Service | Endpoint | Delay |
|---------|----------|-------|
| Dashboard Stats | `getDashboardStats()` | 800ms |
| Revenue Trend | `getRevenueTrend()` | 900ms |
| Users List | `getUsers()` | 900ms |
| Analytics Overview | `getAnalyticsOverview()` | 1000ms |
| Notifications | `getNotifications()` | 700ms |

All services are consumed through TanStack React Query hooks for caching, loading states, and error handling.

---

## Reusable Components

| Component | Location | Purpose |
|-----------|----------|---------|
| StatCard | `shared/ui/StatCard.tsx` | KPI metric display card |
| DataTable | `shared/ui/DataTable.tsx` | Generic typed data table |
| Input | `shared/ui/Input.tsx` | Styled text input |
| Select | `shared/ui/Select.tsx` | Styled dropdown select |
| Switch | `shared/ui/Switch.tsx` | Toggle switch button |
| NotificationPanel | `shared/ui/NotificationPanel.tsx` | Slide-in alert drawer |

---

## Design System

| Element | Value |
|---------|-------|
| Background | `#09090b` |
| Cards | `#111111` |
| Inner Cards | `#0a0a0a` |
| Borders | `#1e1e1e` |
| Hover States | `#1a1a1a` |
| Primary Text | `#ffffff` |
| Secondary Text | `neutral-300` |
| Muted Text | `neutral-500` |
| Active Navigation | White bg, Black text |
| Success Badge | Emerald |
| Warning Badge | Amber |
| Danger Badge | Red |
| Info Badge | Blue |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Deployment

Deploy instantly on Vercel:

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import the NEXORA repository
4. Framework preset: Vite
5. Click Deploy

---

## Author

**Usman Ali**

- GitHub: [@usmanali0999](https://github.com/usmanali0999)

---

## License

This project is open source and available under the [MIT License](LICENSE).