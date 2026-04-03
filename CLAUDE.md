# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
composer run dev        # Start full dev environment (Laravel + queue worker + log viewer + Vite)
composer run dev:ssr    # Same but with SSR enabled (php artisan inertia:start-ssr instead of Vite)
```

### Frontend
```bash
npm run dev             # Vite dev server only (HMR)
npm run build           # Production frontend build
npm run build:ssr       # SSR production build
npm run lint            # ESLint with auto-fix
npm run format          # Prettier formatting
npm run format:check    # Check formatting without writing
npm run types           # TypeScript type check (no emit)
```

### Backend
```bash
php artisan serve       # Laravel dev server (port 8000)
php artisan migrate     # Run pending migrations
php artisan test        # Run PHPUnit tests
./vendor/bin/phpunit    # Run PHPUnit directly
php artisan queue:listen --tries=1  # Queue worker
php artisan pail        # Real-time log viewer
```

### Initial Setup
```bash
composer install && npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
composer run dev
```

## Architecture

**Stack:** Laravel 12 (backend) + React 19 + TypeScript + Inertia.js 2 (full-stack glue) + Tailwind CSS 4 + shadcn/ui + Vite 6. Database: PostgreSQL.

### Inertia.js Pattern
There is no REST API. All data flows through Inertia:
- **GET requests** → Laravel controller returns `Inertia::render('PageName', $props)` → React component receives props
- **Form submissions** → Inertia `useForm()` hook POSTs to Laravel → controller redirects with flash message
- **Shared data** → `app/Http/Middleware/HandleInertiaRequests.php` injects `auth.user`, `flash`, `ziggy` routes, and a random quote into every response

### Routing
Routes are defined in `routes/web.php` and grouped by middleware:
- Public: `/`, `/login`, `/register`, `/auth/google*`
- Guest-only (`GuestMiddleware`): login/register pages
- Admin-only (`AdminMiddleware`): `/admin/*` — checks `user_role === 'admin'`
- Auth-only (`UserMiddleware`): `/dashboard`, `/user/*`

Frontend uses Ziggy for typed route helpers (`route('admin.dashboard')`).

### Page Components
React pages live in `resources/js/pages/` and map 1:1 to Inertia render calls:
- `resources/js/pages/Auth/Login.tsx` ← `Inertia::render('Auth/Login')`
- `resources/js/pages/Admin/Dashboard.tsx` ← `Inertia::render('Admin/Dashboard')`
- `resources/js/pages/User/Dashboard.tsx` ← `Inertia::render('User/Dashboard')`

Pages are wrapped by layout components: `resources/js/layouts/admin-layout.tsx` and `resources/js/layouts/user-layout.tsx`.

### Authentication
- **Email/password:** `app/Http/Controllers/Auth/LoginController.php` using `Auth::attempt()`
- **Google OAuth:** `app/Http/Controllers/Auth/SocialAuthController.php` via Laravel Socialite; new users get a welcome email (`app/Mail/WelcomeEmail.php`)
- **Role check:** `user_role` enum column on users table (`admin` | `user`). The email `princesanguan44@gmail.com` is hardcoded to receive admin role on Google OAuth login
- **Sessions:** stored in the database (`SESSION_DRIVER=database`)

### Frontend Component System
- UI primitives from shadcn/ui live in `resources/js/components/ui/`
- Path alias `@/*` maps to `resources/js/*`
- Prettier config: 4-space tabs, single quotes, 150 char print width
- Framer Motion for animations, React Hot Toast for notifications, Lucide for icons

### Key Config Files
- `config/services.php` — Google OAuth credentials (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`)
- `config/inertia.php` — Inertia SSR settings
- `components.json` — shadcn/ui component configuration
- `vite.config.ts` — Vite + Inertia + Laravel plugin setup

### Database
PostgreSQL. Migrations in `database/migrations/`. Core tables: `users` (with `user_role`, `google_id`, `last_login_at`), `sessions`, `cache`, `jobs`. Queue and cache both use the database driver.
