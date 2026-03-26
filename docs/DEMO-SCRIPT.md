# Demo Script – VEGA Ops Bench

## 60-Second Version

VEGA Ops Bench is an Angular enterprise-style console for project and component management. The current MVP demonstrates a searchable registry built on top of an external API, with DTO-to-model mapping, RxJS-based filtering, Angular Material UI and CI automation. The next evolution is a pivot from sci-fi fleet assets into electronics project planning, power budgeting and a VEGA technical assistant.

## Full Demo Walkthrough

### 1. Product Framing

"This project started as a structured registry interface and is being repositioned into VEGA Ops Bench, a practical console for electronics project management, component cataloging and technical guidance."

### 2. Main Screen

- Open the catalog route
- Explain the shell layout and route-driven structure
- Show search/filter interaction
- Point to operational cards as presentational components

### 3. Architecture

Explain:

- standalone Angular bootstrap
- feature-slice organization
- data-access service for REST
- mapper boundary between DTO and domain model
- `vm$` pattern in the page container

### 4. Testing Story

Explain:

- unit tests for mapping logic
- HTTP service tests with `HttpTestingController`
- component tests for rendering
- Playwright smoke flow for the user journey

### 5. CI/CD Story

Explain:

- GitHub Actions validates unit tests and build
- dedicated E2E workflow runs Playwright
- container artifacts can be built from the Dockerfile

### 6. Delivery Story

Explain:

- Docker multi-stage build
- Nginx static serving
- Kubernetes manifests under `infra/k8s`
- cloud deployment documented for static and container paths

## Interview Soundbites

### Why map DTOs?

"I do not let external API contracts leak into templates. I map transport structures into internal models so the UI stays stable even if the external payload changes."

### Why RxJS here?

"RxJS is useful where UI events and async data need to be composed into a single view model. It keeps loading, error and filter behavior explicit."

### Why not use every UI library in the main flow?

"I keep the primary UX coherent with one main design system and isolate secondary libraries into a showcase path so I can demonstrate breadth without sacrificing maintainability."

### Why REST plus GraphQL?

"The registry uses REST because it is cheap and simple for list retrieval. GraphQL is reserved for enriched detail views where aggregation and payload control matter more."
