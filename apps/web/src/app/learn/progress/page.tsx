import { toScore } from '@ieos/learning-engine';
import { MasteryBar, PageHead, Stat } from '@/components/ui';
import { CLASS_9A, ME, masteryOf } from '@/lib/demo';

export const metadata = { title: 'My progress' };

export default function Progress() {
  const me = CLASS_9A.find((s) => s.id === ME.id)!;
  const poly = masteryOf(me.history);
  const rows = [
    { t: 'Number System', s: 'Maths', m: 0.88 },
    { t: 'Zeros of a linear polynomial', s: 'Maths', m: poly },
    { t: 'Arithmetic progressions', s: 'Maths', m: 0.93 },
    { t: 'Exploring algebraic identities', s: 'Maths', m: 0.41 },
    { t: 'Cell', s: 'Science', m: 0.82 },
    { t: 'Tissues', s: 'Science', m: 0.67 },
    { t: 'Uniform acceleration', s: 'Science', m: 0.25 },
  ];
  return (
    <>
      <PageHead title="My progress" sub="Mastery is our best estimate of how securely you know each topic. It is never a rank." />
      <div className="grid g4">
        <Stat value="12" label="day streak (resets gently, no penalty)" />
        <Stat value={rows.filter((r) => r.m >= 0.85).length} label="topics mastered" tone="ok" />
        <Stat value={rows.filter((r) => r.m < 0.5).length} label="topics to strengthen" tone="warn" />
        <Stat value={`${toScore(poly)}%`} label="Polynomials readiness for PT-2" />
      </div>
      <div className="card section stack">
        <h2>By topic</h2>
        {rows.map((r) => <MasteryBar key={r.t} belief={r.m} label={`${r.s} · ${r.t}`} />)}
      </div>
    </>
  );
}
