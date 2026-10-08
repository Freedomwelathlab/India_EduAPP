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
