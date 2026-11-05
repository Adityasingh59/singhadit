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

People paste anything into AI chat tools — API keys, customer PII, internal docs — because it's frictionless and the output is useful. The privacy cost is invisible until it isn't. Existing data-loss tools are built for enterprises and are heavy to roll out. Nothing protected the individual at the exact moment of risk: **the paste**.

## How I approached it

I framed this as a product with one ruthless constraint: it has to be **invisible and instant**, or no one will keep it on. That shaped every decision.

- **On-device only.** Sending clipboard contents to a server to "check for sensitive data" would defeat the purpose. Everything runs locally — zero network calls.
- **Speed as a requirement.** I set a hard target of under half a second so redaction never interrupts someone's flow. That target ruled out heavyweight AI models and pointed to lightweight detection instead.
- **Precision over recall, tuned.** False positives that mangle harmless text are as bad as misses. I set accuracy, false-alarm and speed targets before building anything, then tuned detectors across PII, API keys and credentials against them.

## What shipped

A privacy layer that checks text at the moment you paste, recognizes six or more categories of sensitive data, and redacts them before anything reaches an AI tool. It all happens on the user's own device, in under half a second.

## Outcome

SafePaste shipped as open source under MIT. The most validating part was what happened after launch: a structured feedback loop with early testers **cut edge-case failures by 30%** and added **two new data categories** that users asked for. That loop is the difference between a script and a product.

## What I learned

Distribution and trust matter as much as detection. For a privacy tool, "100% on-device" isn't a feature bullet — it's the entire value proposition, and saying it clearly mattered more than any benchmark.
