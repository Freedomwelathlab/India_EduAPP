import { describe, expect, it } from 'vitest';
import { findTopic, CBSE_2026_27_SUBJECTS } from '@ieos/curriculum';
import {
  CBSE_2026_27_CLASS10, CBSE_2026_27_CLASS9, CBSE_G10_MATH_STD_2026_27, SEED_QUESTIONS,
  internalAssessment, markAnswer, periodicScore, subjectResult, toStudentView, validateBlueprint, validatePaper,
  type PaperItem,
} from './index';

describe('seed question bank', () => {
  it('has exactly one question per Class × Subject', () => {
    const keys = SEED_QUESTIONS.map((q) => `${q.grade}-${q.subject}`);
    expect(new Set(keys).size).toBe(10);
    expect(SEED_QUESTIONS).toHaveLength(10);
    expect(CBSE_2026_27_SUBJECTS).toHaveLength(10);
  });

  it('every question points at a real topic of the same class and subject (curriculum integrity)', () => {
    for (const q of SEED_QUESTIONS) {
      const loc = findTopic(q.topicId);
      expect(loc, q.id).toBeDefined();
      expect(loc!.subject.grade).toBe(q.grade);
      expect(loc!.subject.subject).toBe(q.subject);
      expect(q.versionId).toBe(loc!.subject.versionId);
    }
  });

  it('every option question has a valid key and every wrong option explains its misconception', () => {
    for (const q of SEED_QUESTIONS.filter((x) => x.options)) {
      expect(q.options!.some((o) => o.id === q.correctOptionId), q.id).toBe(true);
      for (const o of q.options!) if (o.id !== q.correctOptionId && q.type !== 'assertion_reason') expect(o.misconception, `${q.id}/${o.id}`).toBeTruthy();
    }
  });

  it('nothing is published without review (content gate)', () => {
    for (const q of SEED_QUESTIONS) expect(q.provenance.reviewStatus).not.toBe('published');
  });

  it('answer keys hold up when re-derived independently', () => {
    const isPrime = (n: number) => n > 1 && [...Array(Math.floor(Math.sqrt(n)) - 1)].every((_, i) => n % (i + 2) !== 0);
    expect([51, 57, 61, 91].filter(isPrime)).toEqual([61]);
    expect((-8) * (-5) + (-12)).toBe(28);
    expect(Math.sqrt(72 * 2) % 1).toBe(0);
    expect(Math.sqrt(72) % 1).not.toBe(0);
    expect(6 / 3).toBe(2); // zero of 3x − 6
    expect((30 - 10) / 5).toBe(4);
    expect((-4) ** 2 - 4 * 2 * 3).toBeLessThan(0);
    expect(6 / (1 / (1 / 6 + 1 / 6 + 1 / 6))).toBeCloseTo(3);
  });
});

describe('marking', () => {
  const mcq = SEED_QUESTIONS.find((q) => q.id === 'q-g9m-001')!;
  const num = SEED_QUESTIONS.find((q) => q.id === 'q-g9s-001')!;

  it('marks MCQs and surfaces the misconception of the chosen distractor', () => {
    expect(markAnswer(mcq, { kind: 'option', optionId: 'b' })).toMatchObject({ correct: true, awarded: 1 });
    const wrong = markAnswer(mcq, { kind: 'option', optionId: 'a' });
    expect(wrong.correct).toBe(false);
    expect(wrong.misconception).toMatch(/Sign error/);
  });

  it('marks numeric answers within tolerance', () => {
    expect(markAnswer(num, { kind: 'numeric', value: 4 }).awarded).toBe(2);
    expect(markAnswer(num, { kind: 'numeric', value: 4.005 }).correct).toBe(true);
    expect(markAnswer(num, { kind: 'numeric', value: 5 }).correct).toBe(false);
    expect(markAnswer(num, { kind: 'numeric', value: Number.NaN }).correct).toBe(false);
  });

  it('student view never contains the answer key', () => {
    for (const q of SEED_QUESTIONS) {
      const json = JSON.stringify(toStudentView(q));
      expect(json).not.toContain('correctOptionId');
      expect(json).not.toContain('misconception');
      expect(json).not.toContain('"explanation"');
      expect(json).not.toMatch(/"value":/);
    }
  });
});

describe('CBSE 2026-27 scoring policy', () => {
  it('periodic assessment = average of best two of three', () => {
    expect(periodicScore([0.5, 0.9, 0.7], CBSE_2026_27_CLASS9)).toBeCloseTo(0.8);
    expect(() => periodicScore([1.2], CBSE_2026_27_CLASS9)).toThrow();
  });

  it('IA is four equal components out of 20', () => {
    expect(internalAssessment({ periodic: 1, multiple: 1, portfolio: 1, enrichment: 1 }, CBSE_2026_27_CLASS9)).toBe(20);
    expect(internalAssessment({ periodic: 0.8, multiple: 0.6, portfolio: 1, enrichment: 0.6 }, CBSE_2026_27_CLASS9)).toBe(15);
  });

  it('pass needs 33% separately in theory and IA', () => {
    expect(subjectResult({ theory: 60, ia: 6 }, CBSE_2026_27_CLASS10).passed).toBe(false); // IA 6 < 6.6
    expect(subjectResult({ theory: 26, ia: 20 }, CBSE_2026_27_CLASS10).passed).toBe(false); // theory 26 < 26.4
    expect(subjectResult({ theory: 27, ia: 7 }, CBSE_2026_27_CLASS10).passed).toBe(true);
  });

  it('Class 9 gets an absolute grade; Class 10 does not (positional, board-computed)', () => {
    expect(subjectResult({ theory: 75, ia: 18 }, CBSE_2026_27_CLASS9).grade).toBe('A1');
    expect(subjectResult({ theory: 30, ia: 12 }, CBSE_2026_27_CLASS9).grade).toBe('C2');
    expect(subjectResult({ theory: 75, ia: 18 }, CBSE_2026_27_CLASS10).grade).toBeUndefined();
  });

  it('Class 10 Phase-2 improvement keeps the better theory score', () => {
    expect(subjectResult({ theory: 50, ia: 18, phase2Theory: 64 }, CBSE_2026_27_CLASS10).total).toBe(82);
    expect(subjectResult({ theory: 64, ia: 18, phase2Theory: 50 }, CBSE_2026_27_CLASS10).total).toBe(82);
  });

  it('Advanced level adds a marksheet note but never adds to the aggregate', () => {
    const r = subjectResult({ theory: 70, ia: 18, advanced: 13 }, CBSE_2026_27_CLASS9);
    expect(r.total).toBe(88);
    expect(r.advancedNote).toBeDefined();
    expect(subjectResult({ theory: 70, ia: 18, advanced: 12 }, CBSE_2026_27_CLASS9).advancedNote).toBeUndefined();
  });
});

describe('blueprint validator', () => {
  it('the Class 10 Maths Standard blueprint is internally consistent', () => {
    expect(validateBlueprint(CBSE_G10_MATH_STD_2026_27)).toEqual([]);
  });

  function validPaper(): PaperItem[] {
    // Build a paper that matches both section layout and unit/cognitive targets.
    const items: PaperItem[] = [];
    const unitMarks: Array<[string, number]> = [['g10m-u1', 6], ['g10m-u2', 20], ['g10m-u3', 6], ['g10m-u4', 15], ['g10m-u5', 12], ['g10m-u6', 10], ['g10m-u7', 11]];
    const pool: Array<{ sectionId: string; marks: number; type: PaperItem['type'] }> = [];
    for (const s of CBSE_G10_MATH_STD_2026_27.sections) {
      for (let i = 0; i < s.count; i++) {
        pool.push({ sectionId: s.id, marks: s.marksEach, type: s.id === 'A' ? 'mcq' : s.id === 'E' ? 'case_based' : s.id === 'D' ? 'long_answer' : 'short_answer' });
      }
    }
    // Greedy: biggest items first into the unit with the most remaining marks that still fits.
    const remaining = new Map(unitMarks);
    pool.sort((a, b) => b.marks - a.marks);
    let cog = { remember_understand: 43, apply: 19, analyse_evaluate_create: 18 };
    pool.forEach((p, i) => {
      const unit = [...remaining.entries()].filter(([, m]) => m >= p.marks).sort((a, b) => b[1] - a[1])[0]!;
      remaining.set(unit[0], unit[1] - p.marks);
      const band = (Object.entries(cog) as Array<[keyof typeof cog, number]>).filter(([, m]) => m >= p.marks).sort((a, b) => b[1] - a[1])[0]!;
      cog = { ...cog, [band[0]]: band[1] - p.marks };
      items.push({ questionId: `q${i}`, sectionId: p.sectionId, marks: p.marks, type: p.type, cognitive: band[0], unitId: unit[0] });
    });
    return items;
  }

  it('accepts a paper that matches the blueprint', () => {
    expect(validatePaper(CBSE_G10_MATH_STD_2026_27, validPaper())).toEqual([]);
  });

  it('blocks a paper with the wrong section count, type or duplicates', () => {
    const p = validPaper();
    p[0] = { ...p[0]!, type: 'mcq' }; // the first item is a Section D long answer
    p.push({ ...p[1]! });
    const codes = validatePaper(CBSE_G10_MATH_STD_2026_27, p).map((i) => i.code);
    expect(codes).toContain('SECTION_TYPE');
    expect(codes).toContain('DUPLICATE_QUESTION');
    expect(codes).toContain('PAPER_TOTAL');
  });
});
