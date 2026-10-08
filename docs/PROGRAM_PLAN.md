# Program Plan — India Education OS

Source brief: `India_National_Education_OS_Claude_Master_Prompt.md` (63 sections, deliverables A–N, 17 required tables).
The brief requires these gates to run **in order**. No platform code until Gate 3 passes (§0 "Product integrity").

## Gates

| Gate | Scope (prompt §) | Output | Status |
|---|---|---|---|
| **1. Research** | §2–3, 5–6, 14–15, 30, 59 | Atlas (B), Curriculum & Assessment matrix (C), Gap analysis (D), Compliance matrix, Competitor matrix | **In progress**: [00-current-date-check](research/00-current-date-check.md) done |
| **2. Strategy** | §16–17, 22–29, 38–45, 55, 60 | Wedge choice, Exec verdict (A), Business plan (H), Roadmaps (I, J), Investor story (L), Sales kit (M) | Not started |
| **3. Architecture** | §4, 7–9, 12–13, 18–21, 31–37, 49–54 | Product blueprint (E), Tech architecture + ERD (F), Trust blueprint (G), Launch spec (N) | Not started |
| **4. Build** | §48 | Repo foundation: tenancy, RBAC, curriculum versioning, blueprint validator, tests | Not started |
| 5. Execution | §47 | 30-day founder plan (K) | Not started |

## Founder decisions (2026-10-08)

| # | Decision |
|---|---|
| FD1 | The company is **held in India**. Singapore PDPA and FEMA cross-border structuring are out of scope. |
| FD2 | V1 = **CBSE Classes 6–10, Mathematics + Science** (confirms D3). |
| FD3 | **Reuse the PSLE-Platform design and patterns** (design tokens, BKT mastery, difficulty tiers, paper template, generation and QA pipeline). |
| FD4 | Add a **Tutor Videos + Clarification Sessions** module for every class, subject and topic. Design: `product/02-tutor-videos-and-clarification-sessions.md`. |
| FD5 | Build the app structure now, in parallel with research. This overrides the brief's research-first gate for the skeleton only. Production content and real student data still wait for the content and privacy gates. |

Live status: see [PROGRESS_TRACKER.md](PROGRESS_TRACKER.md). Plan: see [ROADMAP.md](ROADMAP.md).

## Working decisions (made under §0 "safest sensible assumption"; overturn if wrong)

| # | Decision | Why |
|---|---|---|
| D1 | This venture lives in its own folder/repo, `India-Education-OS/`, separate from PSLE-Platform. | Repo-separation policy; different market, board and legal regime. |
| D2 | Research docs are Markdown under `docs/` (matching §48's structure). The Executive Verdict and investor narrative get published as shareable pages once finished. | Diff-able, versioned, and works as build input. |
| D3 | Working hypothesis: **V1 board = CBSE**, wedge = school-paid daily practice + assessment for Classes 6–10 (Maths and Science first). To be confirmed or rejected in Gate 2 scoring. | Largest private-school footprint among central boards; CBSE changes for 2026-27 create demand for versioned content; PARAKH shows the learning drop is steepest in Classes 3–9. |
| D4 | V1 is B2B through schools. No direct-to-parent tier before the May 2027 DPDP deadline. | Fourth Schedule exemption may cover school-engaged processors (LAWYER REVIEW REQUIRED). B2C needs verifiable parental consent for every child. |
| D5 | No APAAR/UDISE+ integration in V1. | SC order of 20 Jul 2026 restricts sharing with private entities; no authorised API verified. |

## Challenge to the brief (§0: "challenge my assumptions")

**There is an existing asset the brief does not mention.** `PSLE-Platform` (Singapore, live on Vercel and Supabase) already contains about 70% of the V1 engine the brief describes:
a skill taxonomy, a 9,000+ item question bank with difficulty tiers 1–10, solver-verified QA, a standard paper template and generator (marks, duration, sections), daily practice, review history, a mastery/XP ledger, and a child-facing UI.
**Recommendation:** in Gate 3, extract the board-agnostic parts into shared packages instead of rebuilding them. Keep the codebases separate (D1) but reuse the patterns and the schema design. This could cut months off the brief's Month 3–5 roadmap. (RECOMMENDATION, to evaluate in Gate 3)

**The brief is not executable in a single pass.** A trustworthy all-36-state/UT atlas alone needs about 40 primary-source fetches. The plan runs one gate per working session. Each session ends with sourced docs and a status update in this file.

## Next session: Gate 1, continued

1. Replace Tier-4/5 sources with Tier-1 originals (DPDP gazette, CBSE circulars, PARAKH PDF, UDISE+ management-wise tables).
2. Central boards deep dive: CBSE, CISCE (ICSE/ISC), NIOS (§3.2).
3. State/UT registry, all 36 rows (§3.3).
4. Competitor matrix (§15).
5. Compliance matrix v1 (§30).
