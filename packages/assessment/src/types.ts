import type { Grade, Level, SubjectCode } from '@ieos/curriculum';

export type QuestionType = 'mcq' | 'assertion_reason' | 'numeric' | 'case_based';

/** CBSE groups cognitive demand into three bands in its question-paper designs. */
export type CognitiveBand = 'remember_understand' | 'apply' | 'analyse_evaluate_create';

export type ReviewStatus = 'draft' | 'ai_assisted' | 'expert_reviewed' | 'assessment_reviewed' | 'published' | 'retired';

export interface Option {
  id: string;
  text: string;
  /** Why a student picks this wrong option. Drives remediation. */
  misconception?: string;
}

export interface NumericAnswer {
  value: number;
  tolerance: number;
  unit?: string;
}

export interface Question {
  id: string;
  versionId: string;
  grade: Grade;
  subject: SubjectCode;
  topicId: string;
  type: QuestionType;
  level: Level;
  /** Shared passage or case for case-based and source-based items. */
  context?: string;
  stem: string;
  options?: Option[];
  correctOptionId?: string;
  numeric?: NumericAnswer;
  explanation: string;
  /** Worked steps shown after answering. */
  steps: string[];
  cognitive: CognitiveBand;
  /** 1 (easiest) … 10 (hardest). Same scale as the PSLE engine. */
  difficultyTier: number;
  marks: number;
  negativeMarks: number;
  expectedSeconds: number;
  competencyCodes: string[];
  provenance: {
    source: 'original' | 'licensed' | 'board_sample';
    licence: string;
    author: string;
    reviewStatus: ReviewStatus;
    aiModelVersion?: string;
  };
}

export type Response =
  | { kind: 'option'; optionId: string }
  | { kind: 'numeric'; value: number };

export interface MarkResult {
  correct: boolean;
  awarded: number;
  max: number;
  correctAnswerLabel: string;
  misconception?: string;
}
