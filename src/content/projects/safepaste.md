---
title: SafePaste
tagline: A privacy firewall for AI tools — it redacts sensitive data from your clipboard before it ever reaches ChatGPT, Claude, or Gemini.
summary: On-device privacy layer that detects and redacts 15+ sensitive data types from the clipboard before they reach AI tools. 100% local, sub-500ms latency, 95%+ detection accuracy. v1.1 shipped on community feedback.
category: Open Source · AI Governance
year: "2025"
order: 2
featured: false
emoji: "🔒"
visual: v-safepaste
role: Creator & maintainer
timeframe: "2025"
tech:
  - Python
  - NLP
  - Regex
  - MIT License
metrics:
  - { value: "<500ms", label: "redaction latency" }
  - { value: "95%+", label: "detection accuracy" }
  - { value: "15+", label: "data types caught" }
repo: https://github.com/Adityasingh59/SafePaste
---

## The problem

People paste anything into AI chat tools — API keys, customer PII, internal docs — because it's frictionless and the output is useful. The privacy cost is invisible until it isn't. Existing DLP tools are enterprise, server-side, and heavy. Nothing protected the individual at the exact moment of risk: **the paste**.

## How I approached it

I framed this as a product with one ruthless constraint: it has to be **invisible and instant**, or no one will keep it on. That shaped every decision.

- **On-device only.** Sending clipboard contents to a server to "check for sensitive data" would defeat the purpose. Everything runs locally — zero network calls.
- **Latency budget as a spec.** I set a hard target of sub-500ms so redaction never interrupts flow. That budget ruled out heavyweight models and pushed me toward a layered regex + lightweight NLP approach.
- **Precision over recall, tuned.** False positives that mangle harmless text are as bad as misses. I tuned detectors across 15+ data types (keys, tokens, emails, card numbers, national IDs, and more) to hit 95%+ accuracy.

## What I built

A clipboard-level privacy layer that intercepts paste events, classifies content across 15+ sensitive categories, and redacts in place before the data reaches any AI tool — all locally, under half a second.

## Outcome

SafePaste shipped as open source under MIT. The most validating part: **v1.1 was driven by community feedback** — real users filed issues and requested data types, and I prioritized and shipped against them. That feedback loop is the difference between a script and a product.

## What I learned

Distribution and trust matter as much as detection. For a privacy tool, "100% on-device" isn't a feature bullet — it's the entire value proposition, and saying it clearly mattered more than any benchmark.
