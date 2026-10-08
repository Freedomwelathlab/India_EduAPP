# Progress Tracker: India Education OS ("Vidya", working name)

**Last updated:** 2026-10-08 (session 4) · **Updated by:** Claude · **Status page:** https://claude.ai/artifact/EJdMh8dNaMF69w7wbXZhwG · **Review app:** https://vidya-review.vercel.app · **Cadence:** updated at the end of every working session (daily while active)
Legend: ✅ Done · 🟡 In progress · ⏳ Not started · 🔴 Blocked · 👤 Needs founder

---

## 1. Overall status

| Area | Foundational progress | Full V1 scope | Status | Note |
|---|---|---|---|---|
| Research & evidence (Gate 1) | 55% | 30% | 🟡 | CBSE 6–10 Maths/Science verified against the official CBSE PDFs **and** the NCERT 2026-27 book contents. State atlas, competitors and compliance matrix still to do |
| Strategy & plan (Gate 2) | 40% | 20% | 🟡 | Roadmap v1 written. Pricing and unit economics wait on interviews |
| Architecture (Gate 3) | 50% | 30% | 🟡 | Data model + RLS migration, RBAC and audit chain written. No live database yet |
| App build (Gate 4) | 45% | 14% | 🟡 | 22 routes, demo sign-in, 39 tests. Curriculum now on NCERT book numbering; Class 10 fully topic-mapped. Code on GitHub; review app on Vercel |
| Content | 6% | 1% | 🟡 | 10 seed questions (draft); 69 topics mapped (Class 10 complete: 57); 0 reviewed videos. Target ~6,000 questions + ~200 videos |
| Compliance | 10% | 5% | 🔴 👤 | Lawyer needed (DPDP processor role, Fourth Schedule) |
| Go-to-market | 0% | 0% | ⏳ 👤 | School interviews not started |

*Foundational* = the pieces everything else is built on. *Full V1 scope* = everything needed for paid pilots (Feb 2027).

## 2. Daily log

| Date | Done today | Evidence |
|---|---|---|
| 2026-10-07 | Read the 63-section master prompt. Current-date check: DPDP Rules timeline, APAAR Supreme Court order, CBSE 2026-27 changes, PARAKH/ASER/UDISE+ baselines. Program plan and source register written. | `docs/research/00-current-date-check.md`, `SOURCES.md`, `PROGRAM_PLAN.md` |
| 2026-10-08 | Founder decisions recorded (India holding; CBSE 6–10 Maths/Science; reuse PSLE; add videos and clarification sessions). Downloaded and read the **7 official CBSE 2026-27 curriculum PDFs** and extracted syllabus, unit marks, IA scheme, grading, pass rules and Advanced level. Wrote the tutor video + clarification module design and the master roadmap. **Built the monorepo:** curriculum, assessment (scoring + blueprint validator), learning-engine (BKT ported from PSLE + explainable recommender), db (RBAC, tamper-evident audit, full SQL schema with RLS). **Built the web app:** 22 routes across student, teacher, parent, school and admin, with 10 working sample questions (one per class × subject). 35/35 tests pass, typecheck clean, production build passes, all routes return 200, mobile layout checked. | `docs/curriculum/01-…`, `docs/product/02-…`, `docs/ROADMAP.md`, `packages/*`, `apps/web` |
| 2026-10-08 (S3) | Brand renamed to **Vidya** (demo school → Sahyadri Public School). Added demo sign-in (6 fictional accounts, HMAC session cookie, role-based route access via middleware). Deployed to Vercel project `vidya-review` → https://vidya-review.vercel.app (DEMO_PASSWORD + SESSION_SECRET set as Vercel env, not in source). Published the status artifact https://claude.ai/artifact/EJdMh8dNaMF69w7wbXZhwG and will republish it every session. | `apps/web/src/lib/session.ts`, `middleware.ts`, `docs/status/vidya-status.html` |
| 2026-10-08 (S4) | **Pushed the code to GitHub** (`main`, commit 30b437b + this session). Vercel↔GitHub link needs founder access (F8). **C1/C2:** read the NCERT 2026-27 contents pages for all 11 books. Corrected Class 7 Maths (15 ch), Class 7 Science (12 ch), and a **swapped-marks error in Class 9 Science**; Class 9 Maths/Science and Class 10 Maths now follow NCERT book numbering with CBSE syllabus names alongside. **C3:** Class 10 Maths + Science fully topic-mapped (57 topics, formative-only flagged). **C6:** interview script, note template, pilot one-pager and measurement plan. 39 tests pass; redeployed. | `packages/curriculum/*`, `docs/curriculum/01-…`, `docs/business/03-…` |

## 3. Pending tasks (Claude)

| # | Task | Phase | Priority | Target | Status |
|---|---|---|---|---|---|
| C1 | Verify Class 6–8 chapter lists against NCERT | Research | High | 2026-10-12 | ✅ 2026-10-08: all Class 6–10 books checked against the NCERT contents pages. Fixed Class 7 Maths (15 chapters, not 12) and Class 7 Science (12 in the 2026-27 reprint) |
| C2 | Verify the Class 9 Science chapter → unit mapping | Research | High | 2026-10-12 | ✅ 2026-10-08: **found and fixed a marks swap** (World of Living = 27, Matter = 25). Class 9–10 chapters now use NCERT book titles/numbers, with the CBSE syllabus names kept alongside |
| C3 | Map topics + learning outcomes for all Class 9–10 chapters | Curriculum | High | 2026-10-20 | 🟡 Class 10 done (57 topics, formative-only flagged). Class 9 next |
| C4 | Competitor matrix (Extramarks, LEAD, Teachmint status, Toddle, Embibe, school ERPs) | Research | High | 2026-10-20 | ⏳ |
| C5 | Compliance matrix v1 (DPDP Act/Rules, IT Act, CERT-In, POCSO, Consumer Protection, Copyright, GST) | Compliance | High | 2026-10-25 | ⏳ |
| C6 | Interview script + pilot one-pager for schools | GTM | High | 2026-10-15 | ✅ `docs/business/03-school-interview-script-and-pilot.md` |
| C7 | Wire Supabase/Postgres: apply migration, seed curriculum, real auth (school-issued accounts) | Build | High | Nov 2026 | ⏳ |
| C8 | Question generation pipeline (port the PSLE generate + solver-QA scripts to the CBSE schema) | Content | High | Nov 2026 | ⏳ |
| C9 | Remotion video template for topic explainers (reuse the FWL pipeline; one voice) | Content | Medium | Dec 2026 | ⏳ |
| C10 | State/UT board atlas (36 rows) | Research | Medium | Nov 2026 | ⏳ |
| C11 | Unit-economics model (conservative/base/aggressive), after pricing interviews | Business | Medium | Dec 2026 | ⏳ |
| C12 | Replace the Class 10 section layout with the official 2026-27 Sample Question Paper when CBSE publishes it | Assessment | Medium | When released | ⏳ |
| C13 | Accessibility audit (axe) + end-to-end smoke tests (Playwright) | Quality | Medium | Nov 2026 | ⏳ |
| C14 | Test guarding that video outlines never contain a practice answer (fixed by hand today; needs a test) | Quality | Low | Nov 2026 | ⏳ |

## 4. Founder actions (only you can do these)

| # | Action | Why it matters | By | Status |
|---|---|---|---|---|
| F1 | **Incorporate the Indian Pvt Ltd** (or confirm the existing entity) and apply for DPIIT Startup India recognition | Contracts with schools, invoicing, GST | Nov 2026 | 👤 ⏳ |
| F2 | **Engage a lawyer** (DPDP / ed-tech): processor vs fiduciary, Fourth Schedule exemption, DPA template, privacy notice | Children's-data obligations start **13 May 2027** | Oct–Nov 2026 | 👤 ⏳ |
| F3 | **Line up 20 CBSE school conversations** (principals and academic coordinators), ideally 2–3 cities | Validates the wedge, pricing and buyer path; 3 pilot LOIs is the P0 exit | Nov 2026 | 👤 ⏳ |
| F4 | **Recruit 2 subject-expert reviewers** (Maths, Science; CBSE teachers), paid per item | No question or video can be published without a named reviewer (content gate) | Nov 2026 | 👤 ⏳ |
| F5 | **Trademark search for "Vidya"** (chosen 2026-10-08; very common in Indian education, so a distinctive mark may be needed) and register the domain | Brand, landing page, trademark | Nov 2026 | 👤 ⏳ |
| F6 | Decide the **video provider budget** (Mux / Cloudflare Stream / Bunny), after Claude's cost comparison | Hosting cost per minute watched | Dec 2026 | 👤 ⏳ |
| F7 | Create the GitHub repo and push | Version control | This week | ✅ 2026-10-08: pushed to github.com/Freedomwelathlab/India_EduAPP |
| F8 | **Give Vercel access to the repo:** Vercel → Settings → Git → connect `Freedomwelathlab/India_EduAPP` to project `vidya-review` (or GitHub → Settings → Applications → Vercel → add the repo) | Every push then redeploys the review app automatically | This week | 👤 ⏳ |

## 5. Risks to watch

| Risk | Signal | Owner |
|---|---|---|
| CBSE publishes mid-year changes | New circular on cbseacademic.nic.in | Claude (monthly check) |
| Content volume outpaces review capacity | Review queue > 2 weeks | Founder + reviewers |
| DPDP timeline compressed by MeitY | Amendment notification | Lawyer / Claude |
| No pilot LOIs by end of Nov 2026 | Fewer than 3 positive schools after 20 conversations | Founder |

## 6. How to run what exists

```bash
cd India-Education-OS
pnpm install
pnpm test          # 35 tests: curriculum integrity, scoring, blueprint, RBAC, audit, recommender
pnpm dev           # http://localhost:3200
```
Demo roles: `/login` → Student · Teacher · Parent · School leader · Super admin.
