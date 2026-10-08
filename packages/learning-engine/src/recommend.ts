/**
 * Explainable next-step recommender (master prompt §8).
 *
 * Every recommendation carries a plain-language `because` that a teacher can
 * read and override. Labels that could hurt a child ("at risk") are
 * `audience: 'teacher'` only.
 */
import { toScore } from './bkt';

export interface TopicState {
  topicId: string;
  topicTitle: string;
  mastery: number; // BKT belief 0–1
  attempts: number;
  lastPractisedDaysAgo: number | null;
  prerequisites: Array<{ topicId: string; topicTitle: string; mastery: number }>;
  /** Most frequent misconception among recent wrong answers, if any. */
  topMisconception?: string;
  hasVideo: boolean;
}

export type Action = 'learn_prerequisite' | 'watch_video' | 'practise' | 'revise' | 'stretch' | 'teacher_intervention';

export interface Recommendation {
  action: Action;
  topicId: string;
  because: string;
  audience: 'student' | 'teacher';
  priority: number; // higher = sooner
}

export const MASTERED = 0.85;
const SHAKY = 0.5;
const FORGETTING_DAYS = 14;

export function recommend(states: TopicState[]): Recommendation[] {
  const out: Recommendation[] = [];
  for (const s of states) {
    const weakPrereq = s.prerequisites.find((p) => p.mastery < SHAKY);
    if (weakPrereq && s.mastery < MASTERED) {
      out.push({
        action: 'learn_prerequisite', topicId: weakPrereq.topicId, audience: 'student', priority: 90,
        because: `"${s.topicTitle}" builds on "${weakPrereq.topicTitle}", which is not secure yet (${toScore(weakPrereq.mastery)}%). Strengthen that first.`,
      });
      continue;
    }
    if (s.attempts === 0) {
      out.push({
        action: s.hasVideo ? 'watch_video' : 'practise', topicId: s.topicId, audience: 'student', priority: 60,
        because: s.hasVideo ? `You haven't started "${s.topicTitle}". Begin with the short video, then two check questions.` : `You haven't started "${s.topicTitle}" yet.`,
      });
      continue;
    }
    if (s.attempts >= 8 && s.mastery < SHAKY) {
      out.push({
        action: 'teacher_intervention', topicId: s.topicId, audience: 'teacher', priority: 95,
        because: `${s.attempts} attempts on "${s.topicTitle}" and mastery is still ${toScore(s.mastery)}%.${s.topMisconception ? ` Repeated error: ${s.topMisconception}` : ''} Practice alone is not closing the gap.`,
      });
    }
    if (s.mastery < MASTERED) {
      out.push({
        action: 'practise', topicId: s.topicId, audience: 'student', priority: 70 + Math.round((MASTERED - s.mastery) * 20),
        because: s.topMisconception
          ? `Recent mistakes on "${s.topicTitle}" show the same pattern: ${s.topMisconception}`
          : `"${s.topicTitle}" is at ${toScore(s.mastery)}%. A few more questions will make it secure.`,
      });
    } else if ((s.lastPractisedDaysAgo ?? 0) >= FORGETTING_DAYS) {
      out.push({
        action: 'revise', topicId: s.topicId, audience: 'student', priority: 50,
        because: `You mastered "${s.topicTitle}", but it was ${s.lastPractisedDaysAgo} days ago. A quick review keeps it from fading.`,
      });
    } else {
      out.push({
        action: 'stretch', topicId: s.topicId, audience: 'student', priority: 20,
        because: `"${s.topicTitle}" is secure. Try an Advanced-level challenge.`,
      });
    }
  }
  return out.sort((a, b) => b.priority - a.priority);
}
