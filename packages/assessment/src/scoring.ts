/**
 * CBSE 2026-27 scoring policy, Classes 9–10 (Secondary Curriculum Part 1, §3).
 *
 * Every rule is data inside a versioned policy object, so 2027-28 can ship a
 * new policy without touching code (master prompt §7: "Do not hard-code one
 * grading model globally").
 */

export interface ScoringPolicy {
  id: string;
  board: 'CBSE';
  academicYear: string;
  grades: number[];
  theoryMax: number;
  iaMax: number;
  /** Minimum fraction required separately in theory and in IA. */
  passFraction: number;
  /** IA components, each with its share of the IA total (shares sum to 1). */
  iaComponents: Array<{ key: IaComponentKey; label: string; share: number }>;
  periodicTests: { count: number; bestOf: number };
  advanced: { max: number; noteThreshold: number; addsToAggregate: false };
  /** Class 9: absolute bands. Class 10: positional (computed by CBSE nationally). */
  grading: { grade: number; mode: 'absolute'; bands: Array<{ min: number; grade: string }> } | { grade: number; mode: 'positional' };
}

export type IaComponentKey = 'periodic' | 'multiple' | 'portfolio' | 'enrichment';

const IA = [
  { key: 'periodic', label: 'Periodic Assessment', share: 0.25 },
  { key: 'multiple', label: 'Multiple Assessment', share: 0.25 },
  { key: 'portfolio', label: 'Portfolio', share: 0.25 },
  { key: 'enrichment', label: 'Subject Enrichment / Practical', share: 0.25 },
] as const satisfies ScoringPolicy['iaComponents'];

const base = {
  board: 'CBSE' as const, academicYear: '2026-27', theoryMax: 80, iaMax: 20, passFraction: 0.33,
  iaComponents: [...IA], periodicTests: { count: 3, bestOf: 2 },
  advanced: { max: 25, noteThreshold: 0.5, addsToAggregate: false as const },
};

export const CBSE_2026_27_CLASS9: ScoringPolicy = {
  ...base, id: 'CBSE:2026-27:G9', grades: [9],
  grading: {
    grade: 9, mode: 'absolute',
    bands: [
      { min: 91, grade: 'A1' }, { min: 81, grade: 'A2' }, { min: 71, grade: 'B1' }, { min: 61, grade: 'B2' },
      { min: 51, grade: 'C1' }, { min: 41, grade: 'C2' }, { min: 33, grade: 'D' }, { min: 0, grade: 'E' },
    ],
  },
};

export const CBSE_2026_27_CLASS10: ScoringPolicy = {
  ...base, id: 'CBSE:2026-27:G10', grades: [10], grading: { grade: 10, mode: 'positional' },
};

/** Average of the best `bestOf` periodic tests, each given as a fraction 0–1. */
export function periodicScore(tests: number[], policy: ScoringPolicy): number {
  if (tests.length === 0) return 0;
  for (const t of tests) if (!(t >= 0 && t <= 1)) throw new Error(`periodic test score must be a fraction 0–1, got ${t}`);
  const best = [...tests].sort((a, b) => b - a).slice(0, policy.periodicTests.bestOf);
  return best.reduce((s, x) => s + x, 0) / best.length;
}

/** IA out of policy.iaMax, from component fractions 0–1. */
export function internalAssessment(fractions: Record<IaComponentKey, number>, policy: ScoringPolicy): number {
  const total = policy.iaComponents.reduce((s, c) => s + c.share * clamp01(fractions[c.key]), 0) * policy.iaMax;
  return round1(total);
}

export interface SubjectResult {
  theory: number;
  ia: number;
  total: number;
  passTheory: boolean;
  passIa: boolean;
  passed: boolean;
  /** Exact grade for Class 9; undefined for Class 10 (positional, board-computed). */
  grade?: string;
  advancedNote?: string;
}

export function subjectResult(
  input: { theory: number; ia: number; phase2Theory?: number; advanced?: number },
  policy: ScoringPolicy,
): SubjectResult {
  const theory = Math.max(input.theory, input.phase2Theory ?? -Infinity); // best of two Board attempts (Class 10)
  if (theory < 0 || theory > policy.theoryMax) throw new Error(`theory out of range: ${theory}`);
  if (input.ia < 0 || input.ia > policy.iaMax) throw new Error(`IA out of range: ${input.ia}`);
  const passTheory = theory >= policy.passFraction * policy.theoryMax;
  const passIa = input.ia >= policy.passFraction * policy.iaMax;
  const total = round1(theory + input.ia);
  const result: SubjectResult = { theory, ia: input.ia, total, passTheory, passIa, passed: passTheory && passIa };
  if (policy.grading.mode === 'absolute') {
    const pct = (total / (policy.theoryMax + policy.iaMax)) * 100;
    result.grade = result.passed ? policy.grading.bands.find((b) => pct >= b.min)!.grade : 'E';
  }
  if (input.advanced !== undefined && input.advanced >= policy.advanced.noteThreshold * policy.advanced.max) {
    result.advancedNote = 'Advanced Level successfully cleared';
  }
  return result;
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, Number.isFinite(x) ? x : 0));
const round1 = (x: number) => Math.round(x * 10) / 10;
