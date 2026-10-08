'use client';

import { useState, useTransition } from 'react';
import type { StudentQuestion } from '@ieos/assessment';
import { submitAnswer } from '@/app/actions';

type Result = Awaited<ReturnType<typeof submitAnswer>>;

const TYPE_LABEL: Record<string, string> = {
  mcq: 'Multiple choice', assertion_reason: 'Assertion–Reason', numeric: 'Numerical answer', case_based: 'Case-based',
};
const COG_LABEL: Record<string, string> = {
  remember_understand: 'Remember / Understand', apply: 'Apply', analyse_evaluate_create: 'Analyse / Evaluate',
};

export function QuestionCard({ q, showMeta = true }: { q: StudentQuestion; showMeta?: boolean }) {
  const [choice, setChoice] = useState<string | null>(null);
  const [num, setNum] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const done = result !== null;

  const submit = () => {
    setError(null);
    start(async () => {
      try {
        const r = q.type === 'numeric'
          ? await submitAnswer(q.id, { kind: 'numeric', value: Number(num) })
          : await submitAnswer(q.id, { kind: 'option', optionId: choice! });
        setResult(r);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong');
      }
    });
  };

  const reset = () => { setChoice(null); setNum(''); setResult(null); setError(null); };
  const canSubmit = q.type === 'numeric' ? num.trim() !== '' && Number.isFinite(Number(num)) : choice !== null;

  return (
    <div className="card">
      {showMeta && (
        <div className="meta-row">
          <span className={`chip ${q.subject === 'MATH' ? 'ma' : 'sc'}`}>Class {q.grade} · {q.subject === 'MATH' ? 'Maths' : 'Science'}</span>
          <span className="chip">{TYPE_LABEL[q.type]}</span>
          <span className="chip">{COG_LABEL[q.cognitive]}</span>
          <span className="chip">{q.marks} mark{q.marks > 1 ? 's' : ''}</span>
          <span className="chip">~{Math.round(q.expectedSeconds / 60 * 10) / 10} min</span>
          <span className="chip info">Level {q.difficultyTier}/10</span>
        </div>
      )}
      {q.context && <div className="q-context">{q.context}</div>}
      <p className="q-stem">{q.stem}</p>

      {q.type === 'numeric' ? (
        <div className="row">
          <label className="sr-only" htmlFor={`n-${q.id}`}>Your answer</label>
          <input
            id={`n-${q.id}`} className="num-in" inputMode="decimal" placeholder="Your answer"
            value={num} disabled={done} onChange={(e) => setNum(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && canSubmit && !done) submit(); }}
          />
          {q.numericUnit && <span className="muted">{q.numericUnit}</span>}
        </div>
      ) : (
        <div className="opts" role="radiogroup" aria-label="Options">
          {q.options!.map((o) => {
            const cls = done
              ? o.id === result.correctOptionId ? 'right' : o.id === choice ? 'wrong' : ''
              : o.id === choice ? 'sel' : '';
            return (
              <button key={o.id} type="button" role="radio" aria-checked={choice === o.id}
                className={`opt ${cls}`} disabled={done} onClick={() => setChoice(o.id)}>
                <span className="k">{o.id}</span><span>{o.text}</span>
              </button>
            );
          })}
        </div>
      )}

      {error && <p className="small" style={{ color: 'var(--gap-ink)', marginTop: 10 }}>{error}</p>}

      {!done ? (
        <div className="row" style={{ marginTop: 16 }}>
          <button className="btn" disabled={!canSubmit || pending} onClick={submit}>{pending ? 'Checking…' : 'Check answer'}</button>
          <span className="small muted">Marked on the server. The answer key is never sent to your device.</span>
        </div>
      ) : (
        <div className={`feedback ${result.correct ? 'ok' : 'no'}`} aria-live="polite">
          <strong>{result.correct ? `Correct! +${result.awarded}` : `Not quite. The answer is ${result.correctAnswerLabel}.`}</strong>
          {result.misconception && <p style={{ marginTop: 6 }}>💡 {result.misconception}</p>}
          <p style={{ marginTop: 8, color: 'var(--ink-2)' }}>{result.explanation}</p>
          <ol>{result.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn ghost sm" onClick={reset}>Try again</button>
          </div>
        </div>
      )}
    </div>
  );
}
