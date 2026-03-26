# VEGA Ops Bench

**VEGA Ops Bench** is an Angular enterprise-style console for electronics project management, power planning, and component registry.

## Purpose

The application models a real-world electronics build workflow, helping users plan, document, and validate modular projects. It centralizes component data, power budgets, compatibility, and operational documentation.

## Tech Stack

- Angular
- TypeScript
- SCSS
- RxJS
- Angular Material
- REST API (mock/SWAPI)
- Jasmine + Karma
- GitHub Actions

## Architecture Highlights

- DTO to domain model mapping
- Standalone Angular structure
- Container vs presentational component split
- Reactive search with RxJS
- Local asset pipeline for component images
- CI pipeline with GitHub Actions

## Current MVP

- Projects dashboard (coming soon)
- Component catalog (ex-fleet registry)
- Reactive search
- Operational component cards
- Curated local image pipeline
- Base CI workflow

## Next Steps

- Project detail/build sheet
- Power planner
- VEGA Assistant (project copilot)
- NgRx for state management
- GraphQL integration for enriched detail view
- i18n

---

**Pitch:**

> VEGA Ops Bench is a console for planning and managing electronics builds, organizing components, power budgets, compatibility, and assembly documentation. It’s designed for real-world use by makers, engineers, and hobbyists.

---

For more details, see [docs/REQUIREMENTS-COVERAGE.md](docs/REQUIREMENTS-COVERAGE.md).
