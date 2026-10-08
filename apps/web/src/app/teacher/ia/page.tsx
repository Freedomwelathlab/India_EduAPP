import { CBSE_2026_27_CLASS9, internalAssessment, periodicScore, subjectResult } from '@ieos/assessment';
import { PageHead } from '@/components/ui';
import { CLASS_9A } from '@/lib/demo';

export const metadata = { title: 'IA register' };

const pct = (x: number) => `${Math.round(x * 100)}`;

export default function IaRegister() {
  const pol = CBSE_2026_27_CLASS9;
  const rows = CLASS_9A.map((s) => {
    const periodic = periodicScore(s.pts, pol);
    const ia = internalAssessment({ periodic, multiple: s.multiple, portfolio: s.portfolio, enrichment: s.enrichment }, pol);
    const res = subjectResult({ theory: s.theory, ia }, pol);
    const dropped = s.pts.indexOf(Math.min(...s.pts));
    return { s, periodic, ia, res, dropped };
  }).sort((a, b) => Number(a.s.roll) - Number(b.s.roll));

  return (
    <>
      <PageHead title="Internal Assessment register · 9A Mathematics" sub="CBSE 2026-27 §3.3: Periodic (best 2 of 3) · Multiple Assessment · Portfolio · Lab practical, 25% each, out of 20"
        right={<div className="row"><button className="btn ghost">Export CSV</button><button className="btn">Lock & submit</button></div>} />
      <div className="card">
        <div className="table-wrap"><table className="t">
          <thead><tr><th>Roll</th><th>Student</th><th className="num">PT1 %</th><th className="num">PT2 %</th><th className="num">PT3 %</th><th className="num">Best 2/3</th><th className="num">Multiple</th><th className="num">Portfolio</th><th className="num">Lab</th><th className="num">IA /20</th><th className="num">Theory /80*</th><th>Grade*</th><th>Pass rule</th></tr></thead>
          <tbody>{rows.map(({ s, periodic, ia, res, dropped }) => (
            <tr key={s.id}>
              <td>{s.roll}</td><td style={{ whiteSpace: 'nowrap' }}><b>{s.name}</b></td>
              {s.pts.map((p, i) => <td key={i} className="num" style={i === dropped ? { color: 'var(--ink-3)', textDecoration: 'line-through' } : undefined}>{pct(p)}</td>)}
              <td className="num"><b>{pct(periodic)}</b></td>
              <td className="num">{pct(s.multiple)}</td><td className="num">{pct(s.portfolio)}</td><td className="num">{pct(s.enrichment)}</td>
              <td className="num"><b>{ia}</b></td><td className="num">{s.theory}</td>
              <td><span className={`chip ${res.passed ? 'ok' : 'bad'}`}>{res.grade}</span></td>
              <td>{res.passed ? <span className="small muted">≥33% in both</span> : <span className="chip bad">{!res.passTheory ? 'Theory < 33%' : 'IA < 33%'}</span>}</td>
            </tr>
          ))}</tbody>
        </table></div>
        <p className="small muted" style={{ marginTop: 12 }}>
          * Theory = half-yearly as a guide until the annual exam. Struck-through PT = dropped by the best-2-of-3 rule.
          Every edit is written to the tamper-evident audit log (who, when, old → new). At least one PT must be competency-based, with documented remediation (CBSE §3.3.1).
        </p>
      </div>
    </>
  );
}
