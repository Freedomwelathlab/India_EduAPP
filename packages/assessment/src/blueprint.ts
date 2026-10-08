/**
 * Assessment blueprint + validator (master prompt §7).
 * A generated or teacher-built paper must pass `validatePaper` before release.
 */
import type { CognitiveBand, QuestionType } from './types';

export interface BlueprintSection {
  id: string;
  label: string;
  types: QuestionType[] | 'any_constructed';
  count: number;
  marksEach: number;
}

export interface Blueprint {
  id: string;
  versionId: string;
  title: string;
  durationMinutes: number;
  totalMarks: number;
  sections: BlueprintSection[];
  /** Target marks per cognitive band, with an absolute tolerance in marks. */
  cognitive?: { targets: Record<CognitiveBand, number>; toleranceMarks: number };
  /** Target marks per unit id, with tolerance. */
  unitWeights?: { targets: Record<string, number>; toleranceMarks: number };
}

export interface PaperItem {
  questionId: string;
  sectionId: string;
  marks: number;
  type: QuestionType | 'short_answer' | 'long_answer';
  cognitive: CognitiveBand;
  unitId: string;
}

/**
 * CBSE Class 10 Mathematics Standard (041), 2026-27.
 * Cognitive split: official QPD (43/19/18). Section layout: as reported for the
 * 2026 Board paper (Tier 5). Replace it once the 2026-27 SQP is published.
 */
export const CBSE_G10_MATH_STD_2026_27: Blueprint = {
  id: 'bp:CBSE:2026-27:G10:MATH:041',
  versionId: 'CBSE:2026-27',
  title: 'Class X Mathematics (Standard) — Board pattern',
  durationMinutes: 180,
  totalMarks: 80,
  sections: [
    { id: 'A', label: 'MCQ incl. Assertion–Reason', types: ['mcq', 'assertion_reason'], count: 20, marksEach: 1 },
    { id: 'B', label: 'Very short answer', types: 'any_constructed', count: 5, marksEach: 2 },
    { id: 'C', label: 'Short answer', types: 'any_constructed', count: 6, marksEach: 3 },
    { id: 'D', label: 'Long answer', types: 'any_constructed', count: 4, marksEach: 5 },
    { id: 'E', label: 'Case-based', types: ['case_based'], count: 3, marksEach: 4 },
  ],
  cognitive: { targets: { remember_understand: 43, apply: 19, analyse_evaluate_create: 18 }, toleranceMarks: 3 },
  unitWeights: {
    targets: { 'g10m-u1': 6, 'g10m-u2': 20, 'g10m-u3': 6, 'g10m-u4': 15, 'g10m-u5': 12, 'g10m-u6': 10, 'g10m-u7': 11 },
    toleranceMarks: 0,
  },
};

export interface ValidationIssue { code: string; message: string }

export function validateBlueprint(bp: Blueprint): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const sectionSum = bp.sections.reduce((s, x) => s + x.count * x.marksEach, 0);
  if (sectionSum !== bp.totalMarks) issues.push({ code: 'BP_SECTION_TOTAL', message: `sections add to ${sectionSum}, expected ${bp.totalMarks}` });
  if (bp.cognitive) {
    const c = Object.values(bp.cognitive.targets).reduce((s, x) => s + x, 0);
    if (c !== bp.totalMarks) issues.push({ code: 'BP_COGNITIVE_TOTAL', message: `cognitive targets add to ${c}, expected ${bp.totalMarks}` });
  }
  if (bp.unitWeights) {
    const u = Object.values(bp.unitWeights.targets).reduce((s, x) => s + x, 0);
    if (u !== bp.totalMarks) issues.push({ code: 'BP_UNIT_TOTAL', message: `unit targets add to ${u}, expected ${bp.totalMarks}` });
  }
  return issues;
}

const CONSTRUCTED = new Set(['short_answer', 'long_answer', 'numeric']);

export function validatePaper(bp: Blueprint, items: PaperItem[]): ValidationIssue[] {
  const issues = validateBlueprint(bp);
  const ids = new Set<string>();
  for (const it of items) {
    if (ids.has(it.questionId)) issues.push({ code: 'DUPLICATE_QUESTION', message: `${it.questionId} appears twice` });
    ids.add(it.questionId);
  }
  for (const s of bp.sections) {
    const inSection = items.filter((i) => i.sectionId === s.id);
    if (inSection.length !== s.count) issues.push({ code: 'SECTION_COUNT', message: `Section ${s.id}: ${inSection.length} questions, expected ${s.count}` });
    for (const it of inSection) {
      if (it.marks !== s.marksEach) issues.push({ code: 'SECTION_MARKS', message: `${it.questionId} carries ${it.marks}, Section ${s.id} expects ${s.marksEach}` });
      const typeOk = s.types === 'any_constructed' ? CONSTRUCTED.has(it.type) : (s.types as string[]).includes(it.type);
      if (!typeOk) issues.push({ code: 'SECTION_TYPE', message: `${it.questionId} (${it.type}) not allowed in Section ${s.id}` });
    }
  }
  const unknown = items.filter((i) => !bp.sections.some((s) => s.id === i.sectionId));
  for (const u of unknown) issues.push({ code: 'UNKNOWN_SECTION', message: `${u.questionId} in unknown section ${u.sectionId}` });

  const total = items.reduce((s, i) => s + i.marks, 0);
  if (total !== bp.totalMarks) issues.push({ code: 'PAPER_TOTAL', message: `paper totals ${total}, expected ${bp.totalMarks}` });

  if (bp.cognitive) {
    for (const [band, target] of Object.entries(bp.cognitive.targets)) {
      const got = items.filter((i) => i.cognitive === band).reduce((s, i) => s + i.marks, 0);
      if (Math.abs(got - target) > bp.cognitive.toleranceMarks) {
        issues.push({ code: 'COGNITIVE_WEIGHT', message: `${band}: ${got} marks, target ${target} ±${bp.cognitive.toleranceMarks}` });
      }
    }
  }
  if (bp.unitWeights) {
    for (const [unit, target] of Object.entries(bp.unitWeights.targets)) {
      const got = items.filter((i) => i.unitId === unit).reduce((s, i) => s + i.marks, 0);
      if (Math.abs(got - target) > bp.unitWeights.toleranceMarks) {
        issues.push({ code: 'UNIT_WEIGHT', message: `${unit}: ${got} marks, target ${target} ±${bp.unitWeights.toleranceMarks}` });
      }
    }
  }
  return issues;
}
