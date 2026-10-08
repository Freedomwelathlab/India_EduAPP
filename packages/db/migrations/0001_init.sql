-- India Education OS — initial schema (PostgreSQL 15+ / Supabase)
-- Tenancy: organisation → school → academic_year. Every tenant row carries
-- organisation_id + school_id and is protected by RLS. Platform content
-- (curriculum, platform questions/videos) has school_id NULL.
-- Audit fields on every table: created_at, created_by, updated_at, updated_by.

create extension if not exists pgcrypto;

-- ───────────── helpers ─────────────
create or replace function app_school_ids() returns uuid[] language sql stable as $$
  select coalesce(array_agg(school_id), '{}') from membership where user_id = auth.uid()
$$;
create or replace function app_has_role(r text, sch uuid) returns boolean language sql stable as $$
  select exists(select 1 from membership where user_id = auth.uid() and school_id = sch and role = r)
$$;

-- ───────────── tenancy & people ─────────────
create table organisation (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(), created_by uuid, updated_at timestamptz, updated_by uuid
);
create table school (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references organisation(id),
  name text not null,
  board text not null check (board in ('CBSE')),             -- V1: CBSE only
  affiliation_no text,
  state_code text not null,
  data_region text not null default 'IN',
  created_at timestamptz not null default now(), created_by uuid, updated_at timestamptz, updated_by uuid
);
create table academic_year (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references school(id),
  label text not null,                                        -- '2026-27'
  starts_on date not null, ends_on date not null,
  curriculum_version_id text not null,                        -- 'CBSE:2026-27'
  scoring_policy_id text not null,
  unique (school_id, label)
);
create table app_user (
  id uuid primary key,                                        -- = auth.users.id
  display_name text not null,
  -- No Aadhaar / APAAR stored by default (master prompt §32; SC order 20-07-2026).
  locale text not null default 'en-IN',
  created_at timestamptz not null default now()
);
create table membership (
  user_id uuid not null references app_user(id),
  organisation_id uuid not null references organisation(id),
  school_id uuid not null references school(id),
  role text not null check (role in ('org_admin','school_admin','principal','academic_coordinator','teacher','student','guardian','counsellor')),
  primary key (user_id, school_id, role)
);
create table section (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null, school_id uuid not null references school(id),
  academic_year_id uuid not null references academic_year(id),
  grade smallint not null check (grade between 6 and 10),
  name text not null,                                         -- '9A'
  unique (academic_year_id, grade, name)
);
create table enrolment (
  student_id uuid not null references app_user(id),
  section_id uuid not null references section(id),
  organisation_id uuid not null, school_id uuid not null,
  roll_no text,
  primary key (student_id, section_id)
);
create table teaching_assignment (
  teacher_id uuid not null references app_user(id),
  section_id uuid not null references section(id),
  subject text not null check (subject in ('MATH','SCI')),
  organisation_id uuid not null, school_id uuid not null,
  primary key (teacher_id, section_id, subject)
);
create table guardianship (
  guardian_id uuid not null references app_user(id),
  student_id uuid not null references app_user(id),
  school_id uuid not null,
  relationship text not null,
  verified_at timestamptz,                                    -- verifiable parental consent (DPDP Rule 10)
  primary key (guardian_id, student_id)
);

-- ───────────── curriculum (platform-owned, versioned) ─────────────
create table curriculum_version (
  id text primary key, board text not null, academic_year text not null,
  effective_from date not null, superseded_on date, sources jsonb not null default '[]'
);
create table curriculum_node (
  id text primary key,
  version_id text not null references curriculum_version(id),
  kind text not null check (kind in ('subject','unit','chapter','topic')),
  parent_id text references curriculum_node(id),
  grade smallint not null, subject text not null,
  title text not null, position int not null,
  theory_marks smallint, periods smallint,
  assessment_scope text not null default 'summative' check (assessment_scope in ('summative','formative_only')),
  levels text[] not null default '{standard}',
  competency_codes text[] not null default '{}',
  learning_outcomes text[] not null default '{}',
  confidence text not null check (confidence in ('high','medium','low'))
);
create index on curriculum_node (version_id, grade, subject, kind);
create table concept_link (                                   -- many-to-many "related", never "identical"
  node_id text not null references curriculum_node(id),
  canonical_concept_id text not null,
  primary key (node_id, canonical_concept_id)
);
create table prerequisite (
  topic_id text not null references curriculum_node(id),
  requires_topic_id text not null references curriculum_node(id),
  primary key (topic_id, requires_topic_id),
  check (topic_id <> requires_topic_id)
);

-- ───────────── content ─────────────
create table licence_record (
  id uuid primary key default gen_random_uuid(),
  holder text not null, terms text not null, expires_on date, evidence_url text
);
create table question (
  id text primary key,
  school_id uuid references school(id),                       -- NULL = platform bank
  topic_id text not null references curriculum_node(id),
  current_version int not null default 1
);
create table question_version (
  question_id text not null references question(id),
  version int not null,
  type text not null check (type in ('mcq','assertion_reason','numeric','case_based','short_answer','long_answer')),
  level text not null check (level in ('standard','advanced','basic')),
  body jsonb not null,                                        -- stem, context, options (+misconceptions)
  answer_key jsonb not null,                                  -- NEVER exposed via student-facing views
  explanation jsonb not null,
  cognitive text not null, difficulty_tier smallint not null check (difficulty_tier between 1 and 10),
  marks numeric(4,1) not null, negative_marks numeric(4,1) not null default 0, expected_seconds int not null,
  source text not null, licence_id uuid references licence_record(id),
  review_status text not null check (review_status in ('draft','ai_assisted','expert_reviewed','assessment_reviewed','published','retired')),
  ai_model_version text, author_id uuid, reviewer_id uuid,
  change_reason text, effective_from timestamptz not null default now(),
  primary key (question_id, version)
);

-- ───────────── assessment ─────────────
create table assessment_blueprint (
  id text primary key, school_id uuid references school(id), version_id text not null,
  spec jsonb not null, created_at timestamptz not null default now(), created_by uuid
);
create table assessment (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null, school_id uuid not null references school(id),
  academic_year_id uuid not null references academic_year(id),
  kind text not null check (kind in ('daily_practice','mini_test','chapter_test','periodic_test','half_yearly','pre_board','annual','board_mock','remedial','diagnostic')),
  ia_component text check (ia_component in ('periodic','multiple','portfolio','enrichment')),
  blueprint_id text references assessment_blueprint(id),
  title text not null,
  opens_at timestamptz, closes_at timestamptz,
  released_at timestamptz,                                    -- secure release window (§34)
  status text not null default 'draft' check (status in ('draft','validated','released','closed','moderated')),
  created_at timestamptz not null default now(), created_by uuid
);
create table assessment_item (
  assessment_id uuid not null references assessment(id),
  question_id text not null, question_version int not null,
  section_id text not null, position int not null,
  primary key (assessment_id, position),
  foreign key (question_id, question_version) references question_version(question_id, version)
);
create table attempt (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null, school_id uuid not null,
  assessment_id uuid not null references assessment(id),
  student_id uuid not null references app_user(id),
  started_at timestamptz not null default now(), submitted_at timestamptz,
  unique (assessment_id, student_id)
);
create table answer (
  attempt_id uuid not null references attempt(id),
  position int not null,
  response jsonb not null,
  awarded numeric(4,1), auto_marked boolean not null,
  misconception text, seconds_taken int,
  primary key (attempt_id, position)
);
create table marking_event (                                  -- subjective marking + moderation trail
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null, position int not null,
  marker_id uuid not null, marks numeric(4,1) not null, rubric_scores jsonb, comment text,
  ai_suggested boolean not null default false, at timestamptz not null default now()
);
create table ia_record (                                      -- CBSE IA register
  organisation_id uuid not null, school_id uuid not null,
  academic_year_id uuid not null, student_id uuid not null, subject text not null,
  component text not null check (component in ('periodic','multiple','portfolio','enrichment')),
  evidence jsonb not null default '[]', fraction numeric(4,3) check (fraction between 0 and 1),
  updated_at timestamptz not null default now(), updated_by uuid,
  primary key (academic_year_id, student_id, subject, component)
);

-- ───────────── learning ─────────────
create table mastery_state (
  organisation_id uuid not null, school_id uuid not null,
  student_id uuid not null, topic_id text not null,
  belief numeric(5,4) not null check (belief between 0 and 0.99),
  attempts int not null default 0, last_practised_at timestamptz,
  primary key (student_id, topic_id)
);
create table recommendation (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null, student_id uuid not null, topic_id text not null,
  action text not null, because text not null,
  audience text not null check (audience in ('student','teacher')),
  created_at timestamptz not null default now(), dismissed_by uuid
);

-- ───────────── tutor videos & clarification ─────────────
create table video (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references school(id),                       -- NULL = platform library
  topic_id text not null references curriculum_node(id),
  language text not null default 'en', title text not null, duration_s int not null,
  source_type text not null check (source_type in ('platform','school','licensed','diksha_link')),
  licence_id uuid references licence_record(id),
  provider_asset_id text, transcript_url text, captions_url text not null,
  status text not null check (status in ('draft','in_review','published','retired')),
  reviewed_by uuid, published_at timestamptz, created_at timestamptz not null default now(), created_by uuid
);
create table video_question (video_id uuid references video(id), question_id text references question(id), position int, primary key (video_id, position));
create table video_view (
  id uuid primary key default gen_random_uuid(), school_id uuid not null,
  student_id uuid not null, video_id uuid not null references video(id),
  watched_s int not null, completed boolean not null, created_at timestamptz not null default now()
);
create table doubt (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null, school_id uuid not null,
  student_id uuid not null, topic_id text not null,
  question_id text, video_id uuid, video_ts int,
  body text not null,
  status text not null default 'open' check (status in ('open','ai_suggested','answered','faq','closed')),
  sla_due_at timestamptz not null, created_at timestamptz not null default now()
);
create table doubt_answer (
  id uuid primary key default gen_random_uuid(), doubt_id uuid not null references doubt(id),
  author_id uuid, author_type text not null check (author_type in ('teacher','ai')),
  body text not null, ai_model_version text, approved_by uuid,
  created_at timestamptz not null default now(),
  check (author_type = 'teacher' or ai_model_version is not null)
);
create table clarification_session (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null, school_id uuid not null,
  type text not null check (type in ('topic_clinic','pre_test_revision','remedial_group')),
  grade smallint not null, subject text not null, section_ids uuid[] not null,
  teacher_id uuid not null, starts_at timestamptz not null, ends_at timestamptz not null,
  capacity int not null, meeting_url text not null,
  recording_url text, recording_consent boolean not null default false,
  summary text, status text not null default 'scheduled',
  check (ends_at > starts_at)
);
create table session_topic (session_id uuid references clarification_session(id), topic_id text, primary key (session_id, topic_id));
create table session_attendance (session_id uuid references clarification_session(id), student_id uuid, joined_at timestamptz, left_at timestamptz, primary key (session_id, student_id));

-- ───────────── trust & governance ─────────────
create table consent (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null, student_id uuid not null, guardian_id uuid,
  purpose text not null, notice_version text not null,
  granted boolean not null, granted_at timestamptz not null default now(), withdrawn_at timestamptz,
  method text not null                                        -- e.g. 'school_collected', 'digilocker_verified'
);
create table privacy_request (
  id uuid primary key default gen_random_uuid(), school_id uuid not null,
  requester_id uuid not null, subject_id uuid not null,
  kind text not null check (kind in ('access','correction','erasure','grievance','nomination')),
  status text not null default 'open', due_at timestamptz not null, closed_at timestamptz
);
create table ai_interaction (
  id uuid primary key default gen_random_uuid(), school_id uuid,
  user_id uuid not null, feature text not null,
  model_version text not null, prompt_version text not null,
  input_hash text not null, output jsonb not null, safety_flags text[] not null default '{}',
  created_at timestamptz not null default now()
);
create table audit_event (
  seq bigserial primary key,
  at timestamptz not null default now(),
  tenant_id uuid, actor_id uuid not null,
  action text not null, target text not null, detail jsonb not null default '{}',
  prev_hash text not null, hash text not null
);
create table feature_flag (key text primary key, enabled boolean not null, school_ids uuid[]);

-- Hash chain: each row commits to the previous one (verified app-side in packages/db/src/audit.ts).
create or replace function audit_chain() returns trigger language plpgsql as $$
begin
  select coalesce((select hash from audit_event order by seq desc limit 1), repeat('0',64)) into new.prev_hash;
  new.hash := encode(digest(concat_ws('|', new.at, new.tenant_id, new.actor_id, new.action, new.target, new.detail::text, new.prev_hash), 'sha256'), 'hex');
  return new;
end $$;
create trigger audit_chain before insert on audit_event for each row execute function audit_chain();
revoke update, delete on audit_event from public;

-- ───────────── RLS (deny by default) ─────────────
do $$ declare t text; begin
  foreach t in array array['section','enrolment','teaching_assignment','assessment','attempt','ia_record','mastery_state','doubt','clarification_session','consent','privacy_request'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy tenant_read on %I for select using (school_id = any(app_school_ids()))', t);
  end loop;
end $$;
-- Students see only their own attempts / mastery / doubts; guardians only verified children.
create policy own_attempts on attempt for select using (
  student_id = auth.uid()
  or exists (select 1 from guardianship g where g.guardian_id = auth.uid() and g.student_id = attempt.student_id and g.verified_at is not null)
  or app_has_role('teacher', school_id) or app_has_role('principal', school_id) or app_has_role('academic_coordinator', school_id)
);
-- Answer keys are reachable only through staff views; students read questions via a key-stripped view.
create view student_question as
  select qv.question_id, qv.version, qv.type, qv.level, qv.body - 'misconceptions' as body, qv.marks, qv.expected_seconds
  from question_version qv where qv.review_status = 'published';
