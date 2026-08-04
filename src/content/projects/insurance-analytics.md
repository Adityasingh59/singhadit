---
title: Insurance Analytics Platform
tagline: Turned scattered insurance operations data into a self-serve dashboard built on an 8-KPI framework.
summary: Defined an 8-KPI operational framework (claims throughput, risk exposure, churn signal) and built a self-serve Power BI dashboard with an NLP sentiment pipeline across 500+ records to surface risk signals in real time.
category: Data Product · Analytics
year: "2024"
order: 5
featured: false
emoji: "📊"
visual: v-insurance
role: Data product owner
timeframe: 2024 – 2025
tech:
  - Power BI
  - DAX
  - SQL
  - TF-IDF
metrics:
  - { value: "40%", label: "fewer ad-hoc requests" }
  - { value: "8", label: "KPIs defined" }
  - { value: "500+", label: "records analyzed" }
---

## The problem

The operations team lived on ad-hoc data pulls. Every question — "how's claims throughput this week?", "where's churn risk concentrated?" — turned into a manual SQL request and a one-off chart. Analysts were a bottleneck, decisions lagged the data, and nobody agreed on what the numbers even meant.

## How I approached it

I treated this as a **data product**, where the real deliverable wasn't a chart — it was a shared definition of truth.

- **KPI framework first.** I worked with stakeholders to define **8 operational KPIs** — claims throughput, risk exposure, churn signal, and more — with explicit formulas. Agreeing on definitions was 80% of the value.
- **Self-serve over bespoke.** Instead of answering questions, I built a Power BI dashboard (DAX measures over a SQL model) that let the team answer their own — killing the request queue.
- **Unstructured signal, too.** I added an NLP sentiment pipeline (TF-IDF) across 500+ free-text records to surface operational risk signals that structured fields missed.

## Outcome

- **40% reduction** in ad-hoc reporting requests — analysts got their time back.
- **8 KPIs** with agreed definitions became the team's shared operating language.
- Real-time risk signals surfaced from text that previously went unread.

## What I learned

The dashboard was the easy part. The durable win was forcing a definition for each metric — once "churn signal" meant one specific thing, every downstream conversation got faster. Data products succeed on alignment before visualization.
