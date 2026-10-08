import { CBSE_2026_27_CLASS9, internalAssessment, periodicScore, subjectResult } from '@ieos/assessment';
import { PageHead } from '@/components/ui';
import { CLASS_9A, ME, TESTS } from '@/lib/demo';

export const metadata = { title: 'Tests & results' };

export default function Tests() {
  const me = CLASS_9A.find((s) => s.id === ME.id)!;
  const pol = CBSE_2026_27_CLASS9;
  const periodic = periodicScore(me.pts, pol);
  const ia = internalAssessment({ periodic, multiple: me.multiple, portfolio: me.portfolio, enrichment: me.enrichment }, pol);
  const projected = subjectResult({ theory: me.theory, ia }, pol);

  return (
    <>
      <PageHead title="Tests & results" sub="Class 9 · CBSE 2026-27 scheme: annual exam 80 + Internal Assessment 20" />
      <div className="grid g2">
        <div className="card">
          <h2>Calendar</h2>
          <div className="table-wrap"><table className="t">
            <thead><tr><th>Test</th><th>Subject</th><th>Date</th><th>Status</th><th className="num">Score</th></tr></thead>
            <tbody>{TESTS.map((t) => (
              <tr key={t.id}><td><b>{t.title}</b></td><td>{t.subject === 'MATH' ? 'Maths' : 'Science'}</td><td>{new Date(t.date).toLocaleDateString('en-IN')}</td>
                <td><span className={`chip ${t.status === 'marked' ? 'ok' : t.status === 'upcoming' ? 'warn' : ''}`}>{t.status}</span></td><td className="num">{t.score ?? '—'}</td></tr>
            ))}</tbody>
          </table></div>
        </div>
        <div className="card stack">
          <h2>Mathematics: Internal Assessment so far</h2>
          <div className="table-wrap"><table className="t">
            <tbody>
              <tr><td>Periodic tests (PT1, PT2, PT3)</td><td className="num">{me.pts.map((x) => Math.round(x * 100) + '%').join(' · ')}</td></tr>
              <tr><td>Best 2 of 3, averaged</td><td className="num"><b>{Math.round(periodic * 100)}%</b></td></tr>
              <tr><td>Multiple assessment · Portfolio · Lab</td><td className="num">{[me.multiple, me.portfolio, me.enrichment].map((x) => Math.round(x * 100) + '%').join(' · ')}</td></tr>
              <tr><td><b>Internal Assessment</b></td><td className="num"><b>{ia} / 20</b></td></tr>
              <tr><td>Half-yearly theory (as a guide)</td><td className="num">{me.theory} / 80</td></tr>
              <tr><td><b>Indicative grade</b> (absolute Class 9 scale)</td><td className="num"><span className="chip ok">{projected.grade}</span> {projected.total}/100</td></tr>
            </tbody>
          </table></div>
          <p className="small muted">Calculated with the CBSE 2026-27 Class 9 policy: IA has 4 equal parts, periodic = average of the best 2 of 3 tests, and you need at least 33% in both theory and IA.</p>
        </div>
      </div>
    </>
  );
}
