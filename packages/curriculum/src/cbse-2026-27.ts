/**
 * CBSE 2026-27 · Classes 6–10 · Mathematics & Science.
 *
 * Chapters are numbered and titled exactly as printed in the NCERT books
 * (verified 2026-10-08 against the contents pages at ncert.nic.in/textbook/pdf/<code>ps.pdf).
 * Units and marks for Classes 9–10 come from the official CBSE Secondary
 * Curriculum 2026-27 PDFs. Where the CBSE syllabus names content differently
 * from the book, `boardSyllabusNames` keeps the board's wording.
 *
 * Structure only: titles, outcomes and marks. No textbook text is stored
 * (copyright, master prompt §9).
 */
import type {
  Chapter, Confidence, CurriculumVersion, Grade, SourceRef, SubjectCode, SubjectCurriculum, Topic, Unit,
} from './types';
import { G10_TOPICS } from './topics-g10';
import { G9_TOPICS } from './topics-g9';

const MAPPED_TOPICS: Record<string, Topic[]> = { ...G9_TOPICS, ...G10_TOPICS };

const ACCESSED = '2026-10-08';
const CBSE_BASE = 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/';

const cbse = (title: string, file: string): SourceRef => ({ title, url: CBSE_BASE + file, tier: 1, accessed: ACCESSED });
const ncert = (title: string, code: string): SourceRef => ({ title, url: `https://ncert.nic.in/textbook/pdf/${code}ps.pdf`, tier: 1, accessed: ACCESSED });

export const CBSE_2026_27: CurriculumVersion = {
  id: 'CBSE:2026-27',
  board: 'CBSE',
  academicYear: '2026-27',
  effectiveFrom: '2026-04-01',
  sources: [cbse('Secondary Curriculum Part 1 (2026-27)', 'Curriculum_SecP1_2026-27.pdf')],
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

/** [book number, book title, CBSE syllabus name(s)?, part?] */
type Row = [number, string, string[]?, (1 | 2)?];

const chapterId = (prefix: string, n: number, part?: 1 | 2) => `${prefix}-${part ? `p${part}` : ''}c${n}`;

function ch(prefix: string, textbook: string, [n, title, names, part]: Row, topics: Topic[] = [], periods?: number, confidence: Confidence = 'high'): Chapter {
  const id = chapterId(prefix, n, part);
  // Seed topics first, then the board-mapped topics for that chapter (C3).
  const c: Chapter = { id, number: n, title, textbook, topics: [...topics, ...(MAPPED_TOPICS[id] ?? [])], confidence };
  if (part) c.part = part;
  if (names) c.boardSyllabusNames = names;
  if (periods !== undefined) c.periods = periods;
  return c;
}

function subject(
  grade: Grade, subj: SubjectCode, name: string, textbook: string, units: Unit[], sources: SourceRef[], notes: string[] = [],
): SubjectCurriculum {
  return { id: `CBSE:2026-27:G${grade}:${subj}`, versionId: CBSE_2026_27.id, grade, subject: subj, name, textbook, units, sources, notes };
}

const CLASSES_6_8_NOTE = 'CBSE publishes no unit marks for Classes 6–8. Schools set their own term pattern (configured per school).';

// ───────────────────────── Class 6 ─────────────────────────
const GP6 = 'Ganita Prakash';
const g6m = subject(6, 'MATH', 'Mathematics', GP6, [{
  id: 'g6m-u', title: GP6, chapters: [
    ch('g6m', GP6, [1, 'Patterns in Mathematics']),
    ch('g6m', GP6, [2, 'Lines and Angles']),
    ch('g6m', GP6, [3, 'Number Play']),
    ch('g6m', GP6, [4, 'Data Handling and Presentation']),
    ch('g6m', GP6, [5, 'Prime Time'], [
      topic('g6m-c5-t1', 'Prime and composite numbers', {
        learningOutcomes: ['Identifies prime and composite numbers using factors', 'Tests divisibility by small primes'],
        canonicalConceptIds: ['concept:primes'],
      }),
      topic('g6m-c5-t2', 'Prime factorisation', { canonicalConceptIds: ['concept:prime-factorisation'], prerequisiteTopicIds: ['g6m-c5-t1'] }),
    ]),
    ch('g6m', GP6, [6, 'Perimeter and Area']),
    ch('g6m', GP6, [7, 'Fractions']),
    ch('g6m', GP6, [8, 'Playing with Constructions']),
    ch('g6m', GP6, [9, 'Symmetry']),
    ch('g6m', GP6, [10, 'The Other Side of Zero']),
  ],
}], [ncert('Ganita Prakash, Class 6', 'fegp1')], [CLASSES_6_8_NOTE]);

const CU6 = 'Curiosity';
const g6s = subject(6, 'SCI', 'Science', CU6, [{
  id: 'g6s-u', title: CU6, chapters: [
    ch('g6s', CU6, [1, 'The Wonderful World of Science']),
    ch('g6s', CU6, [2, 'Diversity in the Living World']),
    ch('g6s', CU6, [3, 'Mindful Eating: A Path to a Healthy Body']),
    ch('g6s', CU6, [4, 'Exploring Magnets'], [
      topic('g6s-c4-t1', 'Poles of a magnet and direction', {
        learningOutcomes: ['Explains that a freely suspended magnet aligns North–South', 'Uses a magnet to find direction (compass)'],
        canonicalConceptIds: ['concept:magnetic-poles'],
      }),
      topic('g6s-c4-t2', 'Attraction and repulsion between magnets', { prerequisiteTopicIds: ['g6s-c4-t1'] }),
    ]),
    ch('g6s', CU6, [5, 'Measurement of Length and Motion']),
    ch('g6s', CU6, [6, 'Materials Around Us']),
    ch('g6s', CU6, [7, 'Temperature and its Measurement']),
    ch('g6s', CU6, [8, 'A Journey through States of Water']),
    ch('g6s', CU6, [9, 'Methods of Separation in Everyday Life']),
    ch('g6s', CU6, [10, 'Living Creatures: Exploring their Characteristics']),
    ch('g6s', CU6, [11, "Nature's Treasures"]),
    ch('g6s', CU6, [12, 'Beyond Earth']),
  ],
}], [ncert('Curiosity, Class 6', 'fecu1')], [CLASSES_6_8_NOTE]);

// ───────────────────────── Class 7 ─────────────────────────
const GP7 = 'Ganita Prakash (Parts 1 & 2)';
const g7m = subject(7, 'MATH', 'Mathematics', GP7, [
  { id: 'g7m-u1', title: 'Ganita Prakash · Part 1', chapters: [
    ch('g7m', GP7, [1, 'Large Numbers Around Us', undefined, 1]),
    ch('g7m', GP7, [2, 'Arithmetic Expressions', undefined, 1]),
    ch('g7m', GP7, [3, 'A Peek Beyond the Point', undefined, 1]),
    ch('g7m', GP7, [4, 'Expressions using Letter-Numbers', undefined, 1]),
    ch('g7m', GP7, [5, 'Parallel and Intersecting Lines', undefined, 1]),
    ch('g7m', GP7, [6, 'Number Play', undefined, 1]),
    ch('g7m', GP7, [7, 'A Tale of Three Intersecting Lines', undefined, 1]),
    ch('g7m', GP7, [8, 'Working with Fractions', undefined, 1]),
  ] },
  { id: 'g7m-u2', title: 'Ganita Prakash · Part 2', chapters: [
    ch('g7m', GP7, [1, 'Geometric Twins', undefined, 2]),
    ch('g7m', GP7, [2, 'Operations with Integers', undefined, 2], [
      topic('g7m-p2c2-t1', 'Multiplying and dividing integers', {
        learningOutcomes: ['Multiplies integers using sign rules', 'Evaluates expressions with mixed integer operations'],
        canonicalConceptIds: ['concept:integer-operations'],
      }),
    ]),
    ch('g7m', GP7, [3, 'Finding Common Ground', undefined, 2]),
    ch('g7m', GP7, [4, 'Another Peek Beyond the Point', undefined, 2]),
    ch('g7m', GP7, [5, 'Connecting the Dots…', undefined, 2]),
    ch('g7m', GP7, [6, 'Constructions and Tilings', undefined, 2]),
    ch('g7m', GP7, [7, 'Finding the Unknown', undefined, 2]),
  ] },
], [ncert('Ganita Prakash, Class 7 Part 1', 'gegp1'), ncert('Ganita Prakash, Class 7 Part 2', 'gegp2')], [CLASSES_6_8_NOTE]);

const CU7 = 'Curiosity';
const g7s = subject(7, 'SCI', 'Science', CU7, [{
  id: 'g7s-u', title: CU7, chapters: [
    ch('g7s', CU7, [1, 'The Ever-Evolving World of Science']),
    ch('g7s', CU7, [2, 'Exploring Substances: Acidic, Basic, and Neutral'], [
      topic('g7s-c2-t1', 'Natural indicators (litmus, turmeric, china rose)', {
        learningOutcomes: ['Classifies substances as acidic, basic or neutral using natural indicators'],
        canonicalConceptIds: ['concept:acid-base-indicators'],
      }),
    ]),
    ch('g7s', CU7, [3, 'Electricity: Circuits and their Components']),
    ch('g7s', CU7, [4, 'The World of Metals and Non-metals']),
    ch('g7s', CU7, [5, 'Changes Around Us: Physical and Chemical']),
    ch('g7s', CU7, [6, 'Adolescence: A Stage of Growth and Change']),
    ch('g7s', CU7, [7, 'Heat Transfer in Nature']),
    ch('g7s', CU7, [8, 'Measurement of Time and Motion']),
    ch('g7s', CU7, [9, 'Life Processes in Animals']),
    ch('g7s', CU7, [10, 'Life Processes in Plants']),
    ch('g7s', CU7, [11, 'Light: Shadows and Reflections']),
    ch('g7s', CU7, [12, 'Earth, Moon, and the Sun']),
  ],
}], [ncert('Curiosity, Class 7', 'gecu1')], [CLASSES_6_8_NOTE, 'The 2026-27 reprint lists 12 chapters (an earlier listing showed a 13th, "Natural Resources", which is not in this reprint).']);

// ───────────────────────── Class 8 ─────────────────────────
const GP8 = 'Ganita Prakash (Parts 1 & 2)';
const g8m = subject(8, 'MATH', 'Mathematics', GP8, [
  { id: 'g8m-u1', title: 'Ganita Prakash · Part 1', chapters: [
    ch('g8m', GP8, [1, 'A Square and A Cube', undefined, 1], [
      topic('g8m-p1c1-t1', 'Perfect squares and prime factorisation', {
        learningOutcomes: ['Decides whether a number is a perfect square from its prime factorisation', 'Finds the least multiplier that makes a perfect square'],
        canonicalConceptIds: ['concept:perfect-squares'],
        prerequisiteTopicIds: ['g6m-c5-t2'],
      }),
      topic('g8m-p1c1-t2', 'Perfect cubes', { prerequisiteTopicIds: ['g8m-p1c1-t1'] }),
    ]),
    ch('g8m', GP8, [2, 'Power Play', undefined, 1]),
    ch('g8m', GP8, [3, 'A Story of Numbers', undefined, 1]),
    ch('g8m', GP8, [4, 'Quadrilaterals', undefined, 1]),
    ch('g8m', GP8, [5, 'Number Play', undefined, 1]),
    ch('g8m', GP8, [6, 'We Distribute, Yet Things Multiply', undefined, 1]),
    ch('g8m', GP8, [7, 'Proportional Reasoning-1', undefined, 1]),
  ] },
  { id: 'g8m-u2', title: 'Ganita Prakash · Part 2', chapters: [
    ch('g8m', GP8, [1, 'Fractions in Disguise', undefined, 2]),
    ch('g8m', GP8, [2, 'The Baudhayana-Pythagoras Theorem', undefined, 2]),
    ch('g8m', GP8, [3, 'Proportional Reasoning-2', undefined, 2]),
    ch('g8m', GP8, [4, 'Exploring Some Geometric Themes', undefined, 2]),
    ch('g8m', GP8, [5, 'Tales by Dots and Lines', undefined, 2]),
    ch('g8m', GP8, [6, 'Algebra Play', undefined, 2]),
    ch('g8m', GP8, [7, 'Area', undefined, 2]),
  ] },
], [ncert('Ganita Prakash, Class 8 Part 1', 'hegp1'), ncert('Ganita Prakash, Class 8 Part 2', 'hegp2')], [CLASSES_6_8_NOTE]);

const CU8 = 'Curiosity';
const g8s = subject(8, 'SCI', 'Science', CU8, [{
  id: 'g8s-u', title: CU8, chapters: [
    ch('g8s', CU8, [1, 'Exploring the Investigative World of Science']),
    ch('g8s', CU8, [2, 'The Invisible Living World: Beyond Our Naked Eye']),
    ch('g8s', CU8, [3, 'Health: The Ultimate Treasure']),
    ch('g8s', CU8, [4, 'Electricity: Magnetic and Heating Effects']),
    ch('g8s', CU8, [5, 'Exploring Forces'], [
      topic('g8s-c5-t1', 'Friction as a contact force', {
        learningOutcomes: ['Identifies friction as the force that opposes relative motion between surfaces in contact'],
        canonicalConceptIds: ['concept:friction'],
      }),
    ]),
    ch('g8s', CU8, [6, 'Pressure, Winds, Storms, and Cyclones']),
    ch('g8s', CU8, [7, 'Particulate Nature of Matter']),
    ch('g8s', CU8, [8, 'Nature of Matter: Elements, Compounds, and Mixtures']),
    ch('g8s', CU8, [9, 'The Amazing World of Solutes, Solvents, and Solutions']),
    ch('g8s', CU8, [10, 'Light: Mirrors and Lenses']),
    ch('g8s', CU8, [11, 'Keeping Time with the Skies']),
    ch('g8s', CU8, [12, 'How Nature Works in Harmony']),
    ch('g8s', CU8, [13, 'Our Home: Earth, a Unique Life Sustaining Planet']),
  ],
}], [ncert('Curiosity, Class 8', 'hecu1')], [CLASSES_6_8_NOTE]);

// ───────────────────────── Class 9 (CBSE units × NCERT Ganita Manjari) ─────────────────────────
const GM = 'Ganita Manjari (Parts 1 & 2)';
const g9m = subject(9, 'MATH', 'Mathematics', GM, [
  { id: 'g9m-u1', title: 'Number System', theoryMarks: 7, chapters: [
    ch('g9m', GM, [3, 'The World of Numbers', ['Number System']], [], 12),
  ] },
  { id: 'g9m-u2', title: 'Algebra', theoryMarks: 20, chapters: [
    ch('g9m', GM, [2, 'Introduction to Linear Polynomials', ['Introduction to Polynomials']], [
      topic('g9m-c2-t1', 'Zeros of a linear polynomial', {
        learningOutcomes: ['Defines a polynomial and its degree', 'Finds the zero of a linear polynomial', 'Models linear growth with linear polynomials'],
        competencyCodes: ['CG-3', 'C-3.2'],
        canonicalConceptIds: ['concept:polynomial-zeros'],
        levels: ['standard', 'advanced'],
      }),
    ]),
    ch('g9m', GM, [4, 'Exploring Algebraic Identities', ['Exploring Algebraic Identities']]),
    ch('g9m', GM, [8, 'Predicting What Comes Next: Exploring Sequences and Progressions', ['Sequences and Progressions']], [
      topic('g9m-c8-t1', 'Arithmetic progressions', { canonicalConceptIds: ['concept:arithmetic-progression'] }),
    ]),
    ch('g9m', GM, [13, 'Two Variables, One Line', ['Linear Equations in Two Variables']]),
  ] },
  { id: 'g9m-u3', title: 'Coordinate Geometry', theoryMarks: 4, chapters: [
    ch('g9m', GM, [1, 'Orienting Yourself: The Use of Coordinates', ['Coordinate Geometry']]),
  ] },
  { id: 'g9m-u4', title: 'Geometry', theoryMarks: 25, chapters: [
    ch('g9m', GM, [9, 'Propositions and their Converses', ["Introduction to Euclid's Geometry: Axioms and Postulates", 'Lines and Angles', 'Triangles – Congruence Theorems']], [], undefined, 'medium'),
    ch('g9m', GM, [12, 'Quadrilaterals', ['4-gons (Quadrilaterals)']]),
    ch('g9m', GM, [5, "I'm Up and Down, and Round and Round", ['Circles']]),
  ] },
  { id: 'g9m-u5', title: 'Mensuration', theoryMarks: 14, chapters: [
    ch('g9m', GM, [6, 'Measuring Space: Perimeter and Area', ['Area and Perimeter']]),
    ch('g9m', GM, [14, 'Math of Space: Surface Area and Volume', ['Surface Area and Volume']]),
  ] },
  { id: 'g9m-u6', title: 'Statistics and Probability', theoryMarks: 10, chapters: [
    ch('g9m', GM, [10, 'How Quantities Combine: Understanding Data', ['Statistics']], [], undefined, 'medium'),
    ch('g9m', GM, [7, 'The Mathematics of Maybe: Introduction to Probability', ['Introduction to Probability']]),
  ] },
  { id: 'g9m-u0', title: 'Not in the CBSE unit table', theoryMarks: 0, chapters: [
    ch('g9m', GM, [11, 'The World of Algorithms', ['(computational thinking, integrated across units)']], [], undefined, 'low'),
  ] },
], [
  cbse('Mathematics, Class IX (2026-27)', 'Maths_SecP1IX_2026-27.pdf'), cbse('Mathematics at Advanced Level (2026-27)', 'MathsAd_SecP1_2026-27.pdf'),
  ncert('Ganita Manjari Part 1', 'iemh1'), ncert('Ganita Manjari Part 2', 'iemh2'),
], [
  'Standard and Advanced levels from 2026-27. Advanced is an extra 25-mark, 1-hour HOTS paper, not added to the aggregate.',
  'CBSE names the syllabus chapters differently from the new NCERT book. Each chapter shows the book title; the CBSE syllabus name is kept alongside it. Two mappings (Propositions; Understanding Data) and The World of Algorithms need confirming with a CBSE teacher.',
]);

const EX = 'Exploration';
const g9s = subject(9, 'SCI', 'Science', EX, [
  { id: 'g9s-u1', title: 'World of Living', theoryMarks: 27, chapters: [
    ch('g9s', EX, [2, 'Cell: The Building Block of Life', ['Cell']], [], 12),
    ch('g9s', EX, [3, 'Tissues in Action', ['Tissues']], [], 13),
    ch('g9s', EX, [11, 'Reproduction: How Life Continues', ['Reproduction']], [], 13),
    ch('g9s', EX, [12, 'Patterns in Life: Diversity and Classification', ['Diversity']], [], 12),
  ] },
  { id: 'g9s-u2', title: 'Matter — Its Nature and Behaviour', theoryMarks: 25, chapters: [
    ch('g9s', EX, [5, 'Exploring Mixtures and their Separation'], [], 12),
    ch('g9s', EX, [8, 'Journey Inside the Atom', ['Structure of an Atom']], [], 14),
    ch('g9s', EX, [9, 'Atomic Foundations of Matter', ['Atoms and Molecules']], [], 14),
  ] },
  { id: 'g9s-u3', title: 'Motion, Force, Work and Sound', theoryMarks: 23, chapters: [
    ch('g9s', EX, [4, 'Describing Motion Around Us', ['Motion']], [
      topic('g9s-c4-t1', 'Uniform acceleration', {
        learningOutcomes: ['Calculates acceleration from change in velocity over time', 'Interprets velocity–time graphs'],
        canonicalConceptIds: ['concept:acceleration'],
        levels: ['standard', 'advanced'],
      }),
    ], 13),
    ch('g9s', EX, [6, 'How Forces Affect Motion', ['Force and Laws of Motion']], [], 13),
    ch('g9s', EX, [7, 'Work, Energy, and Simple Machines', ['Work, Energy and Simple Machines']], [], 13),
    ch('g9s', EX, [10, 'Sound Waves: Characteristics and Applications', ['Sound']], [], 11),
  ] },
  { id: 'g9s-u4', title: 'Earth as a System', theoryMarks: 5, chapters: [
    ch('g9s', EX, [13, 'Earth as a System: Energy, Matter, and Life'], [], 12),
  ] },
  { id: 'g9s-u0', title: 'Introduction (not in the unit table)', theoryMarks: 0, chapters: [
    ch('g9s', EX, [1, 'Exploration: Entering the World of Secondary Science'], [], undefined, 'medium'),
  ] },
], [
  cbse('Science, Class IX (2026-27)', 'ScienceSt_SecP1_2026-27.pdf'), cbse('Science at Advanced Level (2026-27)', 'ScienceAd_SecP1_2026-27.pdf'),
  ncert('Exploration, Class 9', 'iesc1'),
], ['Unit-to-chapter mapping taken from the CBSE course-structure table (World of Living: Ch 2, 3, 11, 12; Matter: Ch 5, 8, 9; Motion…: Ch 4, 6, 7, 10; Earth: Ch 13).']);

// ───────────────────────── Class 10 (CBSE units × NCERT books, unchanged for 2026-27) ─────────────────────────
const MX = 'Mathematics (NCERT, Class X)';
const g10m = subject(10, 'MATH', 'Mathematics', MX, [
  { id: 'g10m-u1', title: 'Number Systems', theoryMarks: 6, chapters: [ch('g10m', MX, [1, 'Real Numbers'])] },
  { id: 'g10m-u2', title: 'Algebra', theoryMarks: 20, chapters: [
    ch('g10m', MX, [2, 'Polynomials']),
    ch('g10m', MX, [3, 'Pair of Linear Equations in Two Variables']),
    ch('g10m', MX, [4, 'Quadratic Equations'], [
      topic('g10m-c4-t1', 'Nature of roots (discriminant)', {
        learningOutcomes: ['Determines the nature of roots using the discriminant', 'Solves quadratic equations by factorisation and the quadratic formula'],
        canonicalConceptIds: ['concept:quadratic-discriminant'],
        levels: ['standard', 'basic'],
      }),
    ]),
    ch('g10m', MX, [5, 'Arithmetic Progressions']),
  ] },
  { id: 'g10m-u3', title: 'Coordinate Geometry', theoryMarks: 6, chapters: [ch('g10m', MX, [7, 'Coordinate Geometry'])] },
  { id: 'g10m-u4', title: 'Geometry', theoryMarks: 15, chapters: [ch('g10m', MX, [6, 'Triangles']), ch('g10m', MX, [10, 'Circles'])] },
  { id: 'g10m-u5', title: 'Trigonometry', theoryMarks: 12, chapters: [
    ch('g10m', MX, [8, 'Introduction to Trigonometry', ['Introduction to Trigonometry', 'Trigonometric Identities']]),
    ch('g10m', MX, [9, 'Some Applications of Trigonometry', ['Heights and Distances']]),
  ] },
  { id: 'g10m-u6', title: 'Mensuration', theoryMarks: 10, chapters: [ch('g10m', MX, [11, 'Areas Related to Circles']), ch('g10m', MX, [12, 'Surface Areas and Volumes'])] },
  { id: 'g10m-u7', title: 'Statistics and Probability', theoryMarks: 11, chapters: [ch('g10m', MX, [13, 'Statistics']), ch('g10m', MX, [14, 'Probability'])] },
], [cbse('Mathematics, Class X (2026-27)', 'Maths_SecP1X_2026-27.pdf'), ncert('Mathematics, Class 10', 'jemh1')],
['2026-27 Class 10 keeps the Standard (041) / Basic (241) scheme. From 2027-28 this becomes Standard + Advanced.']);

const SX = 'Science (NCERT, Class X)';
const g10s = subject(10, 'SCI', 'Science', SX, [
  { id: 'g10s-u1', title: 'Chemical Substances — Nature and Behaviour', theoryMarks: 25, chapters: [
    ch('g10s', SX, [1, 'Chemical Reactions and Equations']), ch('g10s', SX, [2, 'Acids, Bases and Salts']),
    ch('g10s', SX, [3, 'Metals and Non-metals']), ch('g10s', SX, [4, 'Carbon and its Compounds']),
  ] },
  { id: 'g10s-u2', title: 'World of Living', theoryMarks: 25, chapters: [
    ch('g10s', SX, [5, 'Life Processes']), ch('g10s', SX, [6, 'Control and Coordination']),
    ch('g10s', SX, [7, 'How do Organisms Reproduce?']), ch('g10s', SX, [8, 'Heredity']),
  ] },
  { id: 'g10s-u3', title: 'Natural Phenomena', theoryMarks: 12, chapters: [
    ch('g10s', SX, [9, 'Light – Reflection and Refraction']), ch('g10s', SX, [10, 'The Human Eye and the Colourful World']),
  ] },
  { id: 'g10s-u4', title: 'Effects of Current', theoryMarks: 13, chapters: [
    ch('g10s', SX, [11, 'Electricity'], [
      topic('g10s-c11-t1', 'Resistors in series and parallel', {
        learningOutcomes: ['Calculates equivalent resistance of series and parallel combinations', "Applies Ohm's law to find current in a circuit"],
        canonicalConceptIds: ['concept:resistor-networks'],
      }),
    ]),
    ch('g10s', SX, [12, 'Magnetic Effects of Electric Current']),
  ] },
  { id: 'g10s-u5', title: 'Natural Resources', theoryMarks: 5, chapters: [ch('g10s', SX, [13, 'Our Environment'])] },
], [cbse('Science, Class X (2026-27)', 'Science_SecP1_2026-27.pdf'), ncert('Science, Class 10', 'jesc1')],
['Some topics are assessed formatively only (not in the Board paper). Flag them with assessmentScope=formative_only when the topics are mapped.']);

export const CBSE_2026_27_SUBJECTS: SubjectCurriculum[] = [g6m, g6s, g7m, g7s, g8m, g8s, g9m, g9s, g10m, g10s];
