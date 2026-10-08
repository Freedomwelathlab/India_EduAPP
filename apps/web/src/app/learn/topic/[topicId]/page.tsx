import Link from 'next/link';
import { notFound } from 'next/navigation';
import { chapterLabel, findTopic } from '@ieos/curriculum';
import { questionsForTopic, toStudentView } from '@ieos/assessment';
import { QuestionCard } from '@/components/QuestionCard';
import { DoubtForm, Tabs, VideoPlayer } from '@/components/TopicTabs';
import { PageHead, subjectSlug } from '@/components/ui';
import { DOUBTS, SESSIONS, VIDEOS, fmtDate, fmtDur } from '@/lib/demo';

/** One headline line for the video "board" per seeded topic. */
const BOARD_EQ: Record<string, string> = {
  'g6m-c5-t1': '61 = 1 × 61', 'g6s-c4-t1': 'N ⇅ S', 'g7m-p2c2-t1': '(−) × (−) = (+)', 'g7s-c2-t1': 'Turmeric + base → red',
  'g8m-p1c1-t1': '72 = 2³ × 3²', 'g8s-c5-t1': 'Friction opposes motion', 'g9m-c2-t1': 'p(x) = 0 ⇒ x = ?',
  'g9s-c4-t1': 'a = (v − u) / t', 'g10m-c4-t1': 'D = b² − 4ac', 'g10s-c11-t1': '1/R = 1/R₁ + 1/R₂ + 1/R₃',
};

export async function generateMetadata({ params }: { params: Promise<{ topicId: string }> }) {
  const loc = findTopic((await params).topicId);
  return { title: loc ? `${loc.topic.title} · Class ${loc.subject.grade} ${loc.subject.name}` : 'Topic' };
}

export default async function TopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  const loc = findTopic(topicId);
  if (!loc) notFound();
  const { subject, chapter, topic } = loc;
  const video = VIDEOS.find((v) => v.topicId === topicId);
  const questions = questionsForTopic(topicId).map(toStudentView);
  const faqs = DOUBTS.filter((d) => d.topicId === topicId && d.status === 'faq');
  const sessions = SESSIONS.filter((s) => s.topicIds.includes(topicId) && s.status === 'scheduled');
  const slug = subjectSlug(subject.subject);

  return (
    <>
      <PageHead
        crumbs={[
          ['Subjects', '/learn/subjects'],
          [`Class ${subject.grade} ${subject.name}`, `/learn/${subject.grade}/${slug}`],
          [`${chapterLabel(chapter)}: ${chapter.title}`, `/learn/${subject.grade}/${slug}/${chapter.id}`],
        ]}
        title={topic.title}
        sub={<>{topic.learningOutcomes[0] ?? 'Topic'} {topic.levels.includes('advanced') && <span className="chip info">Advanced track available</span>}{topic.assessmentScope === 'formative_only' && <span className="chip warn">Taught and assessed in class, not in the Board exam</span>}</>}
      />
      <Tabs tabs={[
        {
          id: 'learn', label: '🎥 Learn',
          body: video ? (
            <div className="grid g2" style={{ alignItems: 'start' }}>
              <div>
                <VideoPlayer title={video.title} duration={fmtDur(video.durationS)} board={`Class ${subject.grade} · ${subject.name}`} eq={BOARD_EQ[topicId] ?? topic.title}
                  chapters={video.chapters.map((c) => ({ t: fmtDur(c.t), label: c.label }))} />
              </div>
              <div className="card stack">
                <div className="row"><span className={`chip ${video.status === 'published' ? 'ok' : 'warn'}`}>{video.status === 'published' ? 'Reviewed by subject expert' : 'Draft · awaiting expert review'}</span><span className="chip">Captions · EN</span><span className="chip">Low-data 240p</span></div>
                <h3>Video outline</h3>
                <p className="small" style={{ color: 'var(--ink-2)' }}>{video.transcript}</p>
                <p className="small muted">After the video: 2 quick check questions. Watching alone does not count as mastery. Answering does.</p>
              </div>
            </div>
          ) : <p className="muted">Video coming soon for this topic.</p>,
        },
        {
          id: 'practise', label: `✍️ Practise (${questions.length})`,
          body: questions.length ? <div className="stack">{questions.map((q) => <QuestionCard key={q.id} q={q} />)}</div> : <p className="muted">Questions are being written and reviewed for this topic.</p>,
        },
        {
          id: 'doubt', label: '🙋 Ask a doubt',
          body: (
            <div className="grid g2" style={{ alignItems: 'start' }}>
              <div className="card"><DoubtForm topicId={topicId} /></div>
              <div className="card stack">
                <h3>Answered questions on this topic</h3>
                {faqs.length === 0 && <p className="small muted">No FAQs yet. Your teacher turns common doubts into FAQs here.</p>}
                {faqs.map((f) => (
                  <details key={f.id} open>
                    <summary><b>{f.body}</b></summary>
                    <p className="small" style={{ marginTop: 6, color: 'var(--ink-2)' }}>{f.answer}</p>
                    <p className="small muted">Answered by your teacher · {f.votes} students found this helpful</p>
                  </details>
                ))}
              </div>
            </div>
          ),
        },
        {
          id: 'live', label: `📅 Live sessions (${sessions.length})`,
          body: (
            <div className="stack">
              {sessions.length === 0 && <p className="muted">No live session scheduled for this topic yet. <Link href="/learn/sessions">See all sessions</Link></p>}
              {sessions.map((s) => (
                <div key={s.id} className="card row between">
                  <div><b>{s.title}</b><p className="small muted">{fmtDate(s.startsAt)} · {s.durationMin} min · {s.teacher} · {s.enrolled}/{s.capacity} joined</p></div>
                  <button className="btn sm">Reserve a seat</button>
                </div>
              ))}
            </div>
          ),
        },
      ]} />
    </>
  );
}
