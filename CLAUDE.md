# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack money tracker application built as a Turborepo monorepo with:
- **Backend API**: FastAPI (Python) with PostgreSQL database
- **Frontend**: Next.js (TypeScript/React) with Clerk authentication
- **Package Manager**: pnpm
- **Architecture**: Monorepo with shared development tools

## Development Commands

### Root Level (Turborepo)
```bash
# Start all applications in development mode
pnpm dev

# Build all applications
pnpm build

# Lint all applications
pnpm lint

# Type check all applications  
pnpm run check-types

# Format code across the monorepo
pnpm run format
```

### Backend API (`apps/api/`)
```bash
# Start development server (from api directory)
pipenv run dev

# Using Docker Compose (recommended)
make up           # Start all containers (API + DB)
make down         # Stop all containers
make build        # Build containers

# Database operations
make migrate      # Run pending migrations
make revision     # Create new migration from model changes
make downgrade    # Rollback one migration
make reset-db     # Reset database completely
make connect-db   # Connect to PostgreSQL shell

# Testing
make test         # Run pytest tests

# Linting (Python)
pipenv run lint   # Black + isort formatting
```

### Frontend (`apps/web/`)
```bash
# Development server with Turbopack
npm run dev

# Build for production
npm run build

# Linting
npm run lint
npm run lint:fix

# Type checking (watch mode)
npm run watch
```

## Architecture Overview

### Backend Structure
- **FastAPI application** with JWT authentication via Clerk
- **Database**: PostgreSQL with SQLAlchemy ORM and Alembic migrations
- **Authentication**: Clerk integration with custom middleware
- **API patterns**: Repository pattern with services, routers, and schemas
- **Key models**: Transaction (income/expense with categories), Category
- **Docker deployment** with health checks and database initialization

### Frontend Structure
- **Next.js 15** with App Router and TypeScript
- **Authentication**: Clerk integration with middleware protection
- **UI Framework**: Radix UI components with Tailwind CSS
- **Data fetching**: SWR for API state management
- **Form handling**: React Hook Form with Zod validation
- **Architecture**: Feature-based organization with shared components

### Key Data Flow
1. **Authentication**: Clerk handles user auth, backend validates JWT tokens
2. **Transactions**: Users create income/expense transactions with categories
3. **Categories**: Predefined or user-created transaction categories
4. **API Communication**: Frontend uses SWR to fetch/mutate data via FastAPI endpoints

### Environment Configuration
- **Backend**: Requires `DATABASE_URL`, Clerk keys (`CLERK_ISSUER`, `CLERK_JWKS_URL`, `CLERK_SECRET_KEY`)
- **Frontend**: Requires Clerk publishable key and API endpoints
- **Development**: Uses Docker Compose for local database

### Testing & Quality
- **Backend**: pytest for API testing
- **Frontend**: ESLint + TypeScript for code quality
- **Formatting**: Black/isort (Python), Prettier (TypeScript)
- **Type Safety**: Full TypeScript coverage with strict configuration

### Database Schema
- **transactions**: Core entity with user_id, amount, type (income/expense), category_id, date
- **categories**: Transaction categorization with name and type
- **Migrations**: Alembic-managed with timestamped revisions