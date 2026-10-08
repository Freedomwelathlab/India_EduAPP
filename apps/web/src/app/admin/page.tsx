import { CBSE_2026_27, CBSE_2026_27_SUBJECTS, theoryMarksTotal, validatePrerequisites } from '@ieos/curriculum';
import { SEED_QUESTIONS } from '@ieos/assessment';
import { PageHead, Stat } from '@/components/ui';
import { VIDEOS } from '@/lib/demo';

export const metadata = { title: 'Super admin' };

export default function Admin() {
  const prereq = validatePrerequisites(CBSE_2026_27_SUBJECTS);
  return (
    <>
      <PageHead title="Curriculum & content" sub="Versioned curriculum, the content review pipeline and integrity checks" />
      <div className="grid g4">
        <Stat value="1" label="board · CBSE" />
        <Stat value={CBSE_2026_27.academicYear} label="active curriculum version" />
        <Stat value={SEED_QUESTIONS.length} label="questions (all draft)" tone="warn" />
        <Stat value={VIDEOS.length} label="videos (published + in review)" />
      </div>

      <div className="card section">
        <h2>Curriculum versions</h2>
        <div className="table-wrap"><table className="t">
          <thead><tr><th>Subject</th><th>Textbook</th><th className="num">Units</th><th className="num">Chapters</th><th className="num">Theory marks</th><th>Source tier</th><th>Integrity</th></tr></thead>
          <tbody>{CBSE_2026_27_SUBJECTS.map((s) => {
            const total = theoryMarksTotal(s);
            const tier = Math.min(...s.sources.map((x) => x.tier));
            return (
              <tr key={s.id}><td><b>Class {s.grade} {s.name}</b><br /><span className="small muted">{s.id}</span></td><td>{s.textbook}</td>
                <td className="num">{s.units.length}</td><td className="num">{s.units.reduce((n, u) => n + u.chapters.length, 0)}</td>
                <td className="num">{total ?? 'school-set'}</td>
                <td><span className={`chip ${tier === 1 ? 'ok' : 'warn'}`}>Tier {tier}</span></td>
                <td>{total === undefined || total === 80 ? <span className="chip ok">✓</span> : <span className="chip bad">marks ≠ 80</span>}</td></tr>
            );
          })}</tbody>
        </table></div>
        <p className="small muted" style={{ marginTop: 8 }}>Prerequisite graph: {prereq.length === 0 ? 'valid, no cycles' : prereq.join('; ')}</p>
      </div>

      <div className="card section">
        <h2>Content review queue</h2>
        <p className="small muted" style={{ marginBottom: 10 }}>Draft → AI-assisted → Expert review → Assessment review → Accessibility → Licence check → Publish</p>
        <div className="table-wrap"><table className="t">
          <thead><tr><th>ID</th><th>Class · Subject</th><th>Type</th><th>Source / licence</th><th>Author</th><th>Status</th></tr></thead>
          <tbody>{SEED_QUESTIONS.map((q) => (
            <tr key={q.id}><td><code>{q.id}</code></td><td>{q.grade} · {q.subject}</td><td>{q.type}</td><td>{q.provenance.source} / {q.provenance.licence}</td><td className="small">{q.provenance.author}</td>
              <td><span className="chip warn">{q.provenance.reviewStatus}</span></td></tr>
          ))}</tbody>
        </table></div>
      </div>
    </>
  );
}
