# Architecture v1 (2026-10-08)

**Shape:** a modular monolith (master prompt §36). One Next.js app plus TypeScript domain packages. Each package is pure and unit-tested, and has no knowledge of HTTP or the database, so the same logic can later run in workers.

```
Browser (PWA, low-data)          ──►  apps/web (Next.js 15, React 19, server components + server actions)
                                          │  marking, IA, recommendations run server-side only
                                          ▼
   packages/curriculum   packages/assessment   packages/learning-engine   packages/db (rbac, audit)
                                          │
                                          ▼
                           PostgreSQL (Supabase, ap-south-1 / India region)
                           RLS on every tenant table · audit hash chain · object storage + CDN (video via provider)
```

## Key decisions
| Decision | Why |
|---|---|
| Answer keys never leave the server (`toStudentView` + server action marking) | Question-bank and exam security (§34). Verified: no misconception or answer text in the client bundles. |
| Scoring rules are versioned **policy data** (`CBSE:2026-27:G9`, `…:G10`) | CBSE changes rules yearly. 2027-28 adds Class 10 Advanced and drops Maths Basic. |
| Blueprint validator gates paper release | Master prompt §7. Encodes the QPD cognitive split (43/19/18) and unit marks. |
| Class 10 grade is **never computed** by us (positional, board-computed) | Only marks and a clearly labelled estimate are shown. |
| Tenancy = `organisation_id` + `school_id` on every row, plus RLS; app-side `can()` mirrors it | Defence in depth. Tested: no cross-school access, and the super admin cannot read students. |
| Live video = embed the school's Meet/Zoom/Jitsi; recorded video = external HLS provider | Not a moat; keeps cost and child-safety surface small. |
| Data region: India | Simplest DPDP posture; company held in India. |
| AI: off by default, behind a model gateway (OmniRoute-compatible env) | AI gate (§37) must pass first. |

## Data model
Full DDL: [`packages/db/migrations/0001_init.sql`](../../packages/db/migrations/0001_init.sql). Covers tenancy, people, curriculum versions and nodes, the concept-link and prerequisite graph, question + question_version (with provenance and licence), blueprints, assessments, attempts, answers, marking events, the IA register, mastery, recommendations, videos, doubts, sessions, consent, privacy requests, AI interactions, audit events and feature flags.

## Not built yet (tracked in PROGRESS_TRACKER)
Supabase wiring, real auth, CSV onboarding, offline packs, AI gateway, observability, CI, IaC.
