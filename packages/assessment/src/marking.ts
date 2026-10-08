import type { MarkResult, Question, Response } from './types';

/** Objective marking. Subjective items go to the teacher review queue and never reach here. */
export function markAnswer(q: Question, r: Response): MarkResult {
  if (q.type === 'numeric') {
    if (!q.numeric) throw new Error(`${q.id}: numeric question without numeric answer`);
    const label = `${q.numeric.value}${q.numeric.unit ? ' ' + q.numeric.unit : ''}`;
    const correct = r.kind === 'numeric' && Number.isFinite(r.value) && Math.abs(r.value - q.numeric.value) <= q.numeric.tolerance;
    return { correct, awarded: correct ? q.marks : -q.negativeMarks, max: q.marks, correctAnswerLabel: label };
  }
  const right = q.options?.find((o) => o.id === q.correctOptionId);
  if (!right) throw new Error(`${q.id}: option question without a valid correctOptionId`);
  const chosen = r.kind === 'option' ? q.options?.find((o) => o.id === r.optionId) : undefined;
  const correct = chosen?.id === right.id;
  const result: MarkResult = {
    correct,
    awarded: correct ? q.marks : -q.negativeMarks,
    max: q.marks,
    correctAnswerLabel: `(${right.id}) ${right.text}`,
  };
  if (!correct && chosen?.misconception) result.misconception = chosen.misconception;
  return result;
}

/** Strips the answer key before a question is sent to a student's browser. */
export function toStudentView(q: Question) {
  const { correctOptionId: _c, numeric, explanation: _e, steps: _s, provenance: _p, ...rest } = q;
  return {
    ...rest,
    options: q.options?.map(({ id, text }) => ({ id, text })),
    numericUnit: numeric?.unit,
  };
}
export type StudentQuestion = ReturnType<typeof toStudentView>;
