# Experiment Design: Lesson-First Onboarding

**Test ID:** ONB-2026-14 · **Owner:** Aditya · **Status:** Proposed · **Date:** August 2026

> ⚠️ **Portfolio case study.** Public figures are cited and sourced. Baseline rates, guardrail thresholds, and results are modelled assumptions — Duolingo does not publish funnel-level data. Assumptions are flagged inline and listed in Appendix A.

---

## 1. Why this test

Duolingo's single largest measured onboarding win was **moving the sign-up wall behind the first lesson — roughly +20% DAU**. The principle it proved: *deliver value before you ask for commitment.*

That principle was applied to the account wall. **It was never applied to the questionnaire.**

Today a new install still answers a full intake sequence — how did you hear about us, which language, current level, why are you learning, daily time goal, notification permission — **before completing a single exercise.** Teardowns of the current flow count roughly 15 pre-lesson screens (up to 38 including the extended onboarding sequence).

So the flow contains an unresolved contradiction:

| | Sign-up wall | Intake questionnaire |
|---|---|---|
| Asks for commitment | ✅ | ✅ |
| Positioned after first value | ✅ (tested, +20% DAU) | ❌ (never tested) |

**The opportunity:** the largest remaining block of pre-value friction in the funnel is the one piece of it that has never been subjected to the company's own most successful design principle.

**The reason it isn't obvious:** the intake screens are not pure friction. They produce three assets that compound — a stated daily goal (commitment device), a notification opt-in (Duolingo's own tests put optimized notification copy at **+5% DAU**), and a stated motivation that feeds personalized coaching copy (**+7.2% D14** in their growth-mindset copy test). Stripping them out could buy activation and pay for it in retention infrastructure.

That trade-off is real and un-guessable. It is exactly what an experiment is for.

---

## 2. Hypothesis

> **If** we move motivation, daily-goal, and notification-permission screens from *before* the first lesson to *immediately after* it, **then** Day-7 retention among new installs will increase, **because** each pre-value screen imposes drop-off on users who have not yet experienced the product, while the same questions asked at the moment of completed progress benefit from the endowed-progress effect — the user answers with something invested rather than nothing.

**Falsifiable counter-hypothesis:** deferred goal-setting and notification prompts convert at a materially lower rate, and the loss of those two retention levers outweighs the activation gain by D14. This is the outcome the guardrails are designed to catch.

---

## 3. Variants

Randomization is 3-way, equal allocation, on **new installs only**.

### Control — current flow
```
Source → Language → Level/Placement → Motivation → Daily goal → Notifications → LESSON 1 → Soft sign-up wall
```
6 intake screens before first value.

### T1 — "Lesson-First" (the treatment under test)
```
Language → Level/Placement → LESSON 1 → "Personalize your plan" (Motivation → Daily goal → Notifications) → Soft sign-up wall
```
2 intake screens before first value. The deferred screens are reframed at the point of delivery — the daily-goal screen opens on the user's just-earned first XP, and the notification prompt is anchored to protecting a streak that now exists rather than one that is hypothetical.

### T2 — "Compressed" (the mechanism control)
```
Source+Language → Level/Placement → Motivation+Daily goal+Notifications → LESSON 1 → Soft sign-up wall
```
Same content, same position as Control, consolidated from 6 screens to 3 via multi-select and combined layouts.

**Why T2 exists.** Without it, a T1 win is uninterpretable — it could be caused by *sequence* (value before commitment) or simply by *fewer taps*. T2 holds sequence constant and varies only screen count:

- T1 wins, T2 flat → the mechanism is **sequence**. Ship T1; the insight generalizes to every other pre-value ask in the product.
- T1 ≈ T2, both win → the mechanism is **screen count**. Ship T2 — same lift, far cheaper, no re-plumbing of the personalization pipeline.
- Both flat → intake friction is not the constraint. Redirect to the web→app handoff.

This arm is the difference between shipping a screen and learning a principle.

---

## 4. Metrics

### Primary
**D7 retention** — % of new installs that complete ≥1 lesson on any day within days 5–7 post-install.

*Why not lesson-1 completion?* T1 mechanically raises it by removing screens in front of it — it would go up even if the change were worthless. It is a leading indicator, not a decision metric. *Why not D14?* D14 is the better proxy for durable habit, but doubles readout time; it runs as the confirmatory secondary before full rollout.

### Leading indicators (read at 48h, directional only, no ship authority)
- Onboarding completion rate (% reaching lesson 1)
- Lesson-1 completion rate
- Time-to-first-lesson (median, p90)
- D1 retention

### Secondary
- **D14 retention** — confirmatory; must not regress
- 3-day streak attainment rate
- Lessons completed in week 1 (mean, capped at p99)
- Week-1 Super trial starts

### Guardrails (non-inferiority, margin **−1.0% relative**)
| Guardrail | Why it's here |
|---|---|
| Account creation rate within 7d | Deferring intake shifts sign-up wall timing; protects the funnel's most valuable conversion |
| **Notification opt-in rate** | **Highest-risk metric.** Notifications are a proven +5% DAU lever; T1 moves the prompt to a new context |
| Daily-goal set rate within 7d | Goal-setting is a commitment device; a large drop undermines the long-run retention story |
| Placement-test → course-switch rate within 7d | Detects mis-levelled users routed into the wrong course |
| Onboarding-stage crash / error rate | Standard release guardrail |

**Explicit policy:** consistent with the company's stated principle — *a change that increases subscription revenue but decreases daily engagement does not ship* — a positive Super-trial result will not override a negative D7 result.

---

## 5. Design

| Parameter | Value |
|---|---|
| Unit of randomization | Anonymous install/device ID, assigned at first app open |
| Allocation | 33.3 / 33.3 / 33.3 |
| Population | New installs, iOS + Android, English UI, US/UK/CA/AU |
| Exclusions | Reinstalls (prior install ID on device), users entering via a shared-link deep flow, existing accounts logging in |
| Enrollment window | 7 days (full weekly cycle — weekday and weekend intent differ) |
| Observation window | +7 days for primary, +14 for confirmatory secondary |

**Identity stitching — the failure mode to design around.** Assignment happens pre-account, on an anonymous ID. When the user later creates an account, the anonymous ID must be merged into the authenticated user ID *with the bucket assignment carried across.* If that merge drops the assignment, every post-sign-up metric silently becomes unattributable and the experiment is unreadable. This is a pre-launch QA gate, not a nice-to-have.

**Seasonality.** January is the peak install month and draws a measurably different intent mix (resolution-driven, higher initial motivation, steeper drop-off). Do not run in the first three weeks of January or the last week of December.

**Novelty/primacy effects: not applicable.** The population is new installs with no prior exposure to the control flow, so there is no baseline experience to be disrupted or delighted by change. This is a genuine advantage of testing onboarding over testing in-product features.

---

## 6. Power analysis

Assumptions: baseline D7 retention **22%** (Appendix A), α = 0.05 two-sided, Bonferroni-corrected to **α = 0.025** for two treatment-vs-control comparisons, power = 80%.

**Sample required, by minimum detectable effect:**

| MDE (relative) | MDE (absolute) | n per arm |
|---|---|---|
| 1.0% | 0.22pp | 676,404 |
| 1.5% | 0.33pp | 301,157 |
| **2.0%** | **0.44pp** | **169,700** |
| 3.0% | 0.66pp | 75,686 |
| 4.0% | 0.88pp | 42,721 |

**Available traffic.** Duolingo runs roughly **400,000 installs/day** globally in 2026. The scoped population (English UI, four markets) is assumed at ~25% → **~100,000/day**, or ~33,300 per arm per day.

**A 7-day enrollment window yields 233,333 per arm**, which delivers:

| Metric | Baseline | Achieved MDE @ 80% power |
|---|---|---|
| **D7 retention (primary)** | 22.0% | **0.375pp / 1.70% rel** |
| D14 retention | 14.5% | 0.319pp / 2.20% rel |
| Lesson-1 completion | 60.0% | 0.442pp / 0.74% rel |
| Account creation w/in 7d | 45.0% | 0.449pp / 1.00% rel |
| Notification opt-in | 62.0% | 0.438pp / 0.71% rel |
| Daily-goal set w/in 7d | 55.0% | 0.449pp / 0.82% rel |

**Timeline:** 7 days enrollment → 7 days maturation → **primary readout day 14** → D14 confirmatory readout day 21.

Sensitivity is comfortably inside the range where Duolingo's own onboarding tests have landed (+2–4% on retention metrics), and each guardrail is powered to its −1.0% non-inferiority margin.

---

## 7. Analysis plan

1. **SRM check first.** χ² on observed vs expected allocation. p < 0.001 → halt and debug before reading anything else. A sample-ratio mismatch in a pre-account experiment usually means the identity stitch is broken.
2. **Primary:** two-proportion z-test, T1 vs C and T2 vs C, Bonferroni α = 0.025. Report absolute lift, relative lift, and 95% CI — the CI, not the p-value, is what goes in the ship recommendation.
3. **No peeking for decisions.** Leading indicators are monitored at 48h for *breakage only* (crash rate, SRM, catastrophic funnel collapse). The primary is read once, at day 14. If continuous monitoring is required by the release process, use an always-valid sequential boundary (mSPRT) rather than repeated fixed-horizon tests.
4. **Guardrails:** one-sided non-inferiority test against the −1.0% relative margin.
5. **Pre-registered segments only** — platform (iOS/Android), acquisition source (organic/paid), self-reported level (beginner/experienced), market. Any effect found outside this list is a hypothesis for the next test, not a result from this one.
6. **Heterogeneity call-out:** the beginner segment is the one to watch. Experienced learners routed to the placement test may value pre-lesson personalization more than absolute beginners do, and a null average could be masking opposing effects.

---

## 8. Decision rules

Pre-committed before launch.

| Outcome | Action |
|---|---|
| D7 lift ≥ +1.7% rel, p < 0.025, all guardrails pass | **Ship** the winning arm. Ramp 10% → 50% → 100% over 2 weeks with holdback. |
| D7 positive **but** notification opt-in breaches −1.0% | **Hold.** Extend to D14/D28 readout. If the deficit compounds, iterate on the deferred prompt's framing and re-test rather than ship. |
| T1 and T2 statistically indistinguishable, both positive | **Ship T2.** Same outcome, materially lower engineering cost and no personalization re-plumbing. |
| D7 flat (CI contains zero, upper bound < +1.7%) | **Do not ship.** Intake friction is not the binding constraint. Redirect the next cycle to the web→app handoff. |
| D7 negative | **Kill.** Document that pre-lesson personalization is load-bearing — a genuinely valuable negative result. |
| Super-trial starts up, D7 down | **Do not ship,** per the engagement-over-revenue principle. |

**Holdback:** retain a 1% permanent holdback on the control flow for 90 days to measure whether the effect decays.

---

## 9. Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Identity stitch drops bucket assignment at sign-up | Med | Pre-launch QA gate; SRM monitored daily |
| Notification opt-in falls sharply in T1 | Med | Explicit guardrail; framing anchored to the streak the user just earned |
| Post-lesson personalization screens feel like an interruption at the moment of success | Med | Screens presented as reward framing ("nice work — let's set your pace"), skippable, re-prompted at lesson 3 |
| Users mis-levelled without the pre-lesson motivation context | Low | Course-switch rate guardrail |
| Interaction with concurrently running onboarding tests | Med | Mutually exclusive experiment layer for the onboarding surface |
| Activation gain is real but attracts lower-intent users who churn by D30 | Med | 90-day holdback; D28 read before declaring the win durable |

---

## 10. What this unlocks next

- **If sequence is the mechanism (T1 wins, T2 flat):** the principle generalizes. Audit every remaining pre-value ask in the product against it.
- **If screen count is the mechanism (T1 ≈ T2):** the lever is friction, not psychology. The next test is progressive disclosure across the whole funnel.
- **Follow-on regardless of outcome:** personalize *which* intake questions appear based on acquisition source — paid-social installs and organic search installs arrive with different amounts of context, and asking both cohorts the same six questions is almost certainly leaving something on the table.

---

## Appendix A — Assumptions and sources

**Sourced (public):**

| Fact | Value | Source |
|---|---|---|
| DAU, Q1 2026 | 56.5M (+21% YoY) | Duolingo Q1 2026 earnings |
| MAU, Q1 2026 | 137.8M | Duolingo Q1 2026 earnings |
| Paid subscribers | 12.5M (+21% YoY) | Duolingo Q1 2026 earnings |
| Revenue, Q1 2026 | $292.0M (+27% YoY) | Duolingo Q1 2026 10-Q |
| Global daily installs, 2026 | ~400,000 | Business of Apps |
| Delayed sign-up test result | ~+20% DAU | First Round Review / Taplytics |
| Notification copy optimization | +5% DAU | Econsultancy |
| Growth-mindset coach copy | +7.2% D14 | Econsultancy |
| Weekend Amulet | +2.1% D7, +4% D14 | Econsultancy |
| Experiment velocity | 300+/quarter, 20–80 concurrent | Relaunch teardown |
| Pre-lesson intake screen count | ~15 (38 incl. extended sequence) | Tasu.ai / Mobbin flow captures |
| Mobile app D7 retention, all categories | 11–13% | Business of Apps |

**Modelled (not public — stated for the power analysis):**

| Assumption | Value | Basis |
|---|---|---|
| Baseline D7 retention, new installs | 22% | Set above the 11–13% all-app benchmark; Duolingo is a best-in-class retention outlier |
| Baseline D14 retention | 14.5% | ~2/3 of D7, typical decay shape |
| Lesson-1 completion | 60% | Assumption |
| Account creation within 7d | 45% | Assumption |
| Notification opt-in | 62% | Assumption |
| Daily-goal set within 7d | 55% | Assumption |
| English-UI share of the 4 target markets | 25% of global installs | Assumption |

Every figure in §6 is reproducible from these inputs with a two-proportion power calculation at α = 0.025, power = 0.80.
