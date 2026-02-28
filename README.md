# 🏭 Nexgile FactoryIQ — Manufacturing Excellence Portal

> A production-grade **React frontend** providing end-to-end visibility across R&D, production, quality, supply chain, and after-sales operations.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Login Credentials](#-login-credentials)
- [Modules](#-modules)
- [Role-Based Access](#-role-based-access)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌐 Overview

**Nexgile FactoryIQ** is a single-portal Manufacturing Excellence Platform built for contract electronics manufacturers. It gives customers and internal teams real-time visibility across the entire product lifecycle — from NPI and production through quality compliance, supply chain, and after-sales service.

The portal features **role-based access control** with two roles out of the box:

| Role | Description |
|------|-------------|
| **Admin** | Full access to all 11 modules including User Management, Integrations, and Settings |
| **Employee** | Scoped access to operational modules — view tasks, raise NCRs/RMAs, collaborate on documents |

---

## ✨ Features

- 🔐 **Role-based login** — Admin and Employee roles with access control enforced per module
- 📊 **Live dashboards** — Production line KPIs, yield trends, capacity utilization, on-time delivery
- 🏗️ **Program tracking** — R&D → NPI → Production pipeline with Gantt-style health indicators and stage gates
- ✅ **Quality management** — NCR/CAPA/Audit tracker, certification library, SPC analytics (Cp/Cpk)
- 🚚 **Supply chain visibility** — PO tracking, inventory min/max thresholds, supplier scorecards
- 🔧 **After-sales service** — RMA intake, warranty claims, spare parts catalog, EOL support
- 💬 **Collaboration** — Project-scoped message threads, document repository, knowledge base
- 📈 **Analytics & reporting** — Executive KPIs, customer dashboards, predictive insights, self-serve export
- 🔌 **Integrations panel** — ERP / MES / PLM / QMS / WMS connector status overview
- 👥 **User management** — Invite, edit, and revoke users with site and role assignment
- ⚙️ **Settings** — Notifications, access control, export preferences, key functional requirement compliance

---

## 📸 Screenshots

> _Login · Dashboard · Programs · Quality · Supply Chain · Analytics_

| Login | Admin Dashboard |
|-------|----------------|
| Dark themed login with role-based demo buttons | Ops overview with KPIs, activity feed, line utilization |

| Quality & Compliance | Supply Chain |
|----------------------|--------------|
| NCR/CAPA tracker + certification library + SPC | PO tracking + inventory thresholds + supplier scores |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher — [Download here](https://nodejs.org)
- **npm** (bundled with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/nexgile-factoryiq-portal.git

# 2. Navigate into the project
cd nexgile-factoryiq-portal

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

The app will open automatically at **http://localhost:3000**

### Production Build

```bash
npm run build
```

This creates an optimized static build in the `/build` folder. You can serve it with any static file server:

```bash
# Example using the 'serve' package
npx serve -s build
```

Or deploy to **Nginx**, **Apache**, **Vercel**, **Netlify**, **GitHub Pages**, etc.

---

## 🔑 Login Credentials

> These are demo credentials hardcoded for the frontend prototype.

| Role | Username | Password |
|------|----------|----------|
| **Administrator** | `admin` | `admin123` |
| **Employee** | `employee` | `emp123` |

> ⚠️ In a production deployment, replace the `USERS` object in `src/App.jsx` with a real authentication API (JWT / OAuth / session-based).

---

## 📦 Modules

### 🛡️ Admin — Full Access (11 Modules)

| Module | Key Capabilities |
|--------|-----------------|
| **Dashboard** | Operations overview, alert bar, KPI stats, line utilization, quick actions |
| **Programs & Projects** | Create/edit programs, health tracking (Green/Yellow/Red), R&D–NPI stage gate pipeline |
| **Production** | Multi-site line dashboards, WIP, output vs plan, yield, rework count, defect Pareto, capacity view, shift changeovers |
| **Quality & Compliance** | NCR/CAPA/Audit tracker, raise NCRs with severity, certification library, SPC analytics (Cp, Cpk, Gage R&R) |
| **Supply Chain** | PO & shipment tracking, inventory min/max thresholds, supplier scorecards, lead time visibility |
| **After-Sales** | RMA intake & triage routing, warranty overview, spare parts catalog, EOL / LTB support |
| **Collaboration & Docs** | Project-scoped threads, document repository with versioning/status, knowledge base categories |
| **Analytics & Reporting** | Executive KPIs, per-customer program dashboards, predictive insights, self-serve export (PDF/Excel/CSV) |
| **Integrations** | ERP / MES / PLM / QMS / WMS connector status, sync timestamps, core data object vocabulary |
| **User Management** | Invite users, assign roles & sites, revoke access |
| **Settings** | General config, notification preferences, access control, export settings, functional requirements compliance |

### 👤 Employee — Scoped Access (8 Modules)

| Module | Access Level |
|--------|-------------|
| **My Dashboard** | Personal tasks, overdue alerts, today's schedule |
| **My Programs** | View assigned programs — read only |
| **Production View** | View production line data — read only |
| **Quality Tasks** | View NCRs/CAPAs assigned to me |
| **Supply Visibility** | View POs and inventory — read only |
| **After-Sales** | Create new RMAs, view existing cases |
| **Collaboration** | Full access — send messages, view/upload documents |
| **My Reports** | View program-level reports and export own data |

---

## 🔒 Role-Based Access

```
Admin   →  All 11 modules + create/edit/delete actions
Employee →  8 modules, view-only on most + limited create actions

Protected routes: Integrations, User Management, Settings
→ Show "Access Restricted" screen for non-admin users
```

Access control is enforced at the module level. The sidebar navigation automatically reflects available modules per role.

---

## 📁 Project Structure

```
nexgile-factoryiq-portal/
│
├── public/
│   └── index.html              # HTML shell + Google Fonts import
│
├── src/
│   ├── index.js                # React DOM entry point
│   └── App.jsx                 # All modules, components & logic
│       ├── Theme & constants
│       ├── Shared components   (StatCard, Topbar, SectionHeader, Modal, etc.)
│       ├── LoginPage
│       ├── Sidebar
│       ├── DashboardModule
│       ├── ProgramsModule
│       ├── ProductionModule
│       ├── QualityModule
│       ├── SupplyModule
│       ├── AfterSalesModule
│       ├── CollabModule
│       ├── AnalyticsModule
│       ├── IntegrationsModule
│       ├── UsersModule
│       ├── SettingsModule
│       └── App (root router)
│
├── package.json
└── README.md
```

---

## 🛠 Tech Stack

| Technology | Usage |
|------------|-------|
| **React 18** | UI framework |
| **React DOM** | Rendering |
| **Create React App** | Build tooling |
| **DM Sans** (Google Fonts) | Typography |
| **Inline styles** | All styling — zero CSS framework dependencies |
| **React useState** | All state management — no Redux needed |

> No external UI component libraries. Every component is hand-built with inline styles for full portability.

---

## 🗺 Roadmap

- [ ] Connect to a real REST / GraphQL backend
- [ ] JWT-based authentication with refresh tokens
- [ ] Add real-time WebSocket updates for production line data
- [ ] Recharts integration for live SPC control charts
- [ ] Dark/Light theme toggle
- [ ] Multi-language support (i18n)
- [ ] Export to PDF/Excel (client-side with jsPDF / SheetJS)
- [ ] Customer-facing portal view (separate login scope)
- [ ] Mobile-responsive layout

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

Please make sure to update tests as appropriate.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Sanjay** — Frontend Developer
Built as a technical assessment for **Nexgile Technologies**

- GitHub: [@Sanjay1318](https://github.com/Sanjay1318)
