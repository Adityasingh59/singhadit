---
title: SafePaste
tagline: An open-source privacy tool that redacts sensitive data from the clipboard before it reaches an AI chat tool, improved through a structured feedback loop with early testers.
summary: On-device privacy layer that detects and redacts six or more categories of sensitive data before they reach AI tools. Fully local, under 500ms. A post-launch feedback loop cut edge-case failures by 30% and added two new data categories.
category: Open Source · AI Governance
year: "2025"
order: 5
skills:
  - Problem validation
  - Success criteria
  - Feedback-driven iteration
featured: false
emoji: "🔒"
visual: v-safepaste
role: Creator & maintainer
timeframe: 2024 to present
tech:
  - Python
  - NLP
  - Regex
  - MIT License
metrics:
  - { value: "30%", label: "fewer edge-case failures after launch" }
  - { value: "<500ms", label: "redaction, fully on-device" }
  - { value: "+2", label: "data categories from user feedback" }
repo: https://github.com/Adityasingh59/SafePaste
---

## The problem

People paste anything into AI chat tools — API keys, customer PII, internal docs — because it's frictionless and the output is useful. The privacy cost is invisible until it isn't. Existing DLP tools are enterprise, server-side, and heavy. Nothing protected the individual at the exact moment of risk: **the paste**.

## How I approached it

I framed this as a product with one ruthless constraint: it has to be **invisible and instant**, or no one will keep it on. That shaped every decision.

- **On-device only.** Sending clipboard contents to a server to "check for sensitive data" would defeat the purpose. Everything runs locally — zero network calls.
- **Latency budget as a spec.** I set a hard target of sub-500ms so redaction never interrupts flow. That budget ruled out heavyweight models and pushed me toward a layered regex + lightweight NLP approach.
- **Precision over recall, tuned.** False positives that mangle harmless text are as bad as misses. I set precision, false-positive and latency targets before writing code, then tuned detectors across PII, API keys and credentials against them.

## What I built

A clipboard-level privacy layer that intercepts paste events, classifies content across six or more sensitive categories, and redacts in place before the data reaches any AI tool — all locally, under half a second.

## Outcome

SafePaste shipped as open source under MIT. The most validating part was what happened after launch: a structured feedback loop with early testers **cut edge-case failures by 30%** and added **two new data categories** that users asked for. That loop is the difference between a script and a product.

## What I learned

Distribution and trust matter as much as detection. For a privacy tool, "100% on-device" isn't a feature bullet — it's the entire value proposition, and saying it clearly mattered more than any benchmark.
