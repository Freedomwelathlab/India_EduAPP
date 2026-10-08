import Link from 'next/link';
import { getQuestion, toStudentView } from '@ieos/assessment';
import { QuestionCard } from '@/components/QuestionCard';
import { BRAND } from '@/lib/demo';

export default function Landing() {
  const sample = toStudentView(getQuestion('q-g10m-001')!);
  return (
    <>
      <header className="land-top">
        <Link href="/" className="row" style={{ color: 'var(--ink)', fontFamily: 'var(--display)', fontWeight: 800, fontSize: '1.3rem' }}>
          <span className="logo">वि</span>{BRAND}
        </Link>
        <nav className="row">
          <a href="#how" className="btn ghost sm">How it works</a>
          <Link href="/login" className="btn sm">Sign in</Link>
        </nav>
      </header>

      <section className="hero">
        <div>
          <span className="chip info">CBSE 2026-27 · Classes 6–10 · Maths & Science</span>
          <h1 style={{ marginTop: 14 }}>Every student practises daily. Every teacher sees who needs help, and why.</h1>
          <p className="lead">
            Daily practice, CBSE-format periodic tests with best-2-of-3 calculated for you, short tutor videos for every topic,
            and a doubt box that reaches the teacher. Built for the 2026-27 changes: two Class 10 board exams, Standard/Advanced in Class 9, and versioned syllabi.
          </p>
          <div className="row">
            <Link href="/learn" className="btn">Explore the student app</Link>
            <Link href="/teacher" className="btn ghost">See the teacher view</Link>
          </div>
          <p className="small muted" style={{ marginTop: 14 }}>Pilot programme for CBSE schools opens Feb 2027. Not affiliated with CBSE or NCERT.</p>
        </div>
        <div>
          <QuestionCard q={sample} />
        </div>
      </section>

      <section className="land-sec" id="how">
        <h2 style={{ marginBottom: 16 }}>One loop, from syllabus to remediation</h2>
        <div className="grid g4">
          {[
            ['📚', 'Curriculum truth', 'Every question is pinned to board, class, subject, chapter and year (CBSE 2026-27), and to the official competency codes.'],
            ['✍️', 'Daily practice', '10 minutes a day. Difficulty adapts with Bayesian mastery tracking. Every wrong option explains the misconception.'],
            ['🧪', 'Periodic tests', 'Board-style papers checked by a blueprint validator. The IA register calculates best-2-of-3 automatically.'],
            ['🎥', 'Videos & doubts', 'A short tutor video for every topic, a private doubt box, and live clarification sessions before every test.'],
          ].map(([i, t, d]) => (
            <div key={t} className="card"><div style={{ fontSize: '1.6rem' }}>{i}</div><h3 style={{ margin: '8px 0 6px' }}>{t}</h3><p className="small muted">{d}</p></div>
          ))}
        </div>
      </section>

      <section className="land-sec">
        <div className="grid g3">
          <div className="card flat"><h3>For students</h3><p className="small muted">A plan for today, explained: "Practise this because…". No ads. No public rankings.</p></div>
          <div className="card flat"><h3>For teachers</h3><p className="small muted">Doubts grouped by topic, remediation groups formed automatically, and an IA register that is ready for audit.</p></div>
          <div className="card flat"><h3>For parents & schools</h3><p className="small muted">Progress in plain language. Your school controls the data, under India's DPDP Act.</p></div>
        </div>
      </section>

      <footer className="foot">
        {BRAND} (working name) · Preview build · Data stays with your school ·{' '}
        <Link href="/admin">Trust & compliance</Link>
      </footer>
    </>
  );
}
