// Ported from PSLE-Platform packages/mastery/src/bkt.ts (same owner). Keep the two in sync deliberately, not by copy-paste drift.
/**
 * Bayesian Knowledge Tracing.
 *
 * Mastery is not a running average of marks. It is a belief — the probability
 * that a student has actually learned a skill — updated after every answer.
 * The distinction matters here: a four-option question can be answered
 * correctly by luck, and a student who understands a skill can still slip. A
 * plain percentage treats both as fact and produces a score that lurches
 * around. BKT discounts each piece of evidence by how likely it was to be
 * noise, so the number a parent reads stays stable and honest.
 */

export interface BktParams {
  /** P(knows the skill) before any evidence. */
  prior: number;
  /** P(learns it between one question and the next). */
  transit: number;
  /** P(answers wrongly despite knowing it). */
  slip: number;
  /** P(answers correctly without knowing it). */
  guess: number;
}

/**
 * Tuned for four-option multiple choice, which is also the CBSE Section A format:
 * guess is 1/4 because a blind pick lands one time in four. Slip is
 * deliberately low — a careless error should dent the score, not erase it.
 */
export const DEFAULT_PARAMS: BktParams = {
  prior: 0.25,
  transit: 0.16,
  slip: 0.1,
  guess: 0.25,
};

/** Belief for a student who has never attempted the skill. */
export const INITIAL_MASTERY = DEFAULT_PARAMS.prior;

/**
 * A word problem or experiment answer cannot be produced by a blind pick the
 * way a four-option MCQ can, so a guess this unlikely (1 in 20, not 1 in 4)
 * is what keeps a genuinely correct free-response answer from being
 * discounted as luck the way DEFAULT_PARAMS would. Essay writing is marked
 * by rubric band and does not use this — see the writing report instead of
 * a mastery bar.
 */
export const FREE_RESPONSE_PARAMS: BktParams = { ...DEFAULT_PARAMS, guess: 0.05 };

/**
 * Belief is capped short of certainty, and must stay there.
 *
 * A belief of exactly 1.0 is absorbing: P(answer | knows) can no longer move
 * it, so a student who reached certainty could answer every subsequent
 * question wrongly and the model would go on insisting they had mastered the
 * skill. The cap is what keeps a wrong answer meaningful forever.
 *
 * This is deliberately *not* the number a child sees. A ceiling of 99% reads
 * as "not quite good enough" however hard they work, which is the opposite of
 * what the score is for — so `toScore` reports progress against this maximum,
 * and mastering a skill shows as a full 100.
 */
export const MAX_MASTERY = 0.99;

function assertProbability(p: number, label: string): void {
  if (!Number.isFinite(p) || p < 0 || p > 1) {
    throw new Error(`${label} must be a number between 0 and 1, got ${p}`);
  }
}

/**
 * Folds one answer into the current belief.
 *
 * Two steps, in this order: condition on the evidence (Bayes), then apply the
 * chance the student learned something from the attempt itself. The second
 * step is why a wrong answer never drives belief to zero — attempting a
 * question is also a chance to learn from it.
 */
export function observe(
  mastery: number,
  correct: boolean,
  params: BktParams = DEFAULT_PARAMS,
): number {
  assertProbability(mastery, 'mastery');

  const { transit, slip, guess } = params;

  // P(observed answer | knows) and P(observed answer | does not know)
  const givenKnows = correct ? 1 - slip : slip;
  const givenNot = correct ? guess : 1 - guess;

  const joint = mastery * givenKnows + (1 - mastery) * givenNot;
  // Degenerate parameters could make the evidence impossible; hold belief
  // steady rather than dividing by zero.
  const posterior = joint === 0 ? mastery : (mastery * givenKnows) / joint;

  return Math.min(posterior + (1 - posterior) * transit, MAX_MASTERY);
}

/** Replays a sequence of answers, oldest first. */
export function observeAll(
  mastery: number,
  answers: readonly boolean[],
  params: BktParams = DEFAULT_PARAMS,
): number {
  return answers.reduce<number>((p, correct) => observe(p, correct, params), mastery);
}

/**
 * The 0–100 figure shown in the interface.
 *
 * Belief is reported as a percentage of `MAX_MASTERY`, not of 1.0, so a
 * student who has genuinely mastered a skill sees 100 rather than a permanent
 * 99. The belief underneath still never reaches certainty, so a wrong answer
 * always moves the number back down — the full score is honest about
 * attainment without claiming the child can no longer slip.
 */
export function toScore(mastery: number): number {
  assertProbability(mastery, 'mastery');
  return Math.min(100, Math.round((mastery / MAX_MASTERY) * 100));
}

/**
 * The inverse of `toScore`, for reading a stored score back into a belief.
 *
 * Scores persist as integers, so every read has to undo the display mapping.
 * Dividing by 100 by hand — which three call sites used to do — understates
 * belief by the scale factor and made mastery drift downwards a little on
 * every save.
 */
export function fromScore(score: number): number {
  const clamped = Math.max(0, Math.min(100, score));
  return (clamped / 100) * MAX_MASTERY;
}
