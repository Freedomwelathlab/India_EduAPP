import Link from 'next/link';
import type { ReactNode } from 'react';
import { toScore } from '@ieos/learning-engine';

export function PageHead({ title, sub, crumbs, right }: { title: string; sub?: ReactNode; crumbs?: Array<[string, string?]>; right?: ReactNode }) {
  return (
    <div className="topbar">
      <div>
        {crumbs && (
          <div className="crumbs">
            {crumbs.map(([label, href], i) => (
              <span key={i}>{href ? <Link href={href}>{label}</Link> : label}{i < crumbs.length - 1 ? ' ›' : ''}</span>
            ))}
          </div>
        )}
        <h1>{title}</h1>
        {sub && <p className="sub">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function level(score: number): 'ok' | 'warn' | 'bad' {
  return score >= 80 ? 'ok' : score >= 50 ? 'warn' : 'bad';
}

const COLOR = { ok: 'var(--solid)', warn: 'var(--shaky)', bad: 'var(--gap)' };

export function MasteryBar({ belief, label }: { belief: number; label?: string }) {
  const s = toScore(belief);
  return (
    <div>
      {label && <div className="row between small" style={{ marginBottom: 4 }}><span>{label}</span><b>{s}%</b></div>}
      <div className="bar" role="meter" aria-valuenow={s} aria-valuemin={0} aria-valuemax={100} aria-label={label ?? 'Mastery'}>
        <span style={{ width: `${s}%`, background: COLOR[level(s)] }} />
      </div>
    </div>
  );
}

export function Stat({ value, label, tone }: { value: ReactNode; label: string; tone?: 'ok' | 'warn' | 'bad' }) {
  return (
    <div className="card">
      <div className="stat" style={tone ? { color: `var(--${tone === 'ok' ? 'solid' : tone === 'warn' ? 'shaky' : 'gap'}-ink)` } : undefined}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export const SubjectIcon = ({ subject }: { subject: 'MATH' | 'SCI' }) => (
  <span className={`subject-icon ${subject === 'MATH' ? 'ma' : 'sc'}`} aria-hidden>{subject === 'MATH' ? '∑' : '⚗'}</span>
);

export const subjectSlug = (s: 'MATH' | 'SCI') => (s === 'MATH' ? 'maths' : 'science');
export const subjectName = (s: 'MATH' | 'SCI') => (s === 'MATH' ? 'Mathematics' : 'Science');
