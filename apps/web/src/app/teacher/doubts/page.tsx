import { findTopic } from '@ieos/curriculum';
import { PageHead } from '@/components/ui';
import { DOUBTS } from '@/lib/demo';

export const metadata = { title: 'Doubt queue' };

export default function DoubtQueue() {
  const byTopic = new Map<string, typeof DOUBTS>();
  for (const d of DOUBTS) byTopic.set(d.topicId, [...(byTopic.get(d.topicId) ?? []), d]);
  return (
    <>
      <PageHead title="Doubt queue" sub="Grouped by topic. Oldest first. Target: answered within 24 school hours. Turn repeated doubts into a FAQ in one click." />
      <div className="stack">
        {[...byTopic.entries()].map(([topicId, ds]) => {
          const t = findTopic(topicId)!;
          return (
            <div key={topicId} className="card stack">
              <div className="row between">
                <h2>{t.topic.title} <span className="muted small">· Class {t.subject.grade} {t.subject.name}</span></h2>
                <span className="chip">{ds.filter((d) => d.status === 'open').length} open</span>
              </div>
              {ds.sort((a, b) => b.ageHours - a.ageHours).map((d) => (
                <div key={d.id} className="card flat" style={{ padding: 14 }}>
                  <div className="row between">
                    <span className="small"><b>{d.studentName}</b> · {d.section} · {d.ageHours}h ago · 👍 {d.votes}</span>
                    <span className={`chip ${d.status === 'open' ? (d.ageHours > 24 ? 'bad' : 'warn') : 'ok'}`}>{d.status === 'open' ? (d.ageHours > 24 ? 'SLA overdue' : 'open') : d.status}</span>
                  </div>
                  <p style={{ marginTop: 6 }}>{d.body}</p>
                  {d.answer ? <p className="small" style={{ marginTop: 6, color: 'var(--ink-2)' }}>↳ {d.answer}</p> : (
                    <div className="row" style={{ marginTop: 8 }}>
                      <button className="btn sm">Answer</button>
                      <button className="btn ghost sm">Add to next live session</button>
                      <button className="btn ghost sm" disabled title="AI first drafts are off until the AI safety gate passes">✨ AI draft (off)</button>
                    </div>
                  )}
                  {d.status === 'answered' && <button className="btn ghost sm" style={{ marginTop: 8 }}>Promote to FAQ</button>}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}
