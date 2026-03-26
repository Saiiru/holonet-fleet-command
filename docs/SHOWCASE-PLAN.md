# Showcase Plan – PrimeNG and ngx-bootstrap

## Goal

Demonstrate breadth across enterprise Angular ecosystems without polluting the primary workflow.

## Why Isolate the Showcase?

Angular Material is already the main UI system in the application. PrimeNG and ngx-bootstrap should be demonstrated in a dedicated route so the core UX remains consistent while the repository still proves familiarity with the required libraries.

## Recommended Route

- `/showcase`

## PrimeNG Demonstrations

### Component Catalog Table

Use `p-table` to present an alternative catalog visualization with:

- sortable columns
- filterable fields
- status tags using `p-tag`

### Why this is useful

It demonstrates:

- third-party Angular UI integration
- table-heavy enterprise scenarios
- component API adaptation

## ngx-bootstrap Demonstrations

### Quick View Modal

Use `BsModalService` or modal directives to open a component details panel.

### Tooltip/Popover

Add fast contextual help for voltage, current and compatibility fields.

### Why this is useful

It demonstrates:

- Bootstrap-driven Angular UI integration
- modals and overlays in enterprise apps
- compatibility with older Angular ecosystems often found in corporate codebases

## Delivery Advice

Do not move the main catalog to PrimeNG or ngx-bootstrap. Keep them as isolated demonstrations with a short explanation in the README and coverage matrix.

## Interview Framing

"I intentionally isolated PrimeNG and ngx-bootstrap in a showcase route. That let me demonstrate familiarity with both ecosystems without compromising the cohesion of the main user journey, which remains based on Angular Material."
