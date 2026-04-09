You are a senior full-stack architect and product designer tasked with building an enterprise-grade Admin Dashboard for a platform called "Serenity" — a modern wellness, spa, and digital service ecosystem.

Your goal is to design and generate a COMPLETE, PRODUCTION-READY Admin Dashboard System with scalability, security, and performance at its core.

--------------------------------------------------
🧠 SYSTEM OVERVIEW
--------------------------------------------------
Serenity is a premium platform offering:
- Wellness services (steam, spa, relaxation packages)
- Subscription-based packages
- Digital content & engagement
- Customer relationship management

The Admin Dashboard is the CONTROL CENTER of the entire ecosystem.

--------------------------------------------------
🏗️ TECH STACK REQUIREMENTS
--------------------------------------------------
Frontend:
- React (Next.js preferred)
- TailwindCSS + ShadCN UI
- Framer Motion (animations)
- Zustand or Redux Toolkit (state)

Backend:
- Node.js (Express or NestJS)
- MongoDB (Mongoose ODM)
- Redis (caching, sessions, queues)

Infrastructure:
- Cloudinary (media storage)
- AWS / Vercel / DigitalOcean
- Docker support
- CI/CD pipeline ready

Security:
- JWT + Refresh Tokens
- Role-Based Access Control (RBAC)
- 2FA (TOTP-based)
- Rate limiting + IP whitelisting

--------------------------------------------------
🎛️ CORE DASHBOARD MODULES
--------------------------------------------------

1. 📊 Analytics & Insights Engine
- Real-time KPI dashboard
- Revenue tracking (daily, monthly, yearly)
- Conversion funnel visualization
- User acquisition sources
- Peak usage heatmaps
- Payment success/failure analytics
- Package performance leaderboard

2. 👥 User Management System
- User list with filters (active, inactive, premium)
- Role assignment & permissions
- Account suspension/ban system
- Activity tracking per user
- Subscription lifecycle management

3. 📦 Package & Pricing Management
- Create/edit/delete packages
- Dynamic pricing (monthly, yearly, one-time)
- Version control for pricing
- Price history tracking
- Bulk price updates (percentage-based)
- Feature toggles per package

4. 🖼️ Media & Asset Management (Cloudinary Integration)
- Upload, update, delete images
- Version control with rollback
- Image optimization & metadata
- Categorization (hero, features, testimonials)
- File size + dimension tracking

5. 💬 Customer Support System
- Live chat dashboard (real-time)
- Ticket system with priorities (low, medium, high, urgent)
- Admin assignment per ticket
- FAQ CMS (editable)
- AI-powered auto responses for common queries

6. 📢 Campaign & Notification Engine
- Email + SMS campaigns
- Scheduled broadcasts
- Trigger-based automation:
  - Birthday offers
  - Payment reminders
  - Re-engagement campaigns
- Campaign analytics (open rate, CTR)

7. 📝 Content Management System (CMS)
- Blog/article management
- SEO optimization (meta, schema, keywords)
- Announcement banners
- Testimonials management
- Drag-and-drop content blocks

8. 🔐 Security & Compliance Dashboard
- 2FA management
- Login attempt monitoring
- IP whitelist control
- Admin session logs
- Audit trail (all actions logged)
- GDPR tools:
  - Data export
  - Data anonymization
  - Consent tracking

9. 🔔 Real-Time Notification Center
- Payment failure alerts
- System health warnings
- Admin activity alerts
- Low resource warnings

10. ⚙️ System Settings & Configuration
- Global site settings (key-value system)
- Feature flags (enable/disable modules)
- Payment gateway configs
- Email/SMS provider configs

--------------------------------------------------
🚀 ADVANCED ENTERPRISE FEATURES
--------------------------------------------------

- A/B Testing Framework (pricing, UI, CTAs)
- Affiliate & Referral System (tracking + payouts)
- API Usage Dashboard (rate limits + analytics)
- Webhook Management System (retry + logs)
- Backup & Restore System (automated snapshots)
- Maintenance Mode Scheduler
- Feature Voting Board (user feedback system)
- Waitlist & Beta Access Management

--------------------------------------------------
🧩 BACKEND REQUIREMENTS
--------------------------------------------------

- Modular MVC architecture
- Clean RESTful API structure
- Middleware:
  - Authentication
  - Authorization (permissions)
  - Rate limiting
  - Validation
- Audit logging system for ALL admin actions
- Queue system (BullMQ / Redis) for:
  - Emails
  - Notifications
  - Background jobs

--------------------------------------------------
🎨 UI/UX DESIGN REQUIREMENTS
--------------------------------------------------

- Inspired by Stripe, Vercel, Linear dashboards
- Minimal, clean, modern interface
- Dark/light mode toggle
- Sidebar navigation with icons
- Data-rich cards with micro-interactions
- Smooth transitions using Framer Motion
- Fully responsive (desktop-first)

--------------------------------------------------
📈 PERFORMANCE & SCALABILITY
--------------------------------------------------

- Lazy loading & code splitting
- API caching (Redis)
- Optimistic UI updates
- Pagination & infinite scrolling
- Microservices-ready architecture

--------------------------------------------------
🧪 TESTING & QUALITY
--------------------------------------------------

- Unit + Integration tests
- API validation tests
- Error handling & logging (Sentry-ready)

--------------------------------------------------
📦 OUTPUT FORMAT
--------------------------------------------------

Generate:
1. Full system architecture diagram (text-based)
2. Folder structure (frontend + backend)
3. Key API endpoints
4. Sample UI layout (React components)
5. Database schema (optimized)
6. Security flow (auth + permissions)
7. Deployment strategy

Ensure:
- Production-level code quality
- Clean, scalable, maintainable architecture
- Enterprise-grade security practices