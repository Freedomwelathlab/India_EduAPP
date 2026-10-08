# India Education OS · "Vidya" (working name)

A school-centric learning and assessment layer for **CBSE Classes 6–10, Mathematics & Science** (V1):
curriculum → daily practice → periodic tests (CBSE IA-compliant) → remediation → tutor videos & clarification sessions → teacher, parent and school reports.

Not affiliated with or endorsed by CBSE, NCERT, the Ministry of Education or PARAKH.

## Start here
| Doc | What it is |
|---|---|
| [docs/PROGRESS_TRACKER.md](docs/PROGRESS_TRACKER.md) | **Daily status, pending tasks and founder actions** |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Master plan, phases and the 12-month roadmap |
| [docs/curriculum/01-cbse-6-10-maths-science-analysis.md](docs/curriculum/01-cbse-6-10-maths-science-analysis.md) | Syllabus, teaching pattern, test frequency and scoring models (from the official CBSE 2026-27 PDFs) |
| [docs/product/02-tutor-videos-and-clarification-sessions.md](docs/product/02-tutor-videos-and-clarification-sessions.md) | Video + doubt + live-session module |
| [docs/architecture/README.md](docs/architecture/README.md) | System structure |
| [docs/research/](docs/research/) | Date check, regulatory status, source register |

## Run
```bash
pnpm install
pnpm test     # 35 tests
pnpm dev      # http://localhost:3200  → /login to pick a demo role
```
No secrets are needed. The skeleton runs on an in-memory **demo** school (fictional). Copy `.env.example` to `.env.local` when Postgres is wired.

## Layout
```
apps/web                 Next.js 15 app: student, teacher, parent, school, admin (22 routes)
packages/curriculum      Versioned CBSE 2026-27 curriculum graph, Classes 6–10 Maths/Science
packages/assessment      Questions, server-side marking, CBSE scoring policy, blueprint validator
packages/learning-engine BKT mastery (ported from PSLE) + explainable recommender
packages/db              RBAC/tenant isolation, tamper-evident audit, SQL migration with RLS
docs/                    Research, curriculum, product, roadmap, tracker
```
