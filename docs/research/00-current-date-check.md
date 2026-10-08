# 00 — Current-Date Check (Master Prompt §59)

**Research date:** 2026-10-07
**Status:** Gate 1 (Research) — first pass. Every row carries a source ID from [SOURCES.md](SOURCES.md).
**Labels:** FACT = verified against a cited source · INFERENCE = reasoned from facts · ASSUMPTION = unverified, needs confirmation · LAWYER REVIEW REQUIRED = do not act without counsel.

---

## 1. Academic calendar

| Item | Value | Label | Source |
|---|---|---|---|
| Current date | 7 October 2026 | FACT | — |
| Academic year underway (CBSE / CISCE) | **2026-27** (April 2026 – March 2027) | FACT (CBSE session runs Apr–Mar) | S07 |
| Next academic year | **2027-28** | INFERENCE | — |
| State boards | Start dates vary by state (e.g. many southern states begin in June). **Do not generalise.** Per-state dates to be captured in the State/UT matrix (Deliverable B). | ASSUMPTION, to verify per state | — |
| Selling-season implication | Indian private schools typically choose vendors in Jan–Mar ahead of an April start. A 2027-28 deployment means pilots in **Nov 2026 – Feb 2027**. | INFERENCE, validate in school interviews | — |

## 2. Regulatory dates that affect the platform

| Item | Status as of 2026-10-07 | Label | Source |
|---|---|---|---|
| **DPDP Act 2023** | In force through the DPDP Rules 2025 | FACT | S01 |
| **DPDP Rules 2025** | Notified 13 Nov 2025 (G.S.R. 846(E)). Phased commencement: | FACT | S01, S02 |
| — Rules 1, 2, 17–21 (definitions, Data Protection Board) | In force from **13 Nov 2025** | FACT | S01 |
| — Rule 4 (Consent Manager registration) | **13 Nov 2026**. Applies to Consent Managers, not to ordinary fiduciaries like us. | FACT | S02 |
| — Rules 3, 5–16, 22, 23 (notice, consent, security, breach, **children's data / Rule 10**, rights, cross-border) | **13 May 2027** | FACT | S01, S02 |
| MeitY proposal to shorten the 18-month window to 12 months (mainly Significant Data Fiduciaries) | Consulted Jan–Feb 2026. **No final notification found** in this pass. | FACT (proposal) / UNVERIFIED (outcome) — re-check monthly | S03 |
| **Children's data (Sec 9 + Rule 10)** | Verifiable parental consent for under-18s. No tracking, behavioural monitoring or targeted ads aimed at children. | FACT | S01, S04 |
| **Fourth Schedule exemptions** | Educational institutions, and third parties they engage, are exempt from parental consent and the monitoring bar **only** for narrow purposes: their own educational activities and the safety of enrolled children. | FACT (text) / **LAWYER REVIEW REQUIRED** on whether a SaaS vendor acting for a school falls inside it | S04 |
| **APAAR ID** | More than 16.63 crore IDs generated (21 Jul 2026). On 20 Jul 2026 the **Supreme Court** applied the Orissa HC opt-out safeguard nationwide: the consent form must allow refusal, and **student data must not be shared with private entities except as the law allows.** | FACT | S05, S06 |

### What this means for the product

1. **Build for May 2027 compliance now.** The V1 pilot runs during the run-up to 13 May 2027, so consent, notice, breach-response and erasure flows are launch requirements, not later hardening. (RECOMMENDATION)
2. **B2B through schools is structurally safer than B2C.** If the school is the data fiduciary and we process data on its behalf, the Fourth Schedule exemption may apply to educational activities. A direct-to-parent product needs verifiable parental consent for every child from day one. This favours a school-centric wedge. (INFERENCE — **LAWYER REVIEW REQUIRED**)
3. **Do not plan around APAAR integration.** The Supreme Court restriction on sharing data with private entities makes "we sync with APAAR" an unsafe V1 promise. Keep our account IDs independent of government identifiers and store an APAAR ID only if the school explicitly supplies it. (RECOMMENDATION)

## 3. Board changes in effect for 2026-27

| Change | Detail | Label | Source |
|---|---|---|---|
| **CBSE Class 10: two board exams** | Phase 1 (Feb–Mar) is mandatory. Phase 2 (May) is an optional improvement attempt in Science, Maths, Social Science and languages. Internal assessment (20) is not repeated; only the 80-mark theory paper. The marksheet shows the better score. 2026 was the first cycle; the Phase 2 result came out 18 Jul 2026. | FACT (secondary sources; confirm against the CBSE circular) | S08, S09 |
| **CBSE Class 9: Standard / Advanced levels** in Maths and Science from 2026-27 | Everyone studies Standard. Advanced adds a 1-hour, 25-mark paper that is **excluded from the aggregate**; a score of 50% or more is noted on the marksheet. First board exams for this cohort in 2028. | FACT (secondary; confirm the circular) | S07 |
| **CBSE three-language formula (R1/R2/R3)** | A third language is compulsory from Class 6 in 2026-27, continuing through Class 10. At least two of the three must be Indian languages (NCFSE 2023). | FACT (secondary; confirm the circular) | S07 |
| New NCERT Class 9 textbooks for 2026-27 | Reported. Chapter lists must be versioned. | ASSUMPTION, verify on ncert.nic.in | S10 |

**Product implication:** these changes support the prompt's core thesis that curriculum truth must be versioned. One board changed its exam structure, its subject levels and its language rules in a single year. A content bank that cannot tag an item as *CBSE / Class 9 / Maths-Advanced / 2026-27* is already out of date. (INFERENCE)

## 4. Learning-outcome baseline (why this matters)

| Indicator | Value | Label | Source |
|---|---|---|---|
| PARAKH Rashtriya Sarvekshan 2024 (4 Dec 2024; ~21.15 lakh students; 74,229 schools; Classes 3/6/9) | Class 6: only **38%** can solve everyday maths problems; 43% cannot grasp a text's main idea. Average maths score falls from ~60% in Class 3 to **~37% in Class 9**. Government-school, SC and ST students score lower. | FACT (secondary reporting of the PARAKH report; primary report at parakh.ncert.gov.in) | S11, S12 |
| ASER 2024 (rural) | Class 3 children who can at least subtract: **33.7%** (25.9% in 2022). Class 5 children who can read a Class 2 text: **44.8%**; 59.3% in private schools, still below the 2018 private-school figure of 65.1%. | FACT (secondary) | S13 |
| UDISE+ 2024-25 | **14,71,473 schools · 24.69 crore enrolments · 1.01 crore teachers.** Enrolment fell by about 11 lakh year on year. | FACT | S14 |

**Read-through:** learning gaps compound from Class 3 to Class 9. That is the gap a diagnostic → practice → remediation loop is designed to close, and PARAKH tests exactly those grades. (INFERENCE)

## 5. Competitive signals in this pass (verify before relying on them)

| Signal | Label | Source |
|---|---|---|
| Teachmint reportedly exited standalone school ERP around April 2026 and moved to classroom hardware. The sources conflict. | UNVERIFIED — conflicting | S15 |
| Extramarks says it serves 15,000+ schools, 3.2 lakh teachers and 1 crore+ students (vendor's own claim). | Vendor claim | S16 |
| LEAD School: no current 2026 status found. | Open | — |

A full competitor matrix (§15) is still to come.
