import Link from 'next/link';
import { recommend, toScore } from '@ieos/learning-engine';
import { PageHead, Stat, level } from '@/components/ui';
import { CLASS_9A, DOUBTS, masteryOf } from '@/lib/demo';

export const metadata = { title: 'Class dashboard' };

const TOPICS = ['Number System', 'Zeros of a linear polynomial', 'Arithmetic progressions', 'Algebraic identities', 'Linear eqns in 2 vars'];

export default function TeacherHome() {
  // Mastery on the live topic comes from each student's real answer history (BKT); the other columns are illustrative.
  const rows = CLASS_9A.map((s, i) => ({
    ...s,
    cells: TOPICS.map((_, j) => (j === 1 ? masteryOf(s.history) : Math.min(0.97, Math.max(0.12, (s.theory / 80) + ((i * 7 + j * 13) % 20 - 10) / 100)))),
  }));
  const alerts = CLASS_9A.flatMap((s) =>
    recommend([{ topicId: 'g9m-u2-c1-t1', topicTitle: 'Zeros of a linear polynomial', mastery: masteryOf(s.history), attempts: s.history.length, lastPractisedDaysAgo: 1, prerequisites: [], topMisconception: 'sign error when solving 3x − 6 = 0', hasVideo: true }])
      .filter((r) => r.audience === 'teacher').map((r) => ({ ...r, name: s.name })),
  );
  const open = DOUBTS.filter((d) => d.status === 'open');
  const weak = rows.filter((r) => r.cells[1]! < 0.5);

  return (
    <>
      <PageHead title="Class 9A · Mathematics" sub="Chapter in progress: Introduction to Polynomials · PT-2 on 15 Oct" right={<Link href="/teacher/tests" className="btn">Build PT-2 paper</Link>} />
      <div className="grid g4">
        <Stat value={`${CLASS_9A.length}`} label="students (demo; a real section has ~40)" />
        <Stat value={`${Math.round(rows.reduce((n, r) => n + toScore(r.cells[1]!), 0) / rows.length)}%`} label="class mastery: current topic" />
        <Stat value={open.length} label="open doubts" tone={open.length > 3 ? 'warn' : undefined} />
        <Stat value={alerts.length} label="students need you (not just practice)" tone={alerts.length ? 'bad' : 'ok'} />
      </div>

      <div className="grid g2 section" style={{ alignItems: 'start' }}>
        <div className="card">
          <h2>Mastery heat map</h2>
          <div className="table-wrap"><table className="t">
            <thead><tr><th>Student</th>{TOPICS.map((t) => <th key={t} style={{ whiteSpace: 'normal', minWidth: 70 }}>{t}</th>)}</tr></thead>
            <tbody>{rows.map((r) => (
              <tr key={r.id}><td style={{ whiteSpace: 'nowrap' }}>{r.name}</td>
                {r.cells.map((c, j) => { const s = toScore(c); return <td key={j}><div className={`cell lvl-${level(s)}`}>{s}</div></td>; })}
              </tr>
            ))}</tbody>
          </table></div>
        </div>
        <div className="stack">
          <div className="card stack">
            <h2>Needs your attention</h2>
            {alerts.map((a) => (
              <div key={a.name} className="card flat" style={{ padding: 12 }}>
                <b>{a.name}</b><p className="small muted">{a.because}</p>
              </div>
            ))}
            <p className="small muted">These alerts are visible to staff only and are never shown to students. You decide the action.</p>
          </div>
          <div className="card">
            <h3>Suggested remediation group</h3>
            <p className="small">{weak.map((w) => w.name).join(', ')}: below 50% on <i>Zeros of a linear polynomial</i>.</p>
            <Link href="/teacher/sessions" className="btn sm" style={{ marginTop: 10 }}>Schedule a 30-min small-group session</Link>
          </div>
        </div>
      </div>
    </>
  );
}
