/**
 * CBSE 2026-27 · Classes 6–10 · Mathematics & Science.
 *
 * Classes 9–10: transcribed from the official CBSE Secondary Curriculum
 * 2026-27 subject PDFs (Tier 1). Classes 6–8: NCERT chapter lists from Tier-5
 * listings, flagged `confidence: 'medium'` until checked against
 * ncert.nic.in. See docs/curriculum/01-cbse-6-10-maths-science-analysis.md.
 *
 * Structure only: titles, outcomes and marks. No textbook text is stored
 * (copyright, master prompt §9).
 */
import type {
  Chapter, Confidence, CurriculumVersion, Grade, SourceRef, SubjectCode, SubjectCurriculum, Topic, Unit,
} from './types';

const ACCESSED = '2026-10-08';
const CBSE_BASE = 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/';

const src = (title: string, file: string): SourceRef => ({ title, url: CBSE_BASE + file, tier: 1, accessed: ACCESSED });
const ncert = (title: string): SourceRef => ({ title, url: 'https://ncert.nic.in/textbook.php', tier: 5, accessed: ACCESSED });

export const CBSE_2026_27: CurriculumVersion = {
  id: 'CBSE:2026-27',
  board: 'CBSE',
  academicYear: '2026-27',
  effectiveFrom: '2026-04-01',
  sources: [src('Secondary Curriculum Part 1 (2026-27)', 'Curriculum_SecP1_2026-27.pdf')],
};

function topic(id: string, title: string, o: Partial<Topic> = {}): Topic {
  return {
    id, title,
    learningOutcomes: o.learningOutcomes ?? [],
    competencyCodes: o.competencyCodes ?? [],
    canonicalConceptIds: o.canonicalConceptIds ?? [],
    prerequisiteTopicIds: o.prerequisiteTopicIds ?? [],
    assessmentScope: o.assessmentScope ?? 'summative',
    levels: o.levels ?? ['standard'],
  };
}

function chapters(
  prefix: string, textbook: string, titles: string[], confidence: Confidence,
  topics: Record<number, Topic[]> = {}, periods: Record<number, number> = {},
): Chapter[] {
  return titles.map((title, i) => {
    const n = i + 1;
    const ch: Chapter = { id: `${prefix}-c${n}`, number: n, title, textbook, topics: topics[n] ?? [], confidence };
    if (periods[n] !== undefined) ch.periods = periods[n];
    return ch;
  });
}

/** Classes 6–8 have no board-published unit marks: one pseudo-unit per book. */
function singleUnit(id: string, title: string, chs: Chapter[]): Unit[] {
  return [{ id, title, chapters: chs }];
}

function subject(
  grade: Grade, subj: SubjectCode, name: string, textbook: string, units: Unit[], sources: SourceRef[], notes: string[] = [],
): SubjectCurriculum {
  return { id: `CBSE:2026-27:G${grade}:${subj}`, versionId: CBSE_2026_27.id, grade, subject: subj, name, textbook, units, sources, notes };
}

// ───────────────────────── Class 6 ─────────────────────────
const g6m = subject(6, 'MATH', 'Mathematics', 'Ganita Prakash', singleUnit('g6m-u', 'Ganita Prakash', chapters('g6m', 'Ganita Prakash', [
  'Patterns in Mathematics', 'Lines and Angles', 'Number Play', 'Data Handling and Presentation', 'Prime Time',
  'Perimeter and Area', 'Fractions', 'Playing with Constructions', 'Symmetry', 'The Other Side of Zero',
], 'medium', {
  5: [
    topic('g6m-c5-t1', 'Prime and composite numbers', {
      learningOutcomes: ['Identifies prime and composite numbers using factors', 'Tests divisibility by small primes'],
      canonicalConceptIds: ['concept:primes'],
    }),
    topic('g6m-c5-t2', 'Prime factorisation', { canonicalConceptIds: ['concept:prime-factorisation'], prerequisiteTopicIds: ['g6m-c5-t1'] }),
  ],
})), [ncert('Ganita Prakash, Class 6')]);

const g6s = subject(6, 'SCI', 'Science', 'Curiosity', singleUnit('g6s-u', 'Curiosity', chapters('g6s', 'Curiosity', [
  'The Wonderful World of Science', 'Diversity in the Living World', 'Mindful Eating: A Path to a Healthy Body',
  'Exploring Magnets', 'Measurement of Length and Motion', 'Materials Around Us', 'Temperature and its Measurement',
  'A Journey through States of Water', 'Methods of Separation in Everyday Life', 'Living Creatures: Exploring their Characteristics',
  "Nature's Treasures", 'Beyond Earth',
], 'medium', {
  4: [
    topic('g6s-c4-t1', 'Poles of a magnet and direction', {
      learningOutcomes: ['Explains that a freely suspended magnet aligns North–South', 'Uses a magnet to find direction (compass)'],
      canonicalConceptIds: ['concept:magnetic-poles'],
    }),
    topic('g6s-c4-t2', 'Attraction and repulsion between magnets', { prerequisiteTopicIds: ['g6s-c4-t1'] }),
  ],
})), [ncert('Curiosity, Class 6')]);

// ───────────────────────── Class 7 ─────────────────────────
const g7m = subject(7, 'MATH', 'Mathematics', 'Ganita Prakash (Parts 1 & 2)', singleUnit('g7m-u', 'Ganita Prakash', chapters('g7m', 'Ganita Prakash', [
  'Large Numbers Around Us', 'Arithmetic Expressions', 'A Peek Beyond the Point', 'Expressions using Letter-Numbers',
  'Parallel and Intersecting Lines', 'Number Play', 'Geometric Twins', 'Operations with Integers', 'Finding Common Ground',
  'Another Peek Beyond the Point', 'Connecting the Dots…', 'Constructions and Tilings',
], 'low', {
  8: [
    topic('g7m-c8-t1', 'Multiplying and dividing integers', {
      learningOutcomes: ['Multiplies integers using sign rules', 'Evaluates expressions with mixed integer operations'],
      canonicalConceptIds: ['concept:integer-operations'],
    }),
  ],
})), [ncert('Ganita Prakash, Class 7')], ['Chapter list incomplete in sources read so far; verify on ncert.nic.in before content production.']);

const g7s = subject(7, 'SCI', 'Science', 'Curiosity', singleUnit('g7s-u', 'Curiosity', chapters('g7s', 'Curiosity', [
  'The Ever-Evolving World of Science', 'Exploring Substances: Acidic, Basic, and Neutral', 'Electricity: Circuits and their Components',
  'The World of Metals and Non-metals', 'Changes around Us: Physical and Chemical', 'Adolescence: A Stage of Growth and Change',
  'Heat Transfer in Nature', 'Measurement of Time and Motion', 'Life Processes in Animals', 'Life Processes in Plants',
  'Light: Shadows and Reflections', 'Earth, Moon, and the Sun', 'Natural Resources: Air, Water and Soil',
], 'medium', {
  2: [
    topic('g7s-c2-t1', 'Natural indicators (litmus, turmeric, china rose)', {
      learningOutcomes: ['Classifies substances as acidic, basic or neutral using natural indicators'],
      canonicalConceptIds: ['concept:acid-base-indicators'],
    }),
  ],
})), [ncert('Curiosity, Class 7')]);

// ───────────────────────── Class 8 ─────────────────────────
const g8m = subject(8, 'MATH', 'Mathematics', 'Ganita Prakash (Parts 1 & 2)', singleUnit('g8m-u', 'Ganita Prakash', chapters('g8m', 'Ganita Prakash', [
  'A Square and a Cube', 'Power Play', 'A Story of Numbers', 'Quadrilaterals', 'Number Play',
  'We Distribute, Yet Things Multiply', 'Proportional Reasoning-1', 'Fractions in Disguise', 'The Baudhayana-Pythagoras Theorem',
  'Proportional Reasoning-2', 'Exploring Some Geometric Themes', 'Tales by Dots and Lines', 'Algebra Play', 'Area',
], 'medium', {
  1: [
    topic('g8m-c1-t1', 'Perfect squares and prime factorisation', {
      learningOutcomes: ['Decides whether a number is a perfect square from its prime factorisation', 'Finds the least multiplier that makes a perfect square'],
      canonicalConceptIds: ['concept:perfect-squares'],
      prerequisiteTopicIds: ['g6m-c5-t2'],
    }),
    topic('g8m-c1-t2', 'Perfect cubes', { prerequisiteTopicIds: ['g8m-c1-t1'] }),
  ],
})), [ncert('Ganita Prakash, Class 8')]);

const g8s = subject(8, 'SCI', 'Science', 'Curiosity', singleUnit('g8s-u', 'Curiosity', chapters('g8s', 'Curiosity', [
  'Exploring the Investigative World of Science', 'The Invisible Living World: Beyond Our Naked Eye', 'Health: The Ultimate Treasure',
  'Electricity: Magnetic and Heating Effects', 'Exploring Forces', 'Pressure, Winds, Storms, and Cyclones', 'Particulate Nature of Matter',
  'Nature of Matter: Elements, Compounds, and Mixtures', 'The Amazing World of Solutes, Solvents, and Solutions',
  'Light: Mirrors and Lenses', 'Keeping Time with the Skies', 'How Nature Works in Harmony', 'Our Home: Earth, a Unique Life Sustaining Planet',
], 'medium', {
  5: [
    topic('g8s-c5-t1', 'Friction as a contact force', {
      learningOutcomes: ['Identifies friction as the force that opposes relative motion between surfaces in contact'],
      canonicalConceptIds: ['concept:friction'],
    }),
  ],
})), [ncert('Curiosity, Class 8')]);

// ───────────────────────── Class 9 (official 2026-27) ─────────────────────────
const g9mSrc = [src('Mathematics, Class IX (2026-27)', 'Maths_SecP1IX_2026-27.pdf'), src('Mathematics at Advanced Level (2026-27)', 'MathsAd_SecP1_2026-27.pdf')];
const g9m = subject(9, 'MATH', 'Mathematics', 'Ganita Manjari (Parts 1 & 2)', [
  { id: 'g9m-u1', title: 'Number System', theoryMarks: 7, chapters: chapters('g9m-u1', 'Ganita Manjari', ['Number System'], 'high', {}, { 1: 12 }) },
  { id: 'g9m-u2', title: 'Algebra', theoryMarks: 20, chapters: chapters('g9m-u2', 'Ganita Manjari', [
    'Introduction to Polynomials', 'Sequences and Progressions', 'Exploring Algebraic Identities', 'Linear Equations in Two Variables',
  ], 'high', {
    1: [
      topic('g9m-u2-c1-t1', 'Zeros of a linear polynomial', {
        learningOutcomes: ['Defines a polynomial and its degree', 'Finds the zero of a linear polynomial', 'Models linear growth with linear polynomials'],
        competencyCodes: ['CG-3', 'C-3.2'],
        canonicalConceptIds: ['concept:polynomial-zeros'],
        levels: ['standard', 'advanced'],
      }),
    ],
    2: [topic('g9m-u2-c2-t1', 'Arithmetic progressions', { canonicalConceptIds: ['concept:arithmetic-progression'] })],
  }) },
  { id: 'g9m-u3', title: 'Coordinate Geometry', theoryMarks: 4, chapters: chapters('g9m-u3', 'Ganita Manjari', ['Coordinate Geometry'], 'high') },
  { id: 'g9m-u4', title: 'Geometry', theoryMarks: 25, chapters: chapters('g9m-u4', 'Ganita Manjari', [
    "Introduction to Euclid's Geometry: Axioms and Postulates", 'Lines and Angles', 'Triangles: Congruence Theorems', '4-gons (Quadrilaterals)', 'Circles',
  ], 'high') },
  { id: 'g9m-u5', title: 'Mensuration', theoryMarks: 14, chapters: chapters('g9m-u5', 'Ganita Manjari', ['Area and Perimeter', 'Surface Area and Volume'], 'high') },
  { id: 'g9m-u6', title: 'Statistics and Probability', theoryMarks: 10, chapters: chapters('g9m-u6', 'Ganita Manjari', ['Statistics', 'Introduction to Probability'], 'high') },
], g9mSrc, ['Standard and Advanced levels from 2026-27. Advanced is an extra 25-mark, 1-hour HOTS paper, not added to the aggregate.']);

const g9sSrc = [src('Science, Class IX (2026-27)', 'ScienceSt_SecP1_2026-27.pdf'), src('Science at Advanced Level (2026-27)', 'ScienceAd_SecP1_2026-27.pdf')];
const g9s = subject(9, 'SCI', 'Science', 'Exploration', [
  { id: 'g9s-u1', title: 'Matter — Its Nature and Behaviour', theoryMarks: 27, chapters: chapters('g9s-u1', 'Exploration', [
    'Exploring Mixtures and their Separation', 'Structure of an Atom', 'Atoms and Molecules',
  ], 'medium', {}, { 1: 12, 2: 14, 3: 14 }) },
  { id: 'g9s-u2', title: 'World of Living', theoryMarks: 25, chapters: chapters('g9s-u2', 'Exploration', ['Cell', 'Tissues', 'Reproduction', 'Diversity'], 'medium', {}, { 1: 12, 2: 13, 3: 13, 4: 12 }) },
  { id: 'g9s-u3', title: 'Motion, Force, Work and Sound', theoryMarks: 23, chapters: chapters('g9s-u3', 'Exploration', [
    'Motion', 'Force and Laws of Motion', 'Work, Energy and Simple Machines', 'Sound',
  ], 'medium', {
    1: [
      topic('g9s-u3-c1-t1', 'Uniform acceleration', {
        learningOutcomes: ['Calculates acceleration from change in velocity over time', 'Interprets velocity–time graphs'],
        canonicalConceptIds: ['concept:acceleration'],
        levels: ['standard', 'advanced'],
      }),
    ],
  }, { 1: 13, 2: 13, 3: 13, 4: 11 }) },
  { id: 'g9s-u4', title: 'Earth as a System', theoryMarks: 5, chapters: chapters('g9s-u4', 'Exploration', ['Earth as a System: Energy, Matter & Life'], 'medium', {}, { 1: 12 }) },
], g9sSrc, ['Chapter-to-unit mapping extracted from a layout table; confidence medium until re-verified.']);

// ───────────────────────── Class 10 (official 2026-27) ─────────────────────────
const g10m = subject(10, 'MATH', 'Mathematics', 'Mathematics (NCERT, Class X)', [
  { id: 'g10m-u1', title: 'Number Systems', theoryMarks: 6, chapters: chapters('g10m-u1', 'Mathematics X', ['Real Numbers'], 'high') },
  { id: 'g10m-u2', title: 'Algebra', theoryMarks: 20, chapters: chapters('g10m-u2', 'Mathematics X', [
    'Polynomials', 'Pair of Linear Equations in Two Variables', 'Quadratic Equations', 'Arithmetic Progressions',
  ], 'high', {
    3: [
      topic('g10m-u2-c3-t1', 'Nature of roots (discriminant)', {
        learningOutcomes: ['Determines the nature of roots using the discriminant', 'Solves quadratic equations by factorisation and the quadratic formula'],
        canonicalConceptIds: ['concept:quadratic-discriminant'],
        levels: ['standard', 'basic'],
      }),
    ],
  }) },
  { id: 'g10m-u3', title: 'Coordinate Geometry', theoryMarks: 6, chapters: chapters('g10m-u3', 'Mathematics X', ['Coordinate Geometry'], 'high') },
  { id: 'g10m-u4', title: 'Geometry', theoryMarks: 15, chapters: chapters('g10m-u4', 'Mathematics X', ['Triangles', 'Circles'], 'high') },
  { id: 'g10m-u5', title: 'Trigonometry', theoryMarks: 12, chapters: chapters('g10m-u5', 'Mathematics X', [
    'Introduction to Trigonometry', 'Trigonometric Identities', 'Heights and Distances',
  ], 'high') },
  { id: 'g10m-u6', title: 'Mensuration', theoryMarks: 10, chapters: chapters('g10m-u6', 'Mathematics X', ['Areas Related to Circles', 'Surface Areas and Volumes'], 'high') },
  { id: 'g10m-u7', title: 'Statistics and Probability', theoryMarks: 11, chapters: chapters('g10m-u7', 'Mathematics X', ['Statistics', 'Probability'], 'high') },
], [src('Mathematics, Class X (2026-27)', 'Maths_SecP1X_2026-27.pdf')],
['2026-27 Class 10 keeps the Standard (041) / Basic (241) scheme. From 2027-28 this becomes Standard + Advanced.']);

const g10s = subject(10, 'SCI', 'Science', 'Science (NCERT, Class X)', [
  { id: 'g10s-u1', title: 'Chemical Substances — Nature and Behaviour', theoryMarks: 25, chapters: chapters('g10s-u1', 'Science X', [
    'Chemical Reactions and Equations', 'Acids, Bases and Salts', 'Metals and Non-metals', 'Carbon and its Compounds',
  ], 'high') },
  { id: 'g10s-u2', title: 'World of Living', theoryMarks: 25, chapters: chapters('g10s-u2', 'Science X', [
    'Life Processes', 'Control and Coordination', 'How do Organisms Reproduce?', 'Heredity',
  ], 'high') },
  { id: 'g10s-u3', title: 'Natural Phenomena', theoryMarks: 12, chapters: chapters('g10s-u3', 'Science X', [
    'Light — Reflection and Refraction', 'The Human Eye and the Colourful World',
  ], 'high') },
  { id: 'g10s-u4', title: 'Effects of Current', theoryMarks: 13, chapters: chapters('g10s-u4', 'Science X', ['Electricity', 'Magnetic Effects of Electric Current'], 'high', {
    1: [
      topic('g10s-u4-c1-t1', 'Resistors in series and parallel', {
        learningOutcomes: ['Calculates equivalent resistance of series and parallel combinations', "Applies Ohm's law to find current in a circuit"],
        canonicalConceptIds: ['concept:resistor-networks'],
      }),
    ],
  }) },
  { id: 'g10s-u5', title: 'Natural Resources', theoryMarks: 5, chapters: chapters('g10s-u5', 'Science X', ['Our Environment'], 'high') },
], [src('Science, Class X (2026-27)', 'Science_SecP1_2026-27.pdf')],
['Some topics are assessed formatively only (not in the Board paper). Flag them with assessmentScope=formative_only when the topics are mapped.']);

export const CBSE_2026_27_SUBJECTS: SubjectCurriculum[] = [g6m, g6s, g7m, g7s, g8m, g8s, g9m, g9s, g10m, g10s];
