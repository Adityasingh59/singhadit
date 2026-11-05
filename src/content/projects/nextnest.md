---
title: NextNest
tagline: A trusted way for students to hand off a mid-term lease, shaped by 200+ user interviews across three university markets before any code was written.
summary: Student housing marketplace for mid-term lease transfers. Validated demand through 200+ interviews at NYU, the University of Michigan and UC San Diego, prioritized the roadmap with RICE, and shipped .edu verification, e-signature lease assignment and escrow-backed furniture bundles while deliberately deferring the landlord portal and virtual tours.
category: Marketplace · Founder project
year: "2025"
order: 1
featured: true
role: Founder and product lead
timeframe: 2025 to present
skills:
  - Customer discovery
  - RICE prioritization
  - Marketplace trust design
  - Funnel analytics
tech:
  - Next.js
  - PostgreSQL
  - Claude API
  - Vercel
  - Neon
  - Stripe
  - DocuSign
metrics:
  - { value: "200+", label: "user interviews before development" }
  - { value: "3", label: "university markets validated" }
  - { value: "2", label: "features deliberately deferred" }
repo: https://github.com/Adityasingh59/NextNest
---

## The problem

Students leave leases early all the time: a summer internship in another city, a semester abroad, an early graduation. Someone else usually needs exactly that room for exactly that window. The two rarely find each other safely.

Today the handoff happens in group chats and listing boards. Nobody's identity is checked, the landlord finds out last, and the furniture deal runs on trust. The person leaving risks staying liable for rent. The person arriving risks a scam.

## Discovery

Before writing a line of code I ran **200+ primary user interviews across three markets: NYU, the University of Michigan and UC San Diego.** I chose three campuses with very different housing markets on purpose, so I could separate a New York quirk from a real pattern.

The pattern held everywhere: students wanted a **trusted, mid-term lease transfer path**. Price and inventory came up less than I expected. Trust came up constantly: is this person really a student, will the landlord approve it, and will I get my money for the furniture.

## Decisions

I scored every candidate feature with RICE and let the interview signal set the Impact and Confidence scores.

- **Shipped first: .edu verification.** Trust was the top theme, and verification is the cheapest way to deliver it. International students who arrive before they have a .edu address get a manual fallback (passport plus proof of enrollment), so the trust layer doesn't exclude them.
- **Shipped: e-signature lease assignment.** A handoff isn't finished until the paperwork is. The outgoing tenant signs first, then the incoming tenant countersigns, so the order of liability is never ambiguous.
- **Shipped: escrow-backed furniture bundles.** Furniture was the second-most-mentioned source of anxiety. Holding payment until after move-in removes the "I paid and the desk never showed up" failure.
- **Deferred: the landlord portal and virtual tours.** Both sound essential in a pitch. In interviews they drew low signal against a high build cost, so I cut them from the first phase and wrote down why.

## What's built

Beyond the core flow, NextNest has a **deterministic fit-score model** that ranks seekers against a listing, and a **trust and scam-detection layer** that uses the Claude API, with a rules-based fallback for when the model is unavailable. I validated the whole funnel end to end with a bot harness that generates live traffic, so funnel analytics could be checked before real users arrive.

## How I'll measure it

The north-star metric is **completed lease transfers**, meaning both signatures collected. Listings and sign-ups are easy to inflate and don't prove the product works. Guardrails are the escrow dispute rate and the time a manual verification takes to clear, because both directly erode the trust the product is selling.

## What I learned

The most useful output of discovery was the list of things I didn't build. Deferring the landlord portal was the hardest call, because it's the feature everyone assumes a housing product needs. Having interview evidence and a RICE score behind the cut made it a decision instead of an argument.
