export * from './types';
export { CBSE_2026_27, CBSE_2026_27_SUBJECTS } from './cbse-2026-27';

import { CBSE_2026_27_SUBJECTS } from './cbse-2026-27';
import type { Chapter, Grade, SubjectCode, SubjectCurriculum, Topic, Unit } from './types';

export const SUBJECT_SLUG: Record<SubjectCode, string> = { MATH: 'maths', SCI: 'science' };
export const SLUG_SUBJECT: Record<string, SubjectCode> = { maths: 'MATH', science: 'SCI' };

export function getSubject(grade: Grade, subject: SubjectCode): SubjectCurriculum | undefined {
  return CBSE_2026_27_SUBJECTS.find((s) => s.grade === grade && s.subject === subject);
}

export function allChapters(s: SubjectCurriculum): Array<Chapter & { unit: Unit }> {
  return s.units.flatMap((unit) => unit.chapters.map((c) => ({ ...c, unit })));
}

export interface TopicLocation {
  subject: SubjectCurriculum;
  unit: Unit;
  chapter: Chapter;
  topic: Topic;
}

export function findTopic(topicId: string): TopicLocation | undefined {
  for (const subject of CBSE_2026_27_SUBJECTS) {
    for (const unit of subject.units) {
      for (const chapter of unit.chapters) {
        const topic = chapter.topics.find((t) => t.id === topicId);
        if (topic) return { subject, unit, chapter, topic };
      }
    }
  }
  return undefined;
}

/** Sum of unit marks. Must equal the 80-mark theory paper wherever the board publishes unit marks. */
export function theoryMarksTotal(s: SubjectCurriculum): number | undefined {
  if (s.units.some((u) => u.theoryMarks === undefined)) return undefined;
  return s.units.reduce((n, u) => n + (u.theoryMarks ?? 0), 0);
}

/** Every prerequisite id must point at a topic that exists, and the graph must have no cycles. */
export function validatePrerequisites(subjects: SubjectCurriculum[]): string[] {
  const topics = new Map<string, Topic>();
  for (const s of subjects) for (const u of s.units) for (const c of u.chapters) for (const t of c.topics) topics.set(t.id, t);
  const errors: string[] = [];
  for (const t of topics.values()) {
    for (const p of t.prerequisiteTopicIds) if (!topics.has(p)) errors.push(`${t.id}: unknown prerequisite ${p}`);
  }
  const state = new Map<string, 'visiting' | 'done'>();
  const visit = (id: string, path: string[]): void => {
    if (state.get(id) === 'done') return;
    if (state.get(id) === 'visiting') { errors.push(`cycle: ${[...path, id].join(' → ')}`); return; }
    state.set(id, 'visiting');
    for (const p of topics.get(id)?.prerequisiteTopicIds ?? []) if (topics.has(p)) visit(p, [...path, id]);
    state.set(id, 'done');
  };
  for (const id of topics.keys()) visit(id, []);
  return errors;
}

/** "Ch 5" or "Part 2 · Ch 2", as a student finds it in the book. */
export function chapterLabel(c: Chapter): string {
  return c.part ? `Part ${c.part} · Ch ${c.number}` : `Ch ${c.number}`;
}
