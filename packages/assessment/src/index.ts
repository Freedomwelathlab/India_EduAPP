export * from './types';
export * from './marking';
export * from './scoring';
export * from './blueprint';
export { SEED_QUESTIONS } from './questions';

import { SEED_QUESTIONS } from './questions';
export const getQuestion = (id: string) => SEED_QUESTIONS.find((q) => q.id === id);
export const questionsForTopic = (topicId: string) => SEED_QUESTIONS.filter((q) => q.topicId === topicId);
