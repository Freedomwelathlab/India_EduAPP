import { PageHead } from '@/components/ui';
import { DOUBTS, SESSIONS, fmtDate } from '@/lib/demo';

export const metadata = { title: 'Live sessions' };

export default function TeacherSessions() {
  return (
    <>
      <PageHead title="Live clarification sessions" sub="Embed your school's Meet, Zoom or Jitsi link. Joining needs a school login. Chat is moderated. Recording needs consent." right={<button className="btn">+ Schedule session</button>} />
      <div className="grid g2" style={{ alignItems: 'start' }}>
        <div className="card stack">
          <h2>New session</h2>
          <label className="small"><b>Type</b><select className="in"><option>Pre-test revision</option><option>Topic clinic</option><option>Small-group help (from remediation group)</option></select></label>
          <label className="small"><b>Topic</b><select className="in"><option>Class 9 · Zeros of a linear polynomial</option></select></label>
          <div className="grid g2"><label className="small"><b>Date & time</b><input className="in" type="datetime-local" defaultValue="2026-10-14T16:00" /></label>
            <label className="small"><b>Capacity</b><input className="in" type="number" defaultValue={40} /></label></div>
          <label className="small"><b>Meeting link</b><input className="in" placeholder="https://meet.google.com/…" /></label>
          <label className="row small"><input type="checkbox" /> Record (only if parent consent is on file for all attendees)</label>
          <p className="small muted">Policy default: no 1:1 private session between a staff member and a student unless a second adult attends or the session is recorded.</p>
          <button className="btn" disabled>Create (demo)</button>
        </div>
        <div className="stack">
          {SESSIONS.map((s) => (
            <div key={s.id} className="card">
              <div className="row between"><b>{s.title}</b><span className={`chip ${s.status === 'completed' ? 'ok' : 'info'}`}>{s.status}</span></div>
              <p className="small muted">{fmtDate(s.startsAt)} · {s.sections.join(', ')} · {s.enrolled}/{s.capacity}</p>
              {s.status === 'scheduled' && s.topicIds.length > 0 && (
                <p className="small" style={{ marginTop: 6 }}>Top voted doubts: {DOUBTS.filter((d) => s.topicIds.includes(d.topicId) && d.status === 'open').sort((a, b) => b.votes - a.votes).slice(0, 2).map((d) => `"${d.body}"`).join(' · ') || 'none yet'}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
