---
title: Lesson-First Onboarding
tagline: An A/B test I designed for Duolingo's onboarding — built to answer a question the company's own most-cited experiment left open.
summary: A fully specified three-arm experiment on Duolingo's pre-lesson intake flow. Hypothesis, metric tree, power analysis, non-inferiority guardrails, and pre-committed decision rules — designed to be readable whichever way it lands.
category: Experiment Design
year: "2026"
order: 2
skills:
  - Experiment design
  - Metric trees
  - Guardrail metrics
  - Decision rules
kind: experiment
featured: false
emoji: "🧪"
visual: v-duolingo
role: Self-directed case study — problem framing, experiment design, analysis plan
timeframe: August 2026
tech:
  - Experiment design
  - Power analysis
  - Metric tree design
  - Non-inferiority guardrails
  - Python · statsmodels
metrics:
  - { value: "3", label: "arms, fully powered" }
  - { value: "1.7%", label: "detectable effect on D7" }
  - { value: "14 days", label: "to primary readout" }
ogImage: /duolingo/og-image.png
artifacts:
  - { label: "Experiment design doc", href: "/duolingo/experiment-design.html", note: "The full spec — power analysis, guardrails, decision rules, sourced assumptions" }
  - { label: "Variant mockups", href: "/duolingo/variant-mockups.html", note: "Control vs. treatment screens across all three arms" }
  - { label: "Readout deck", href: "/duolingo/experiment-deck.pptx", note: "12 slides, stakeholder-facing (PPTX)" }
  - { label: "Summary carousel", href: "/duolingo/carousel.pdf", note: "The argument in brief (PDF)" }
---

## The observation

Duolingo ran an experiment years ago that every product person has since quoted. They moved the sign-up screen from *before* the first lesson to *after* it. The result was roughly **+20% DAU**.

The principle underneath it is simple: deliver value before you ask for commitment.

I opened the app and counted the screens standing between install and the first lesson. Six. How did you hear about us, which language, what's your level, why are you learning, what's your daily goal, can we send you notifications.

The principle got applied to the account wall and stopped there. That asymmetry is the entire premise of this project:

> If value-before-commitment was worth 20% DAU on the account wall, what is it worth on the six screens still standing in front of it?

## Why the answer isn't obvious

The reflexive move is to cut the questionnaire. I don't think that's obvious at all, and the reason is what made this worth designing properly.

Those screens aren't pure friction. Each one produces an asset that compounds:

- **The notification opt-in** feeds the re-engagement channel Duolingo has publicly measured at **+5% DAU**.
- **The stated motivation** powers the personalized coaching copy that moved **D14 by 7.2%** in one of their own tests.
- **The daily goal** is a commitment device — you can't fall short of a pace you never set.

So stripping the intake might buy activation and pay for it in retention infrastructure. A capable team can argue that both directions with equal conviction. That is precisely the condition under which you stop running design reviews and start running experiments.

## How I designed it

**Three arms, equal allocation, new installs only.**

- **Control** — the current flow. Six intake screens, then the first lesson.
- **T1 · Lesson-First** — only the two questions required to render a lesson (language, level) stay in front. Motivation, daily goal and notifications move behind the first lesson and are reframed against progress the user has actually earned. The reminder prompt now protects a streak that exists rather than a hypothetical one.
- **T2 · Compressed** — the same six questions, in the same position, consolidated onto three screens.

**T2 is the arm most people would cut to save sample. It's the one I'd fight hardest for.** Without it, a T1 win is uninterpretable — you cannot separate *sequence* from *screen count*. If T1 wins and T2 stays flat, the driver is sequence, and the finding generalizes to every remaining pre-value ask in the product. If both win equally, the driver is friction, and T2 ships for a fraction of the engineering cost. One of those answers is a principle. The other is a UI change.

## The decisions I'd defend in a review

**The primary metric is D7 retention — deliberately not first-lesson completion.** First-lesson completion rises in T1 *by construction*: you removed four screens standing in front of it. It would report a clean win for an experiment that did nothing. It stays in the design as a leading indicator with no ship authority.

**The guardrail that actually decides this is notification opt-in.** T1 moves a proven +5% DAU lever into an untested context. Every guardrail runs as a one-sided non-inferiority test against a −1.0% relative margin, and a breach on that one triggers a hold rather than a ship — even if the primary metric is positive.

**The experiment is sized to a one-week enrollment window.** At an assumed 22% D7 baseline, α corrected to 0.025 for two treatment-vs-control comparisons and 80% power, 7 days of enrollment yields **233,333 users per arm** — a detectable effect of 0.375pp, or **1.70% relative**, comfortably inside the 2–4% band where Duolingo's published onboarding results have landed. Primary readout lands on day 14; the D14 confirmatory read on day 21.

**Decision rules were written before launch, not after.** Ship, hold, ship-T2, don't-ship and kill each have a pre-committed trigger, so the readout is a lookup rather than a negotiation. That includes an explicit policy that a positive subscription-trial result does not override a negative engagement result.

**The failure mode I designed around is identity stitching.** Assignment happens on an anonymous install ID, before an account exists. When the user later signs up, the bucket assignment has to survive the anonymous-to-authenticated merge. If it doesn't, every post-signup metric becomes unattributable and the experiment is silently unreadable — so that's a pre-launch QA gate with daily sample-ratio monitoring behind it, not a nice-to-have.

## What this is, and what it isn't

There is no real data behind this. I don't work at Duolingo and their funnel numbers aren't public, so every baseline — D7 retention, opt-in rates, install mix — is modelled and flagged as an assumption in the appendix. Every public figure is sourced: earnings filings for DAU and revenue, published growth write-ups for the prior experiment results, install estimates for traffic.

What it *is* is the artifact I'd actually put in front of a growth review: a falsifiable hypothesis, a metric tree that resists gaming, guardrails sized to the risk they're guarding, and decision rules committed in advance.

The value of an experiment isn't the win. It's that there's no version of this one where the team walks away without a decision — including the version where the result is negative and we learn that pre-lesson personalization is load-bearing.

## What I'd run next

Regardless of outcome, the follow-on I'd sequence first is personalizing *which* intake questions appear based on acquisition source. A paid-social install and an organic-search install arrive with very different amounts of context and intent, and asking both cohorts the identical six questions is almost certainly leaving something on the table.
