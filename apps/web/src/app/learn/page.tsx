import Link from 'next/link';
import { findTopic } from '@ieos/curriculum';
import { recommend, type TopicState } from '@ieos/learning-engine';
import { MasteryBar, PageHead, SubjectIcon, subjectSlug } from '@/components/ui';
import { CLASS_9A, ME, SESSIONS, TESTS, fmtDate, masteryOf, subjectsForGrade } from '@/lib/demo';

export const metadata = { title: 'Today' };

const ACTION_LABEL = { learn_prerequisite: 'Strengthen first', watch_video: 'Watch & check', practise: 'Practise', revise: 'Quick revision', stretch: 'Stretch challenge', teacher_intervention: '' } as const;

export default function Today() {
  const me = CLASS_9A.find((s) => s.id === ME.id)!;
  const states: TopicState[] = [
    { topicId: 'g9m-c2-t1', topicTitle: 'Zeros of a linear polynomial', mastery: masteryOf(me.history), attempts: me.history.length, lastPractisedDaysAgo: 1, prerequisites: [], topMisconception: 'sign errors when moving the constant term across "=".', hasVideo: true },
    { topicId: 'g9s-c4-t1', topicTitle: 'Uniform acceleration', mastery: 0.25, attempts: 0, lastPractisedDaysAgo: null, prerequisites: [], hasVideo: true },
    { topicId: 'g9m-c8-t1', topicTitle: 'Arithmetic progressions', mastery: 0.93, attempts: 14, lastPractisedDaysAgo: 18, prerequisites: [], hasVideo: false },
  ];
  const plan = recommend(states).filter((r) => r.audience === 'student').slice(0, 3);
  const nextTest = TESTS.find((t) => t.status === 'upcoming');
  const nextSession = SESSIONS.find((s) => s.status === 'scheduled');

  return (
    <>
      <PageHead title={`Good afternoon, ${ME.name.split(' ')[0]} 👋`} sub="Here is your plan for today. About 15 minutes." />

      <div className="grid g2">
        <div className="card">
          <h2>Today's plan</h2>
          <div className="stack">
            {plan.map((r, i) => {
              const t = findTopic(r.topicId)!;
              return (
                <Link key={r.topicId} href={`/learn/topic/${r.topicId}`} className="card flat card-link" style={{ padding: 14 }}>
                  <div className="row between">
                    <span className="row"><b>{i + 1}.</b><span className={`chip ${t.subject.subject === 'MATH' ? 'ma' : 'sc'}`}>{t.subject.name}</span><b>{t.topic.title}</b></span>
                    <span className="chip info">{ACTION_LABEL[r.action]}</span>
                  </div>
                  <p className="small muted" style={{ marginTop: 6 }}>Why: {r.because}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="stack">
          {nextTest && (
            <div className="card">
              <div className="row between"><h3>Coming up</h3><span className="chip warn">in 7 days</span></div>
              <p><b>{nextTest.title}</b> · Mathematics</p>
              <p className="small muted">{new Date(nextTest.date).toDateString()} · Counts towards Internal Assessment (best 2 of 3)</p>
              <MasteryBar belief={masteryOf(me.history)} label="Readiness: Polynomials" />
            </div>
          )}
          {nextSession && (
            <div className="card">
              <h3>Next live session</h3>
              <p><b>{nextSession.title}</b></p>
              <p className="small muted">{fmtDate(nextSession.startsAt)} · {nextSession.teacher} · {nextSession.enrolled}/{nextSession.capacity} joined</p>
              <Link href="/learn/sessions" className="btn sm" style={{ marginTop: 10 }}>View sessions</Link>
            </div>
          )}
        </div>
      </div>

      <div className="section">
        <h2>My subjects · Class {ME.grade}</h2>
        <div className="grid g2">
          {subjectsForGrade(ME.grade).map((s) => (
            <Link key={s.id} href={`/learn/${s.grade}/${subjectSlug(s.subject)}`} className="card card-link row">
              <SubjectIcon subject={s.subject} />
              <span style={{ flex: 1 }}>
                <b style={{ fontSize: '1.1rem' }}>{s.name}</b><br />
                <span className="small muted">NCERT {s.textbook} · {s.units.length} units · {s.units.reduce((n, u) => n + u.chapters.length, 0)} chapters</span>
              </span>
              <span className="chip">CBSE 2026-27</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
