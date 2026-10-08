# CBSE Classes 6–10 · Mathematics & Science — Syllabus, Teaching Pattern, Assessment & Scoring (2026-27)

**Version:** v1 · 2026-10-08 · Deliverable C (V1 wedge slice)
**Primary sources (Tier 1):** CBSE *Secondary Curriculum Part 1, 2026-27* and the subject documents on cbseacademic.nic.in, read in full from the official PDFs:
`Curriculum_SecP1_2026-27.pdf` (scheme of studies and assessment), `Maths_SecP1IX_2026-27.pdf`, `MathsAd_SecP1_2026-27.pdf`, `Maths_SecP1X_2026-27.pdf`, `ScienceSt_SecP1_2026-27.pdf`, `ScienceAd_SecP1_2026-27.pdf`, `Science_SecP1_2026-27.pdf` — base URL `https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/`.
Classes 6–8 sources are Tier 5 (publisher and solution sites) and are flagged; verify against ncert.nic.in/textbook.php before content production.

---

## 1. Headline facts that shape the product

| # | Fact | Source | Product consequence |
|---|---|---|---|
| F1 | Classes 9 and 10 are assessed as **80 marks theory + 20 marks internal assessment (IA)**. Class 10 theory is a Board exam; Class 9 theory is a school-run annual exam. | Curriculum_SecP1 §3 | The scoring engine needs two components per subject. |
| F2 | To pass, a student needs **≥33% separately** in the external exam and in internal assessment. | Curriculum_SecP1 §3 | The pass/fail rule is per component, not on the total. |
| F3 | **Class 10 grading is positional (rank-based):** each of A1…E bands covers 1/8 of *passed* candidates nationally. **Class 9 grading is absolute:** 91–100 A1, 81–90 A2, 71–80 B1, 61–70 B2, 51–60 C1, 41–50 C2, 33–40 D. | Curriculum_SecP1 Tables 8–9 | A school cannot compute a Class 10 grade. The product must show marks and a *predicted* band, clearly labelled as an estimate. Class 9 grades can be computed exactly. |
| F4 | **IA = 4 equal parts of 25%:** Periodic Assessment, Multiple Assessment, Portfolio, Subject Enrichment (Science practicals; Maths lab practicals). | Curriculum_SecP1 §3.3; subject docs | This maps directly to IA tracking in the teacher dashboard. |
| F5 | **Periodic Assessment = 3 tests a year; the average of the best two counts.** At least one must be competency-based (case analysis, data interpretation, open-ended). Each must be followed by documented feedback and remediation. | Curriculum_SecP1 §3.3.1 | **This is the core V1 hook:** the platform runs the 3 periodic tests, computes best-2-of-3, and logs remediation as evidence. |
| F6 | **Maths Class 10 IA:** Pen-paper test plus multiple assessment (5+5) = 10, portfolio 5, lab practical 5. **Science IA:** periodic 5, multiple 5, portfolio 5, subject enrichment (practicals) 5. | Subject docs | The IA template differs by subject, so it must be configuration, not code. |
| F7 | **Standard/Advanced levels:** Class 9 from 2026-27; Class 10 Board Advanced papers from 2027-28. Advanced is an *extra* 25-mark, 1-hour, all-HOTS (higher-order thinking) paper. **It is not added to the aggregate**; a score of ≥50% earns a marksheet note. IA (20) is not tiered. | Curriculum_SecP1 lines 885–912 | Content needs a `level: standard | advanced` tag, and Advanced practice is a stretch track. |
| F8 | **Maths Basic (241) / Standard (041) are being phased out.** The current Class 10 cohort (2026-27) keeps the old scheme and may still take Basic. | Curriculum_SecP1 §(5) | 2026-27 Class 10 needs Basic **and** Standard blueprints; from 2027-28 it switches to Standard + Advanced. A versioned blueprint is mandatory, not optional. |
| F9 | **Two Class 10 Board attempts:** Phase 1 (Feb–Mar) is mandatory; Phase 2 (May) is an optional improvement. Only the 80-mark theory is retaken; the best score counts. | Secondary sources S08/S09 (confirm the circular) | Add a "Phase-2 improvement" revision plan (Mar–May) for students who need it. |
| F10 | **Board paper typology:** about 50% competency-based (case, source, integrated, data, situational), plus select-response MCQs and constructed response. Sections A (MCQ/objective), B–C (short answer), D (long answer), E (case study). Science has about 33% internal choice. | Curriculum_SecP1 §3.1; Science QPD | The question-type set and section structure in the blueprint engine come from this. |
| F11 | **Cognitive weightage:** Maths Standard (Class 9 and 10): Remember/Understand 43 marks (54%), Apply 19 (24%), Analyse/Evaluate/Create 18 (22%). Maths Basic: 60 (75%) / 12 (15%) / 8 (10%). Science: 50% / 30% / 20%. | QPD tables | These become blueprint-validator constraints. |
| F12 | **Classes 6–8: no Board-mandated scheme.** CBSE leaves assessment to schools. A common pattern is two terms, each with IA 20 (periodic test 10 + multiple assessment 5 + portfolio 5) plus a term exam of 80. | Tier 5 (S20). **Verify per school.** | For Classes 6–8 the blueprint must be **school-configurable**. This is a real pain point and a selling point. |
| F13 | Third language (R3) is compulsory and assessed internally; no Class 10 pass certificate without it. | Curriculum_SecP1 §R3 | Out of V1 scope, but the school-setup model must allow internal-only subjects. |

## 2. Syllabus — Classes 9 & 10 (official 2026-27)

### Class 9 Mathematics — new NCERT textbook *Ganita Manjari* (Parts 1 & 2)
| Unit | Chapters | Marks /80 | Periods |
|---|---|---|---|
| I Number System | Number System (rationals, density, irrationals, √2 √3 proofs, square-root spiral) | 07 | 12 |
| II Algebra | Introduction to Polynomials · Sequences and Progressions · Exploring Algebraic Identities · Linear Equations in Two Variables | 20 | 66 |
| III Coordinate Geometry | Coordinate Geometry | 04 | — |
| IV Geometry | Euclid's Geometry: Axioms and Postulates · Lines and Angles · Triangles: Congruence · 4-gons (Quadrilaterals) · Circles | 25 | — |
| V Mensuration | Area and Perimeter · Surface Area and Volume | 14 | — |
| VI Statistics & Probability | Statistics · Introduction to Probability | 10 | — |
| **IA** | | **20** | |

Note: the CBSE Class 9 syllabus now includes Sequences and Progressions (AP), which was previously a Class 10 topic. The curriculum graph needs a **many-to-many** concept link, *AP (C9 2026-27) ≈ AP (C10)*, without treating them as identical.

### Class 10 Mathematics (041 Standard / 241 Basic) — NCERT *Mathematics X* (existing book)
| Unit | Chapters | Marks /80 |
|---|---|---|
| I Number Systems | Real Numbers | 06 |
| II Algebra | Polynomials · Pair of Linear Equations in Two Variables · Quadratic Equations · Arithmetic Progressions | 20 |
| III Coordinate Geometry | Coordinate Geometry | 06 |
| IV Geometry | Triangles · Circles | 15 |
| V Trigonometry | Introduction to Trigonometry · Trigonometric Identities · Heights and Distances | 12 |
| VI Mensuration | Areas Related to Circles · Surface Areas and Volumes | 10 |
| VII Statistics & Probability | Statistics · Probability | 11 |

**Board paper layout (2026 Maths Standard, as reported):** A: 20 × 1 (MCQ + Assertion–Reason) · B: 5 × 2 · C: 6 × 3 · D: 4 × 5 · E: 3 × 4 case-based = 80. *(Tier 5 source S18; check against the official 2026-27 Sample Question Paper once released.)*

### Class 9 Science — new NCERT textbook *Exploration* (13 chapters)
| Unit | Marks /80 |
|---|---|
| I Matter — Its Nature and Behaviour (Exploring Mixtures and their Separation · Structure of an Atom · Atoms and Molecules · …) | 27 |
| II World of Living (Cell · Tissues · Reproduction · Diversity) | 25 |
| III Motion, Force, Work and Sound (Motion · Force and Laws of Motion · Work, Energy and Simple Machines · Sound) | 23 |
| IV Earth as a System (Earth as a System: Energy, Matter & Life) | 05 |
| **IA** (Periodic 5 · Multiple 5 · Portfolio 5 · Practical 5) | **20** |
Chapter-to-unit mapping is from layout-extracted tables. Confidence: medium. Re-verify against the PDF before content production.

### Class 10 Science (086) — NCERT *Science X*
| Unit | Chapters | Marks /80 |
|---|---|---|
| I Chemical Substances — Nature & Behaviour | Chemical Reactions & Equations · Acids, Bases & Salts · Metals & Non-metals · Carbon & its Compounds | 25 |
| II World of Living | Life Processes · Control & Coordination · How do Organisms Reproduce · Heredity | 25 |
| III Natural Phenomena | Light: Reflection & Refraction · Human Eye & Colourful World | 12 |
| IV Effects of Current | Electricity · Magnetic Effects of Electric Current | 13 |
| V Natural Resources | Our Environment | 05 |
Some topics (Periodic Classification, Heredity & Evolution, parts of Electric…) are **assessed formatively only**, not in the Board exam. The content model needs an `assessment_scope: summative | formative_only` flag.
Science lists **practicals mapped to units** (e.g. focal length of a concave mirror → Unit III). These feed the IA "Subject Enrichment" tracker.

## 3. Syllabus — Classes 6–8 (NCERT new textbooks, NCF-SE 2023)

| Class | Maths (*Ganita Prakash*) | Science (*Curiosity*) | Confidence |
|---|---|---|---|
| 6 | 10 chapters: Patterns in Mathematics · Lines and Angles · Number Play · Data Handling and Presentation · Prime Time · Perimeter and Area · Fractions · Playing with Constructions · Symmetry · The Other Side of Zero | 12 chapters: The Wonderful World of Science · Diversity in the Living World · Mindful Eating · Exploring Magnets · Measurement of Length and Motion · Materials Around Us · Temperature and its Measurement · A Journey through States of Water · Methods of Separation · Living Creatures · Nature's Treasures · Beyond Earth | Medium (Tier 5) |
| 7 | Part 1: Large Numbers Around Us · Arithmetic Expressions · A Peek Beyond the Point · Expressions using Letter-Numbers · Parallel and Intersecting Lines · Number Play · … Part 2: Geometric Twins · Operations with Integers · Finding Common Ground · Another Peek Beyond the Point · Connecting the Dots… · Constructions and Tilings · … **(list incomplete)** | 13 chapters: The Ever-Evolving World of Science · Exploring Substances: Acidic, Basic and Neutral · Electricity: Circuits · Metals and Non-metals · Changes around Us · Adolescence · Heat Transfer in Nature · Measurement of Time and Motion · Life Processes in Animals · Life Processes in Plants · Light: Shadows and Reflections · Earth, Moon, and the Sun · Natural Resources | Medium; Maths list incomplete |
| 8 | Part 1: A Square and a Cube · Power Play · A Story of Numbers · Quadrilaterals · Number Play · We Distribute Yet Things Multiply · Proportional Reasoning-1. Part 2: Fractions in Disguise · The Baudhayana-Pythagoras Theorem · Proportional Reasoning-2 · Exploring Some Geometric Themes · Tales by Dots and Lines · Algebra Play · Area | 13 chapters: Exploring the Investigative World of Science · The Invisible Living World · Health · Electricity: Magnetic and Heating Effects · Exploring Forces · Pressure, Winds, Storms, and Cyclones · Particulate Nature of Matter · Elements, Compounds, and Mixtures · Solutes, Solvents, and Solutions · Light: Mirrors and Lenses · Keeping Time with the Skies · How Nature Works in Harmony · Our Home: Earth | Medium (Tier 5) |

**Textbook rights:** NCERT textbooks are copyrighted. We store **structure only** (chapter titles, topics, learning outcomes, page references) and write our **own** questions and explanations. We do not ingest textbook text at scale unless licensed (master prompt §9). The full NCERT PDFs are free to read at ncert.nic.in/textbook.php; we link to them rather than re-host them.

## 4. Teaching pattern (how CBSE expects these subjects to be taught)

| Principle (from the 2026-27 docs) | What it means in the app |
|---|---|
| Competency-based, not rote. Each topic lists "Competencies" codes (e.g. CG-1 / C-1.1) and learning outcomes. | Every question is tagged to a competency code (e.g. `C-3.2`). Mastery is reported per competency, not per chapter. |
| Indian Knowledge System integration (e.g. Baudhayana, contributions of Indian scientists). | An `iks_context` tag on content, plus optional enrichment cards. |
| Experiential and lab work (Maths lab activities, Science practicals). | Practicals checklist, a virtual-lab placeholder, and a portfolio upload. |
| Periods per chapter are given (e.g. Algebra 66 periods in Class 9). | Pacing planner: recommended weeks per chapter, drawn from the official period counts. |
| Formative-only topics are excluded from the summative exam. | `assessment_scope` flag. Formative topics are excluded from board mocks. |
| Advanced level is all HOTS. | Stretch track with tier 8–10 difficulty (reuses the PSLE tiering). |

## 5. Test frequency — a typical CBSE school year

| Class | Component | Frequency | Weight | Timing (typical) |
|---|---|---|---|---|
| 9–10 | Periodic Assessment (PT) | **3 per year**, best 2 averaged | 5 of 20 IA (Science) / part of 10 (Maths) | ~Jul, ~Oct–Nov, ~Dec–Jan |
| 9–10 | Multiple Assessment (quiz, oral, project, etc.) | Ongoing | 5 of 20 | Throughout |
| 9–10 | Portfolio | Continuous | 5 of 20 | Throughout |
| 9–10 | Subject Enrichment / Lab | Per practical list | 5 of 20 | Throughout |
| 9 | Half-yearly (school) | 1 | School-defined | ~Sep |
| 9 | Annual exam (school) | 1 | 80 | ~Feb–Mar |
| 10 | Pre-boards (school) | 1–2 (school practice) | 0 (practice) | ~Dec–Jan |
| 10 | Board Phase 1 | 1 | 80 | Feb–Mar |
| 10 | Board Phase 2 (optional) | 1 | Best of the two | May |
| 6–8 | PT / Half-yearly / Annual | School-defined; commonly 2 terms × (IA 20 + exam 80) | School-defined | Half-yearly ~Sep, Annual ~Feb–Mar (Tier 5) |

**In-app cadence (designed to fit the above):** daily practice of 10 minutes → weekly mini-test → chapter test → PT-style test → half-yearly / pre-board mock → board mock. *(RECOMMENDATION)*

## 6. Scoring models the engine must implement

```
subject_total      = theory (0–80) + IA (0–20)
pass(subject)      = theory/80 ≥ 0.33  AND  IA/20 ≥ 0.33              # per component
IA                 = scale(periodic, w=.25) + scale(multiple, .25) + scale(portfolio, .25) + scale(enrichment, .25)
periodic           = mean(best 2 of PT1, PT2, PT3)
grade_class9       = absolute table (A1 ≥ 91 … D 33–40, E < 33)
grade_class10      = PREDICTED band only (positional; computed nationally by CBSE)
advanced_level     = separate 25-mark score; note if ≥ 50%; never added to subject_total
board_phase2       = final theory = max(phase1, phase2); IA unchanged
grade_6_8          = school-configured (default template: 2 terms × [IA 20 + exam 80])
```
All rules are stored as versioned **scoring policies** (`board=CBSE, class, subject, year=2026-27`) and never hard-coded (master prompt §7).

## 7. Open verification items
1. The official 2026-27 Sample Question Papers (section-wise marks) when CBSE publishes them on cbseacademic.nic.in.
2. Class 7 Ganita Prakash full chapter list from ncert.nic.in.
3. The CBSE circular for the two-exam scheme (Phase 2 subject eligibility).
4. The Class 9 Science chapter-to-unit mapping (re-read the PDF table).
