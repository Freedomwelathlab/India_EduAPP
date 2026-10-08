import { CBSE_G10_MATH_STD_2026_27, validateBlueprint, validatePaper, type PaperItem } from '@ieos/assessment';
import { PageHead } from '@/components/ui';

export const metadata = { title: 'Test builder' };

const COG = { remember_understand: 'Remember/Understand', apply: 'Apply', analyse_evaluate_create: 'Analyse/Evaluate/Create' } as const;

/** A draft with two deliberate problems, to show the validator blocking release. */
function draftPaper(): PaperItem[] {
  const bp = CBSE_G10_MATH_STD_2026_27;
  const units = Object.keys(bp.unitWeights!.targets);
  const items: PaperItem[] = [];
  let n = 0;
  for (const s of bp.sections) {
    const count = s.id === 'C' ? s.count - 1 : s.count; // one short-answer question missing
    for (let i = 0; i < count; i++) {
      items.push({
        questionId: `q${++n}`, sectionId: s.id, marks: s.marksEach,
        type: s.id === 'A' ? 'mcq' : s.id === 'E' ? 'case_based' : s.id === 'D' ? 'long_answer' : 'short_answer',
        cognitive: n % 4 === 0 ? 'analyse_evaluate_create' : n % 3 === 0 ? 'apply' : 'remember_understand',
        unitId: units[n % units.length]!,
      });
    }
  }
  return items;
}

export default function TestBuilder() {
  const bp = CBSE_G10_MATH_STD_2026_27;
  const items = draftPaper();
  const issues = validatePaper(bp, items);
  const bpOk = validateBlueprint(bp).length === 0;
  return (
    <>
      <PageHead title="Test builder · Board-pattern mock" sub={`${bp.title} · ${bp.durationMinutes / 60} hours · ${bp.totalMarks} marks · blueprint ${bp.id}`}
        right={<button className="btn" disabled={issues.length > 0} title={issues.length ? 'Fix validation issues first' : ''}>Release to students</button>} />
      <div className="grid g2" style={{ alignItems: 'start' }}>
        <div className="card">
          <h2>Blueprint</h2>
          <div className="table-wrap"><table className="t">
            <thead><tr><th>Section</th><th>Type</th><th className="num">Qs</th><th className="num">Marks each</th><th className="num">In draft</th></tr></thead>
            <tbody>{bp.sections.map((s) => {
              const got = items.filter((i) => i.sectionId === s.id).length;
              return <tr key={s.id}><td><b>{s.id}</b></td><td>{s.label}</td><td className="num">{s.count}</td><td className="num">{s.marksEach}</td><td className="num"><span className={`chip ${got === s.count ? 'ok' : 'bad'}`}>{got}</span></td></tr>;
            })}</tbody>
          </table></div>
          <h3 style={{ marginTop: 16 }}>Cognitive balance (CBSE QPD 2026-27)</h3>
          <div className="table-wrap"><table className="t">
            <thead><tr><th>Band</th><th className="num">Target</th><th className="num">Draft</th></tr></thead>
            <tbody>{Object.entries(bp.cognitive!.targets).map(([k, v]) => {
              const got = items.filter((i) => i.cognitive === k).reduce((s, i) => s + i.marks, 0);
              return <tr key={k}><td>{COG[k as keyof typeof COG]}</td><td className="num">{v}</td><td className="num"><span className={`chip ${Math.abs(got - v) <= bp.cognitive!.toleranceMarks ? 'ok' : 'bad'}`}>{got}</span></td></tr>;
            })}</tbody>
          </table></div>
        </div>
        <div className="card stack">
          <div className="row between"><h2>Validator</h2><span className={`chip ${issues.length ? 'bad' : 'ok'}`}>{issues.length ? `${issues.length} issues: release blocked` : 'Ready to release'}</span></div>
          {bpOk && <p className="small muted">Blueprint is internally consistent (sections = units = cognitive = 80 marks).</p>}
          <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>{issues.map((i, k) => <li key={k}><code>{i.code}</code> {i.message}</li>)}</ul>
          <p className="notice info small">Papers cannot be released until every check passes. The release time is locked, and question order is shuffled per student for PTs (exam security, §34).</p>
          <p className="small muted">Section layout follows the 2026 Board paper as reported; the cognitive split is from the official QPD. Replace the layout when CBSE publishes the 2026-27 Sample Question Paper.</p>
        </div>
      </div>
    </>
  );
}
