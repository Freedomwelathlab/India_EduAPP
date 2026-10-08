import { describe, expect, it } from 'vitest';
import { INITIAL_MASTERY, observeAll, recommend, toScore, type TopicState } from './index';

const base: TopicState = {
  topicId: 't', topicTitle: 'Topic', mastery: 0.6, attempts: 4, lastPractisedDaysAgo: 1, prerequisites: [], hasVideo: true,
};

describe('BKT', () => {
  it('rises with correct answers and never reaches certainty', () => {
    const m = observeAll(INITIAL_MASTERY, Array(30).fill(true));
    expect(m).toBeLessThan(1);
    expect(toScore(m)).toBe(100);
  });
});

describe('recommend', () => {
  it('sends a student to a weak prerequisite first, and says why', () => {
    const [r] = recommend([{ ...base, prerequisites: [{ topicId: 'p', topicTitle: 'Prime factorisation', mastery: 0.3 }] }]);
    expect(r!.action).toBe('learn_prerequisite');
    expect(r!.topicId).toBe('p');
    expect(r!.because).toMatch(/Prime factorisation/);
  });

  it('starts an untouched topic with the video when one exists', () => {
    expect(recommend([{ ...base, attempts: 0 }])[0]!.action).toBe('watch_video');
  });

  it('raises a teacher-only alert when practice is not working', () => {
    const recs = recommend([{ ...base, attempts: 10, mastery: 0.3, topMisconception: 'sign error' }]);
    const alert = recs.find((r) => r.action === 'teacher_intervention')!;
    expect(alert.audience).toBe('teacher');
    expect(recs[0]).toBe(alert);
  });

  it('schedules revision for mastered-but-stale topics and stretch for fresh ones', () => {
    expect(recommend([{ ...base, mastery: 0.95, lastPractisedDaysAgo: 20 }])[0]!.action).toBe('revise');
    expect(recommend([{ ...base, mastery: 0.95, lastPractisedDaysAgo: 2 }])[0]!.action).toBe('stretch');
  });

  it('never shows a teacher-only label to a student', () => {
    const recs = recommend([{ ...base, attempts: 12, mastery: 0.2 }]);
    for (const r of recs.filter((x) => x.audience === 'student')) expect(r.because).not.toMatch(/risk/i);
  });
});
