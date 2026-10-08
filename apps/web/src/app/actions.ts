'use server';

import { getQuestion, markAnswer, type Response } from '@ieos/assessment';

/**
 * Marking runs on the server: the answer key never ships to the browser
 * (see toStudentView). The explanation is revealed only after submission.
 */
export async function submitAnswer(questionId: string, response: Response) {
  const q = getQuestion(questionId);
  if (!q) throw new Error('Unknown question');
  if (response.kind === 'numeric' && !Number.isFinite(response.value)) throw new Error('Enter a number');
  const result = markAnswer(q, response);
  return { ...result, explanation: q.explanation, steps: q.steps, correctOptionId: q.correctOptionId ?? null };
}

export async function submitDoubt(topicId: string, body: string) {
  const text = body.trim();
  if (text.length < 8) return { ok: false as const, error: 'Please describe your doubt in a little more detail.' };
  if (text.length > 1000) return { ok: false as const, error: 'Please keep it under 1000 characters.' };
  // Demo tenant: not persisted. Production writes doubt + sla_due_at and an audit event.
  return { ok: true as const, topicId, slaHours: 24 };
}
