---
title: NexusIMS
tagline: A multi-tenant inventory product for multi-warehouse SMBs, taken from PRD to a deployable MVP to practise the full product lifecycle.
summary: Multi-tenant inventory product scoped from a formal PRD for operations leads at multi-warehouse SMBs. Ten modules sequenced by RICE, with auth, warehouses and stock movements shipped before reporting.
category: B2B SaaS · Side build
year: "2025"
order: 6
featured: false
skills:
  - PRD and system design
  - MVP scoping
  - RICE sequencing
emoji: "🏭"
visual: v-nexus
role: Product owner & system architect
timeframe: 2025 – Present
tech:
  - Python 3.12
  - FastAPI
  - PostgreSQL 16
  - React 18
  - Redis
  - Docker
metrics:
  - { value: "10", label: "modules scoped in one PRD" }
  - { value: "3", label: "core modules sequenced first" }
  - { value: "1", label: "deployment serving many tenants" }
repo: https://github.com/Adityasingh59
---

## The problem

Most inventory tools force a choice: spreadsheets that don't scale, or enterprise suites that are too heavy and too expensive for growing operations. Teams running multiple warehouses end up stitching together exports, manual counts, and tribal knowledge — and the gaps show up as stockouts, dead capital, and reconciliation headaches.

I wanted to answer a harder question than "can I ship features?": **can I run the full product lifecycle**, from problem framing to a deployable, multi-tenant system that another company could actually adopt?

## How I approached it

I treated NexusIMS like a funded product, not a coding exercise.

- **Discovery & PRD.** I wrote a formal product requirements document defining the target user (operations leads at multi-warehouse SMBs), the jobs-to-be-done, and the non-negotiables: multi-tenancy, auditability, and real-time stock accuracy.
- **Scope before build.** Before any build work, I defined how each customer's data stays separate, who can see and change what, and where each module starts and ends. That scope document is what kept ten modules coherent instead of sprawling.
- **Scoped to a real MVP.** I sequenced modules by RICE — auth, warehouses, and stock movements shipped before nice-to-haves like reporting dashboards.

## What shipped

- **Ten modules** covering sign-in and permissions, multi-warehouse stock tracking, bills of materials, barcode scanning, purchase orders and stock reconciliation.
- **One product serving many companies,** with each company's data kept fully separate, so it could be offered as SaaS rather than installed customer by customer.
- **Auditability built in,** so operations leads can see who moved what stock and when.

## Outcome

NexusIMS is a working product, not a demo. It shows what I care about most as a PM: taking a vague operational pain point, structuring it into a clear spec and an MVP, and driving it all the way to something a team could actually adopt.

## What I'd do next

The roadmap I've scoped includes demand forecasting from movement history, a supplier scorecard, and a mobile scanning client — each prioritized against the same RICE framework that shaped the MVP.
