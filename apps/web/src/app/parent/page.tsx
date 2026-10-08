import { CBSE_2026_27_CLASS9, internalAssessment, periodicScore } from '@ieos/assessment';
import { MasteryBar, PageHead, Stat } from '@/components/ui';
import { CLASS_9A, ME, SESSIONS, TESTS, fmtDate, masteryOf } from '@/lib/demo';

export const metadata = { title: 'Parent' };

export default function ParentHome() {
  const me = CLASS_9A.find((s) => s.id === ME.id)!;
  const ia = internalAssessment({ periodic: periodicScore(me.pts, CBSE_2026_27_CLASS9), multiple: me.multiple, portfolio: me.portfolio, enrichment: me.enrichment }, CBSE_2026_27_CLASS9);
  return (
    <>
      <PageHead title="Aanya's week" sub="A plain-language summary. No class ranks, no comparisons with other children." />
      <div className="grid g4">
        <Stat value="5 / 7" label="days practised this week" tone="ok" />
        <Stat value="74 min" label="learning time this week (healthy range)" />
        <Stat value={`${ia} / 20`} label="Maths internal assessment so far" />
        <Stat value="1" label="doubt answered by a teacher" />
      </div>
      <div className="grid g2 section" style={{ alignItems: 'start' }}>
        <div className="card stack">
          <h2>Strengths and next steps</h2>
          <p>✅ <b>Strong:</b> Arithmetic progressions and Number System. Keep up the short daily practice.</p>
          <p>🔶 <b>Working on:</b> zeros of polynomials. Aanya sometimes makes sign errors when solving equations.</p>
          <p>💬 <b>How you can help (5 min):</b> ask her to explain why the zero of 3x − 6 is 2. Explaining it out loud builds understanding.</p>
          <MasteryBar belief={masteryOf(me.history)} label="Polynomials readiness for PT-2" />
        </div>
        <div className="card stack">
          <h2>Coming up</h2>
          {TESTS.filter((t) => t.status === 'upcoming').map((t) => <p key={t.id}>🧪 <b>{t.title}</b> (Maths) · {new Date(t.date).toDateString()}</p>)}
          {SESSIONS.filter((s) => s.status === 'scheduled').slice(0, 2).map((s) => <p key={s.id}>🎥 {s.title} · {fmtDate(s.startsAt)}</p>)}
          <p className="small muted">You get one weekly summary on WhatsApp/SMS if your school enables it. No marketing messages, ever.</p>
        </div>
      </div>
    </>
  );
}
