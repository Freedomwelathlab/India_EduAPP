import { describe, expect, it } from 'vitest';
import { CBSE_2026_27_SUBJECTS, getSubject, theoryMarksTotal, validatePrerequisites } from './index';

describe('CBSE 2026-27 curriculum', () => {
  it('covers Classes 6–10 for Maths and Science', () => {
    expect(CBSE_2026_27_SUBJECTS).toHaveLength(10);
    for (const g of [6, 7, 8, 9, 10] as const) {
      expect(getSubject(g, 'MATH')).toBeDefined();
      expect(getSubject(g, 'SCI')).toBeDefined();
    }
  });

  it('unit marks add up to the 80-mark theory paper for Classes 9 and 10', () => {
    for (const g of [9, 10] as const) {
      for (const s of ['MATH', 'SCI'] as const) {
        expect(theoryMarksTotal(getSubject(g, s)!), `G${g} ${s}`).toBe(80);
      }
    }
  });

  it('every node is pinned to the 2026-27 version', () => {
    for (const s of CBSE_2026_27_SUBJECTS) expect(s.versionId).toBe('CBSE:2026-27');
  });

  it('ids are unique across the whole version', () => {
    const ids: string[] = [];
    for (const s of CBSE_2026_27_SUBJECTS) for (const u of s.units) for (const c of u.chapters) {
      ids.push(c.id, ...c.topics.map((t) => t.id));
    }
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('prerequisite graph is valid and acyclic', () => {
    expect(validatePrerequisites(CBSE_2026_27_SUBJECTS)).toEqual([]);
  });

  it('every subject cites at least one source', () => {
    for (const s of CBSE_2026_27_SUBJECTS) expect(s.sources.length).toBeGreaterThan(0);
  });
});

describe('NCERT book alignment (contents pages, 2026-27 reprints)', () => {
  const EXPECTED: Record<string, number[]> = {
    // subject id → chapters per part (single-part books have one entry)
    'CBSE:2026-27:G6:MATH': [10], 'CBSE:2026-27:G6:SCI': [12],
    'CBSE:2026-27:G7:MATH': [8, 7], 'CBSE:2026-27:G7:SCI': [12],
    'CBSE:2026-27:G8:MATH': [7, 7], 'CBSE:2026-27:G8:SCI': [13],
    'CBSE:2026-27:G9:MATH': [14], 'CBSE:2026-27:G9:SCI': [13],
    'CBSE:2026-27:G10:MATH': [14], 'CBSE:2026-27:G10:SCI': [13],
  };
  it('every book chapter appears exactly once, numbered 1..N in each part', () => {
    for (const s of CBSE_2026_27_SUBJECTS) {
      const chs = s.units.flatMap((u) => u.chapters);
      const parts = EXPECTED[s.id]!;
      parts.forEach((n, i) => {
        const part = parts.length > 1 ? i + 1 : undefined;
        const nums = chs.filter((c) => c.part === part).map((c) => c.number).sort((a, b) => a - b);
        expect(nums, `${s.id} part ${part ?? '-'}`).toEqual(Array.from({ length: n }, (_, k) => k + 1));
      });
    }
  });

  it('Class 9 Science units carry the CBSE marks for the right chapters', () => {
    const s = getSubject(9, 'SCI')!;
    const living = s.units.find((u) => u.title === 'World of Living')!;
    expect(living.theoryMarks).toBe(27);
    expect(living.chapters.map((c) => c.number).sort((a, b) => a - b)).toEqual([2, 3, 11, 12]);
  });
});

describe('Class 9–10 topic map (C3)', () => {
  it('every Class 9–10 chapter has at least one topic, and every mapped key is a real chapter', async () => {
    const { G10_TOPICS } = await import('./topics-g10');
    const { G9_TOPICS } = await import('./topics-g9');
    const ids = new Set<string>();
    for (const g of [9, 10] as const) for (const subj of ['MATH', 'SCI'] as const) {
      for (const u of getSubject(g, subj)!.units) for (const c of u.chapters) {
        ids.add(c.id);
        expect(c.topics.length, c.id).toBeGreaterThan(0);
      }
    }
    for (const k of [...Object.keys(G9_TOPICS), ...Object.keys(G10_TOPICS)]) expect(ids.has(k), k).toBe(true);
  });

  it('board formative-only content is flagged so it never enters a Board mock', () => {
    const sci = getSubject(10, 'SCI')!;
    const formative = sci.units.flatMap((u) => u.chapters.flatMap((c) => c.topics)).filter((t) => t.assessmentScope === 'formative_only').map((t) => t.title);
    expect(formative).toEqual(expect.arrayContaining(['Periodic classification of elements', 'Evolution', 'Motor, induction and generator']));
  });
});
