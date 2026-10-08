# Master Plan & Roadmap — India Education OS

**Version:** v1 · 2026-10-08 · Owner: Founder · Maintained by: Claude
**Confirmed scope (founder, 2026-10-08):** company held **in India** · V1 = **CBSE Classes 6–10, Mathematics + Science** · reuse PSLE-Platform design patterns · add **Tutor Videos + Clarification Sessions**.

Labels: **[F]** fact · **[A]** assumption · **[R]** recommendation · **[H]** hypothesis to test.

---

## 1. Strategy in one page

| Item | Decision |
|---|---|
| Problem | Learning gaps compound from Class 3 to Class 9 (PARAKH 2024 [F]). Teachers lack time to diagnose and remediate. Each year CBSE changes structures (two board exams, Standard/Advanced, best-2-of-3 periodic tests), creating compliance and planning work for schools [F]. |
| Wedge | **"Daily Learning + Assessment OS" for CBSE private schools, Classes 6–10, Maths and Science.** Diagnostic → daily practice → periodic tests (CBSE IA-compliant) → remediation → teacher, parent and school reports. Tutor videos and doubt/clarification sessions close the "stuck after class" gap. [R] |
| First customer | Mid-fee CBSE private schools (≈ ₹30k–1.5L annual fee band, 500–2,000 students) where the academic coordinator owns assessment. [H — validate in interviews] |
| Buyer path | Teacher champion → Academic coordinator → Principal → Owner/Trust → annual contract [H, master prompt §26] |
| Why us | (1) A working assessment/mastery engine already exists (PSLE) [F]. (2) **CBSE-IA-native**: the only product that runs periodic tests, best-2-of-3, portfolio and practicals as compliance evidence [H — competitor check pending]. (3) Trust-first: DPDP-ready before 13 May 2027 [R]. |
| Not V1 | ERP, fees, transport, payroll, B2C app, APAAR/UDISE+ sync, other boards, Classes 11–12, live video infrastructure (embed only) |
| Legal | Indian Pvt Ltd; DPIIT Startup India recognition; school = data fiduciary, platform = processor under a DPA. **LAWYER REVIEW REQUIRED** on the Fourth Schedule exemption. |

## 2. Phase plan (the gated program)

| Phase | Window | Goal | Exit criteria |
|---|---|---|---|
| **P0 Research & Validation** | Oct–Nov 2026 | Evidence base, interviews, wedge confirmed | 20 school interviews; 3 schools agree to a pilot (LOI); compliance matrix v1; competitor matrix |
| **P1 Foundation build** | Oct 2026 – Jan 2027 | Production-grade core: tenancy, RBAC, curriculum graph, question bank, practice, tests, scoring, videos, doubts | Security and privacy gates pass; ≥1 video + 30 questions per V1 topic for the pilot chapters; teacher can run a PT end-to-end |
| **P2 Paid pilots** | Feb – Apr 2027 (pilot), Apr – Jun 2027 (term-1 cohort) | 3–5 schools, 90-day controlled pilot (baseline → intervention → post-test) | Pre/post learning gain measured; teacher time saved logged; ≥60% weekly-active students [H]; 2 schools convert to paid |
| **P3 DPDP compliance cut-over** | by **13 May 2027** [F] | Notice, consent, rights, breach and erasure flows live | Privacy gate signed by counsel |
| **P4 PMF** | Jul 2027 – Mar 2028 | 25–50 schools, one state cluster | Renewal intent ≥80%, NRR >100% [H] |
| **P5 Expansion** | 2028+ | More grades/subjects, a second board (CISCE or one state board), school groups | Board-expansion engine proven (new board in <1 quarter) |

## 3. 12-month product roadmap (month by month)

| Month | Product | Content | Commercial / Compliance |
|---|---|---|---|
| **Oct 2026** | App skeleton (all roles, routes) ✅; scoring and blueprint engines ✅; data model ✅ | CBSE 2026-27 syllabus extracted for Classes 9–10 ✅; 6–8 lists (verify) | Company incorporation; interview script; 10 interviews |
| **Nov 2026** | Supabase/Postgres + RLS, auth, school onboarding (CSV import); question-bank CMS with review workflow | Curriculum graph for all V1 chapters; question blueprint per chapter | 10 more interviews; pilot LOIs; DPA + privacy-notice drafts (lawyer) |
| **Dec 2026** | Daily practice + BKT mastery (ported from PSLE); PT builder + best-2-of-3; teacher dashboard | AI-assisted question generation + human QA (PSLE pipeline); target 30 Qs/topic for pilot chapters | Pricing interviews; security review |
| **Jan 2027** | Video library + Doubt Box + Live Sessions (embedded meeting links); parent view | 1 Remotion video per pilot topic; FAQ seed | Pilot contracts signed; teacher training kit |
| **Feb 2027** | Pilot launch: diagnostic baseline; offline/low-data mode | Class 10 Board mock papers (Phase 1 + Phase 2 patterns) | Pilot onboarding (<1 day per school) |
| **Mar 2027** | Reports: IA register export, predicted grade bands, remediation groups | Class 9 Advanced-level stretch sets | Weekly pilot reviews |
| **Apr 2027** | New academic year 2027-28: curriculum-version roll-over (change engine) | Update for the 2027-28 CBSE curriculum (Class 10 Advanced begins) | Pilot → paid conversions |
| **May 2027** | DPDP flows final (consent, rights, breach, erasure) | — | **13 May 2027 compliance date** |
| **Jun 2027** | AI tutor (grounded, controlled scope) behind the AI gate | Multilingual (Hindi) UI layer | Case studies v1 |
| **Jul 2027** | Analytics for school leadership; teacher copilot (PT paper drafts) | — | Sales to 10–25 schools |
| **Aug 2027** | Security hardening, pen-test, backups/DR drill | — | ISO 27001 readiness assessment |
| **Sep 2027** | PMF review; decide second board / Classes 11–12 | — | Seed-round readiness pack |

## 3a. Accelerated timeline (founder decision, 2026-10-08): remaining durations halved

The month-by-month table above is **superseded** by this one. Every remaining duration, measured from 8 Oct 2026, is cut by 50%.

| Milestone | Was | Now | Holds only if |
|---|---|---|---|
| Compliance matrix v1 (C5) | 25 Oct | **12 Oct** | — |
| Lawyer engaged; DPA + privacy notice drafted (F2) | Nov | **24 Oct** | Founder engages counsel this week |
| 2 subject reviewers recruited (F4) | Nov | **24 Oct** | — |
| Postgres + real school accounts live (C7) | end Nov | **24 Oct** | — |
| 20 school conversations; 3 pilot letters (F3, P0 exit) | Nov | **31 Oct** | ~7 conversations a week |
| Company incorporated (F1) | Nov | **31 Oct** | — |
| Question pipeline producing reviewed Class 9 items (C8) | end Nov | **31 Oct** | Reviewers in place (F4) |
| Topic videos for pilot chapters (C9) | Dec | **14 Nov** | — |
| Unit economics (C11) | Dec | **14 Nov** | Interview price data in by 31 Oct |
| Foundation build complete (P1 exit) | end Jan 2027 | **mid-Dec 2026** | Content review keeps pace |
| **Paid pilots start** (P2) | Feb 2027 | **5 Jan 2027** (Classes 6–9) | Schools agree in Nov; Class 10 excluded (pre-boards and Board exams) |
| Pilot post-test + conversions | Apr–Jun 2027 | **Mar 2027** | 12-week pilot from 5 Jan |
| DPDP children's-data compliance | 13 May 2027 | **13 May 2027 (fixed by law)**; our target is **31 Mar 2027** | Lawyer sign-off |
| PMF review | Sep 2027 | **Apr–May 2027** | Pilot evidence in |

**What halving cannot speed up:** CBSE's calendar (half-yearly Sept, pre-boards Dec, Board exams Feb–Mar), schools' buying window (Jan–Mar for April), and the legal DPDP date. The bottlenecks are founder-side (interviews, lawyer, reviewers), not build-side. If F2–F4 slip, the pilot date slips with them.

## 4. Seven-year scenario outline (to be modelled in Deliverable I; all [H])

| Stage | Years | Schools (cons / base / aggr) | Note |
|---|---|---|---|
| Validation | 0–1 | 3–5 / 5–10 / 10–20 | Paid pilots |
| PMF | 1–2 | 25 / 50 / 100 | One state cluster |
| Multi-state | 2–4 | 200 / 500 / 1,000 | Second board; school groups |
| National | 4–6 | 1,000 / 3,000 / 7,000 | Public-sector profile |
| Platform | 6–7 | 3,000 / 8,000 / 15,000 | APIs, assessment-as-a-service |
These are planning ranges, **not forecasts**. Revenue numbers wait until pricing interviews (master prompt §23: "do not invent a price").

## 5. Build architecture (summary — detail in `architecture/`)
- **Monorepo** `apps/web` (Next.js 15, React 19, TS) + `packages/{curriculum, assessment, learning-engine, db}`. **Modular monolith.**
- **Data:** PostgreSQL (Supabase) with `organisation_id / school_id / academic_year_id` on every tenant row + RLS. Migration `packages/db/migrations/0001_init.sql`.
- **Reused from PSLE:** design tokens and clay UI, BKT mastery, difficulty tiers 1–10, paper template, generation + solver QA pipeline, review queue, admin console pattern.
- **New for India:** versioned curriculum (board × class × subject × year), CBSE scoring policy engine, IA register, blueprint validator, video/doubt/session module, multi-tenant school model.

## 6. Key dependencies & risks (top 5)
| Risk | Mitigation |
|---|---|
| No school will pilot without references | Free diagnostic report as a door-opener; founder-led sales; one anchor school |
| Content volume (≈200 topics × 30 Qs × videos) | PSLE AI generation + solver QA pipeline; teacher reviewers paid per item |
| DPDP interpretation (processor vs fiduciary; Fourth Schedule) | Counsel review in Nov 2026; design for verifiable parental consent anyway |
| CBSE mid-year changes | Curriculum change engine; monthly check of the cbseacademic.nic.in circulars |
| Founder bandwidth | Strict V1 scope; Claude maintains the docs and tracker |
