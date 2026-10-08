# Module Design — Tutor Videos & Clarification Sessions ("Learn Live")

**Status:** v1 design · 2026-10-08 · requested by the founder
**Scope:** every Class (6–10) × Subject (Maths, Science) × Chapter × Topic

Format: WHY → WHO → VALUE → HOW → COST → RISK → KPI (master prompt §61).

## 1. Why
- Today a student who is stuck after school has three options: wait for the next class, ask a parent who may not know the topic, or pay for coaching. The PARAKH 2024 drop from Class 3 to Class 9 (see `research/00`) is what happens when doubts pile up.
- Teachers answer the same doubt 30 times. One recorded explanation, plus a scheduled live slot for the doubts that remain, saves teacher time and reaches every student.

## 2. Who
| Role | Uses it to |
|---|---|
| Student | Watch the topic video, ask a doubt, join a live clarification session, rewatch the recording |
| Teacher / Tutor | Publish or approve videos, answer doubts, run sessions, convert repeated doubts into FAQs |
| Academic coordinator | Schedule sessions across sections, check coverage (which topics have no video yet) |
| Parent | See which videos the child watched and which doubts were resolved (no content, just status) |
| Content reviewer | Approve platform-library videos before publication (content-governance gate, §50) |

## 3. Value
- **Student:** a 3–8 minute explanation exists for every topic, plus a guaranteed human answer route.
- **Teacher:** doubts arrive grouped and ranked. The same 30 questions become one FAQ.
- **School:** a coverage dashboard shows "Video ✓ / Practice ✓ / Session held ✓" per topic.

## 4. How — the three building blocks

### 4.1 Topic Video Library
- **Unit = one video per topic.** The shelf for Class 9 › Maths › Polynomials › *Zeros of a linear polynomial* has 1 primary video, plus optional alternates (a different language or a slower pace).
- **Sources (provenance tag required):**
  1. `platform` — produced by us. **Default production pipeline:** a scripted Remotion explainer with an edge-tts voice-over and a teacher review. This reuses the founder's existing free Remotion/edge-tts pipeline.
  2. `school` — recorded by the school's own teacher (screen recording or phone). Visible only inside that school (tenant-scoped).
  3. `licensed` — third-party content with a stored licence record.
  4. `diksha_link` — a link out to an official DIKSHA resource (never re-hosted).
- **Metadata:** canonical topic ID, board/version, language, duration, transcript, captions (required), chapter markers, linked questions, reviewer, licence, status (`draft → in_review → published → retired`).
- **Hosting:** video files sit in object storage behind a CDN, with HLS adaptive bitrate and a **low-data rendition (240p + audio-only)**. In V1 an external provider (Mux, Cloudflare Stream or Bunny) is cheaper than building our own. *(DECISION PENDING: cost comparison in the FinOps model.)*
- **Pedagogy rules:** each video ends with **2 check-your-understanding questions** (retrieval practice). A wrong answer offers "Ask a doubt" or "Watch the worked example". Watch-only time does **not** count as mastery.

### 4.2 Doubt Box (asynchronous clarification)
- A student posts a doubt **pinned to a topic** (and optionally to a question or a video timestamp).
- **Optional AI first answer:** grounded in our own approved explanations for that topic, clearly labelled "AI suggestion — your teacher will confirm". AI is off by default for Classes 6–8 until the AI safety gate passes. *(Master prompt §9.)*
- **Teacher queue:** grouped by topic and similarity, oldest first, with SLA badges (default: answered within 24 school hours).
- **Promote to FAQ:** one click turns an answered doubt into a topic FAQ that every student can see.
- **Safety:** doubts are visible only to the student, their teachers and authorised reviewers. No student-to-student DMs. Profanity and safety filters apply, with escalation to a human (master prompt §31).

### 4.3 Live Clarification Sessions (synchronous)
- **Session = Class + Subject + Topic(s) + Section(s) + Teacher + time slot + capacity.**
- **Types:** `topic_clinic` (a scheduled weekly slot per subject), `pre_test_revision` (auto-suggested 2 days before a periodic test), `remedial_group` (auto-formed from students below a mastery threshold on the topic).
- **Pre-session:** students vote on submitted doubts. The teacher sees the top doubts plus class mastery for the topic.
- **Delivery:** V1 embeds the school's existing tool (Google Meet / Zoom / Jitsi link) rather than building video conferencing. *(Build vs buy: buy. WebRTC infrastructure is not a moat.)*
- **Post-session:** recording link (with consent), auto-generated summary (human-approved), linked practice set, and attendance → evidence for "Multiple Assessment" (IA).
- **Child safety:** sessions are created only by staff; join only through an authenticated school account; there is no private 1:1 between a staff member and a minor without a second adult or recording (policy default, configurable by school with justification); chat is moderated; the recording retention policy is set per school.

## 5. Data model (added to the ERD)
```
video(id, tenant_id NULL=platform, canonical_topic_id, curriculum_version_id, language,
      title, duration_s, source_type, licence_id, provider_asset_id, transcript_url,
      captions_url, status, reviewed_by, published_at, retired_at, created_by, created_at)
video_question(video_id, question_id, position)              -- end-of-video checks
video_view(id, tenant_id, student_id, video_id, watched_s, completed, created_at)
doubt(id, tenant_id, student_id, topic_id, question_id NULL, video_id NULL, video_ts NULL,
      body, status[open|ai_suggested|answered|faq|closed], sla_due_at, created_at)
doubt_answer(id, doubt_id, author_id, author_type[teacher|ai], body, ai_model_version NULL,
             approved_by NULL, created_at)
faq(id, tenant_id NULL, topic_id, question, answer, source_doubt_id, status)
clarification_session(id, tenant_id, type, subject_id, class_id, section_ids[], teacher_id,
      starts_at, ends_at, capacity, meeting_url, recording_url NULL, recording_consent,
      summary NULL, status)
session_topic(session_id, topic_id)
session_attendance(session_id, student_id, joined_at, left_at)
session_doubt_vote(session_id, doubt_id, student_id)
```
All tables carry `tenant_id` (school) with row-level security, plus audit fields (§18).

## 6. Screens (built in the app skeleton)
- `/learn/[class]/[subject]/[chapter]/[topic]` → tabs: **Learn (video) · Practise · Ask a doubt · Live sessions**
- `/learn/sessions` → my upcoming and past sessions
- `/teacher/doubts` → doubt queue
- `/teacher/sessions` → schedule and run sessions
- `/school/coverage` → topic × (video, practice, session) heat-map
- `/admin/content/videos` → review queue

## 7. Cost / complexity
| Item | V1 approach | Indicative cost |
|---|---|---|
| Video hosting and streaming | External provider (HLS) | Scales with minutes watched. To be modelled in FinOps (Gate 2); no number quoted until priced. |
| Video production | Remotion + edge-tts (free tools) plus teacher review | Mainly reviewer time. ~200 topics across Classes 6–10 Maths and Science for full V1 coverage (estimate, to be counted from the curriculum graph). |
| Live sessions | Embed Meet/Zoom/Jitsi links | ~0 platform cost |
| Doubt AI first answer | Small model, grounded, cached per topic | Bounded by per-tenant AI quota |

## 8. Risks
| Risk | Mitigation |
|---|---|
| Unreviewed or incorrect videos | Content-governance workflow; nothing is published without reviewer sign-off |
| Copyright (re-uploading coaching or YouTube videos) | Provenance and licence fields are required; uploads by schools are tenant-only and covered by an attestation |
| Child-safety incidents in live sessions | Staff-only creation, authenticated join, moderated chat, recording policy, escalation workflow |
| Teacher overload from doubts | Grouping, FAQ promotion, AI first draft, SLA settings |
| Bandwidth | 240p/audio-only renditions; offline download of video packs (phase 2) |

## 9. KPIs
- Topic coverage: % of topics with a published video (target 100% of V1 topics before pilot)
- **Doubt resolution time** (median) and % within SLA
- **Post-video check accuracy** and the mastery change on the topic within 7 days (learning, not views)
- Session attendance rate; remedial-group mastery gain
- Teacher minutes per resolved doubt (should fall as FAQs accumulate)
