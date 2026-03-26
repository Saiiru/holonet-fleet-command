# Architecture – VEGA Ops Bench

## Overview

VEGA Ops Bench is organized as a standalone Angular application with a domain-first front-end structure. The current implementation uses the fleet catalog as the primary vertical slice, but the architecture already supports a pivot to electronics project management.

## Structural Principles

### 1. Core vs Shared vs Features

- `core/`: application-level configuration and singletons
- `shared/`: reusable UI primitives, pipes and directives
- `layout/`: shell, navigation and framing components
- `features/`: vertical slices grouped by business capability

### 2. Feature Slice Pattern

Each feature should prefer the following internal split:

- `pages/`: route-level containers
- `components/`: presentational components
- `models/`: DTOs, domain models and mapping utilities
- `data-access/`: REST or GraphQL integration
- `state/`: NgRx actions, reducer, effects and selectors when state becomes shared

The current fleet feature already demonstrates this pattern with:

- `pages/fleet-page`
- `components/starship-card`
- `models/starship.model`
- `data-access/starships-api.service`

### 3. DTO Mapping Boundary

External API contracts must not leak into templates.

The mapper in `starship.model.ts` transforms transport values such as:

- `starship_class` -> `starshipClass`
- numeric strings -> `number | null`
- URL-derived IDs -> stable local identifiers

This keeps templates clean and makes tests easier.

### 4. Reactive View Model Pattern

Route components should build a single `vm$` whenever the page combines async data, UI input and view state.

Benefits:

- fewer subscriptions in the template
- explicit loading/error states
- easier testing
- clearer separation between component orchestration and rendering

### 5. Presentational Components

`StarshipCardComponent` is intentionally presentational:

- receives `Starship` via input
- computes display-only getters
- does not fetch remote data
- does not manage application-wide state

This enables reuse, isolation and component-level tests.

## Runtime Layers

### REST Layer

`StarshipsApiService` is responsible for reading external data through `HttpClient` and mapping DTOs into internal models.

### State Layer

NgRx is already wired at bootstrap level and should be expanded next for:

- catalog filters
n- selected item
- loading state
- future project state

### UI Layer

Angular Material remains the primary UI kit for the main flow.

PrimeNG and ngx-bootstrap should be demonstrated in an isolated showcase route so that the primary experience remains coherent.

## Planned Domain Pivot

The codebase is being repositioned from a sci-fi fleet registry to **VEGA Ops Bench**, a console for:

- electronics project management
- component cataloging
- power budgeting
- technical assistant flows

The current fleet slice can be treated as the first domain prototype and later replaced or reframed as a component catalog.

## Recommended Next Steps

1. Add a real feature state slice with NgRx
2. Add a route-level detail page using GraphQL for enriched retrieval
3. Introduce a showcase module for PrimeNG and ngx-bootstrap
4. Add project management and power-planning slices
5. Keep Docker, Kubernetes and deployment concerns isolated under `infra/` and `docs/`
