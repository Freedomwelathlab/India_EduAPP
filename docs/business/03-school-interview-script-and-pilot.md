# School Discovery Interviews & Pilot One-Pager

**Version:** v1 · 2026-10-08 · Task C6 · For founder action F3 (20 CBSE school conversations)
**Goal of the interviews:** learn, don't sell. By the end of 20 conversations we need evidence on four questions:
1. Is **CBSE Internal Assessment and periodic-test admin** a real, felt pain (time, audit stress, parent disputes)?
2. Who **decides** and who **pays** for academic software (teacher → coordinator → principal → owner/trust)?
3. What do schools **pay today** for content, ERP or assessment tools, and what would they pay for this?
4. Would they run a **90-day pilot** in Feb–Apr 2027, and on what terms?

---

## 1. Who to talk to (targets for the 20)

| Segment | How many | Why |
|---|---|---|
| Mid-fee CBSE private schools (≈ ₹30k–1.5L annual fee), 500–2,000 students | 10 | Hypothesised first customer |
| Small CBSE school groups (2–10 schools) | 4 | One sale → several schools |
| Budget CBSE schools (< ₹30k fee) | 3 | Tests price sensitivity and the low-bandwidth needs |
| Premium / international-leaning CBSE schools | 3 | Tests whether they already have better tools |

In each school, try to meet the **academic coordinator** first, then a **Maths or Science teacher of Class 9–10**, then the **principal**. Record who said what; the roles disagree, and that disagreement is data.

## 2. Before the call
- 30 minutes, ideally in person. Ask permission to take notes; **do not record** without written consent.
- Bring nothing to sell. Have the review app ready on a phone for the last 5 minutes only.
- Do not collect any student data. Aggregated numbers only (e.g. "about 120 students in Class 9").

## 3. Script (30 min)

**Opening (2 min)**
> "I'm building software for CBSE schools in Classes 6–10, focused on Maths and Science practice and assessment. I'm not here to sell anything today. I want to understand how your school runs tests and tracks learning, so we build the right thing."

**A. Current workflow (8 min)**
1. Walk me through the last **periodic test** in Class 9 Maths: who set the paper, how long it took, how it was marked, where the marks went.
2. How do you calculate the **20 internal-assessment marks** (periodic best-of-two, multiple assessment, portfolio, practicals)? What tool: register, Excel, ERP?
3. What happened the last time a **parent disputed** a mark or grade? How long did it take to resolve?
4. When a student is weak in a topic, what actually happens next? Who notices, and when?

**B. Pain and cost (8 min)**
5. In a typical month, how many hours does a Class 9–10 teacher spend **setting papers** and **marking**? (Get a number.)
6. What changed for you with the **2026-27 CBSE changes**: two Class 10 board exams, Standard/Advanced in Class 9, the third language? What is still unclear?
7. If you could fix one thing about assessment in your school tomorrow, what would it be?
8. What tools do you pay for today (content, ERP, LMS, test platforms)? Roughly what do they cost per student or per year? What do teachers actually use, and what sits unused?

8a. Have you evaluated **LEAD, Extramarks, Next Education or Toddle**? What made you choose or reject them, and roughly what were you quoted?
8b. Do you already have **interactive panels or an ERP**? Which ones? (Vidya should work alongside them.)

**C. Decision and money (6 min)**
9. If a tool like this were adopted, who would **suggest** it, who would **approve** it, and who would **sign** the payment?
10. When in the year are such decisions made? (Expect Jan–Mar for an April start; verify.)
11. *Price ranges, asked without anchoring a number:*
    - At what price per student per year would this be **so cheap you'd doubt the quality**?
    - At what price would it be **a bargain**?
    - At what price would it start to feel **expensive, but still worth considering**?
    - At what price would it be **too expensive to consider**?
12. Would parents be asked to pay any part of it? How do parents react to tech fees?

**D. Trust (3 min)**
13. What would you need to know about **student data** before allowing a platform: where it's stored, who sees it, the DPDP Act?
14. Would teachers accept AI suggestions in marking or doubt-answering? Where is the line?

**E. Close (3 min)**
15. Show the review app for 3 minutes: the teacher IA register and one topic page. Ask: "What is wrong or missing?"
16. "Would you consider a 90-day pilot from February with Class 9 Maths and Science? What would make that a yes or a no?"
17. "Who else should I talk to?" (Referral to another school or group.)

## 4. Note template (one per conversation)

| Field | Entry |
|---|---|
| School / city / fee band / students in Classes 6–10 | |
| People met (role only) | |
| Current IA / periodic-test tool | |
| Teacher hours per month on papers and marking (stated) | |
| Top pain in their words (quote) | |
| Tools paid for today + cost | |
| Decision path (suggests → approves → signs) | |
| Price answers (too cheap / bargain / expensive / too expensive) | |
| Data/trust concerns | |
| Pilot interest (No / Maybe / Yes + conditions) | |
| Referral | |

After 20 conversations Claude will synthesise these into: a pain ranking, an acceptable price range per segment, the actual buyer path, and the go/no-go on the wedge.

**Signals that the wedge is wrong:** fewer than 1 in 4 schools name assessment or IA admin as a top-3 pain; or price answers cluster below what hosting plus content review costs; or nobody will commit to a pilot even for free.

---

## 5. Pilot one-pager (hand this to interested schools)

> ### Vidya pilot for CBSE schools · Feb–Apr 2027
> **What it is:** daily 10-minute practice, CBSE-format periodic tests, a ready internal-assessment register (best 2 of 3 calculated for you), short tutor videos per topic, and a private doubt box. Class 9 Mathematics and Science.
>
> **What your school gets**
> - A baseline diagnostic in week 1 and a post-test in week 12, with a report on how much each section improved
> - Teacher time saved on paper setting and marking, measured, not estimated
> - The IA register for the pilot period, exportable to Excel
> - Onboarding in under one day; we upload the student list for you (names and class only)
>
> **What we ask of you**
> - One coordinator as the point of contact; 2–4 participating teachers
> - 15 minutes of teacher feedback every two weeks
> - Permission to use **anonymised, aggregated** results in a case study (optional)
>
> **Data and safety:** your school owns the data. No ads, no data sales, no public rankings. Data stored in India. Accounts are issued by the school; children cannot sign up on their own. A data-processing agreement is signed before any student data is uploaded.
>
> **Cost:** *[to be set after the interviews; options being tested: free pilot with an agreed price for 2027-28, or a reduced pilot fee credited against the first year]*
>
> **What we don't promise:** guaranteed marks or ranks. We measure learning and report it honestly, including if it doesn't move.

---

## 6. Pilot measurement plan (summary of master prompt §26 and §39)

| Week | Activity | Measure |
|---|---|---|
| 0 | Teacher onboarding (90 min); student accounts | Setup time per school |
| 1 | Baseline diagnostic (Class 9 Maths + Science, 30 Qs each) | Baseline score by topic |
| 1–12 | Daily practice, 1 periodic test, doubts, 2–3 live sessions | Weekly active %, practice minutes, doubt response time |
| 6 | Mid-pilot teacher feedback | Hours saved (teacher log), satisfaction |
| 12 | Post-test (parallel form of the baseline) | Change vs baseline; if a comparison section exists, difference-in-differences |
| 14 | Retention check (short re-test) | How much stayed |
| 14 | Report to school + renewal conversation | Conversion to paid |

**Honesty rule:** with a single school and no comparison group, results are reported as **pre/post change, not proof of impact**. Causal claims need a comparison section or a multi-school design.
