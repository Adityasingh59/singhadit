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

I wanted to answer a harder question than "can I build an app?" — **can I run the full product lifecycle**, from problem framing to a deployable, multi-tenant system that another company could actually adopt?

## How I approached it

I treated NexusIMS like a funded product, not a coding exercise.

- **Discovery & PRD.** I wrote a formal product requirements document defining the target user (operations leads at multi-warehouse SMBs), the jobs-to-be-done, and the non-negotiables: multi-tenancy, auditability, and real-time stock accuracy.
- **System design first.** Before code, I mapped the data model, tenancy isolation strategy, auth flows, and module boundaries. That design doc is what kept ten modules coherent instead of sprawling.
- **Scoped to a real MVP.** I sequenced modules by RICE — auth, warehouses, and stock movements shipped before nice-to-haves like reporting dashboards.

## What I built

- **10 functional modules** spanning authentication, multi-warehouse tracking, bill-of-materials (BOM) processing, barcode generation/scanning APIs, purchase orders, and stock reconciliation.
- **Multi-tenant architecture** with JWT-based auth and per-tenant data isolation, so a single deployment serves multiple organizations safely.
- **FastAPI + PostgreSQL 16** backend with Redis for caching hot lookups, a **React 18** frontend, and **Docker** for reproducible environments.
- **Full CI/CD** so every change is tested and shippable.

## Outcome

NexusIMS is a working, production-grade system — not a demo. It demonstrates the thing I care most about as a PM: the ability to take a vague operational pain point, structure it into a spec, and drive it all the way to something deployable, observable, and maintainable.

## What I'd do next

The roadmap I've scoped includes demand forecasting from movement history, a supplier scorecard, and a mobile scanning client — each prioritized against the same RICE framework that shaped the MVP.
