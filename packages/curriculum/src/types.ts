/**
 * Canonical curriculum model (master prompt §4).
 *
 * Board → CurriculumVersion → Grade → Subject → Unit → Chapter → Topic → LearningOutcome.
 *
 * Every node is pinned to a curriculum version (board + academic year). Two
 * boards can teach "the same" idea, but a chapter is never shared between
 * versions. Equivalence lives in `canonicalConceptIds`, a many-to-many link
 * that says "related", never "identical".
 */

export type BoardCode = 'CBSE';
export type AcademicYear = `${number}-${number}`;
export type Grade = 6 | 7 | 8 | 9 | 10;
export type SubjectCode = 'MATH' | 'SCI';

/** Which CBSE exam level a piece of content serves. */
export type Level = 'standard' | 'advanced' | 'basic';

/** CBSE marks some topics "formative only": taught, but not examined summatively. */
export type AssessmentScope = 'summative' | 'formative_only';

/** How confident we are that this row matches the official source. */
export type Confidence = 'high' | 'medium' | 'low';

export interface SourceRef {
  title: string;
  url: string;
  /** 1 = law/board/government … 5 = journalism/vendor (master prompt §58). */
  tier: 1 | 2 | 3 | 4 | 5;
  accessed: string; // ISO date
}

export interface CurriculumVersion {
  id: string; // e.g. "CBSE:2026-27"
  board: BoardCode;
  academicYear: AcademicYear;
  effectiveFrom: string;
  supersededOn?: string;
  sources: SourceRef[];
}

export interface Topic {
  id: string;
  title: string;
  learningOutcomes: string[];
  /** Official competency codes where the board publishes them (e.g. "C-3.2"). */
  competencyCodes: string[];
  canonicalConceptIds: string[];
  prerequisiteTopicIds: string[];
  assessmentScope: AssessmentScope;
  levels: Level[];
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  textbook: string;
  /** Periods recommended by the board, when published. Drives the pacing planner. */
  periods?: number;
  topics: Topic[];
  confidence: Confidence;
}

export interface Unit {
  id: string;
  title: string;
  /** Marks out of the 80-mark theory paper, when the board publishes them. */
  theoryMarks?: number;
  chapters: Chapter[];
}

export interface SubjectCurriculum {
  id: string; // e.g. "CBSE:2026-27:G9:MATH"
  versionId: string;
  grade: Grade;
  subject: SubjectCode;
  name: string;
  textbook: string;
  units: Unit[];
  sources: SourceRef[];
  notes: string[];
}
