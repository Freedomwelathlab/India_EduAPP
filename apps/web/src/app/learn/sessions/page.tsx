import { PageHead } from '@/components/ui';
import { SESSIONS, fmtDate } from '@/lib/demo';

export const metadata = { title: 'Live sessions' };

const TYPE = { topic_clinic: ['Topic clinic', 'info'], pre_test_revision: ['Pre-test revision', 'warn'], remedial_group: ['Small-group help', 'ok'] } as const;

export default function Sessions() {
  const upcoming = SESSIONS.filter((s) => s.status === 'scheduled');
  const past = SESSIONS.filter((s) => s.status === 'completed');
  return (
    <>
      <PageHead title="Live clarification sessions" sub="Run by your school's teachers. You join with your school account only. Sessions are recorded only with consent." />
      <div className="stack">
        {upcoming.map((s) => (
          <div key={s.id} className="card row between">
            <div className="stack" style={{ gap: 4 }}>
              <div className="row"><span className={`chip ${TYPE[s.type][1]}`}>{TYPE[s.type][0]}</span><span className={`chip ${s.subject === 'MATH' ? 'ma' : 'sc'}`}>Class {s.grade} {s.subject === 'MATH' ? 'Maths' : 'Science'}</span></div>
              <b style={{ fontSize: '1.05rem' }}>{s.title}</b>
              <span className="small muted">{fmtDate(s.startsAt)} · {s.durationMin} min · {s.teacher} · sections {s.sections.join(', ')}</span>
              <span className="small muted">{s.enrolled}/{s.capacity} joined · Vote for doubts to discuss before the session</span>
            </div>
            <div className="row"><button className="btn ghost sm">Add a doubt</button><button className="btn sm">Reserve seat</button></div>
          </div>
        ))}
      </div>
      <div className="section">
        <h2>Past sessions</h2>
        {past.map((s) => (
          <div key={s.id} className="card row between">
            <div><b>{s.title}</b><p className="small muted">{fmtDate(s.startsAt)} · {s.teacher}</p></div>
            {s.recording && <button className="btn ghost sm">▶ Watch recording · summary</button>}
          </div>
        ))}
      </div>
    </>
  );
}
