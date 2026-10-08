import { PageHead, Stat } from '@/components/ui';
import { DEMO_SCHOOL } from '@/lib/demo';

export const metadata = { title: 'School overview' };

const GRADES = [
  { g: 6, sections: 4, adoption: 0.81, maths: 0.64, sci: 0.69, pt: 'PT-1 done' },
  { g: 7, sections: 4, adoption: 0.77, maths: 0.58, sci: 0.66, pt: 'PT-1 done' },
  { g: 8, sections: 3, adoption: 0.72, maths: 0.55, sci: 0.61, pt: 'PT-1 done' },
  { g: 9, sections: 3, adoption: 0.86, maths: 0.62, sci: 0.59, pt: 'PT-2 on 15 Oct' },
  { g: 10, sections: 3, adoption: 0.91, maths: 0.66, sci: 0.63, pt: 'Pre-board in Dec' },
];

export default function SchoolHome() {
  return (
    <>
      <PageHead title={DEMO_SCHOOL.name} sub={`CBSE · ${DEMO_SCHOOL.city} · Academic year ${DEMO_SCHOOL.year} · Classes 6–10 Maths & Science`} />
      <div className="grid g4">
        <Stat value="82%" label="students practising weekly" tone="ok" />
        <Stat value="11.5 h" label="teacher hours saved this month (marking + paper setting, estimated)" />
        <Stat value="87%" label="doubts answered within the SLA" tone="ok" />
        <Stat value="+9 pts" label="mastery gain since the September diagnostic" />
      </div>
      <div className="card section">
        <h2>By class (aggregated, no individual rankings)</h2>
        <div className="table-wrap"><table className="t">
          <thead><tr><th>Class</th><th className="num">Sections</th><th className="num">Weekly active</th><th className="num">Maths mastery</th><th className="num">Science mastery</th><th>Assessment status</th></tr></thead>
          <tbody>{GRADES.map((r) => (
            <tr key={r.g}><td><b>Class {r.g}</b></td><td className="num">{r.sections}</td><td className="num">{Math.round(r.adoption * 100)}%</td>
              <td className="num">{Math.round(r.maths * 100)}%</td><td className="num">{Math.round(r.sci * 100)}%</td><td>{r.pt}</td></tr>
          ))}</tbody>
        </table></div>
        <p className="small muted" style={{ marginTop: 10 }}>Demo figures. In a pilot these come from the baseline → post-test evidence programme. We only call a change causal when the study design supports it.</p>
      </div>
    </>
  );
}
