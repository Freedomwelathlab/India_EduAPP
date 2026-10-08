/**
 * Seed bank: one original question per Class × Subject (V1 skeleton).
 *
 * All items are original (not copied from NCERT or CBSE papers). The answers
 * were worked by hand and are re-checked in questions.test.ts. Status stays
 * `draft` until a named subject expert reviews them (content gate, §37).
 */
import type { Question } from './types';

const prov = { source: 'original', licence: 'proprietary', author: 'IEOS content (draft)', reviewStatus: 'draft' } as const;
const V = 'CBSE:2026-27';

export const SEED_QUESTIONS: Question[] = [
  {
    id: 'q-g6m-001', versionId: V, grade: 6, subject: 'MATH', topicId: 'g6m-c5-t1', type: 'mcq', level: 'standard',
    stem: 'Which of these numbers is a prime number?',
    options: [
      { id: 'a', text: '51', misconception: 'Odd numbers are not always prime: 51 = 3 × 17.' },
      { id: 'b', text: '57', misconception: '57 looks prime, but 57 = 3 × 19. Check divisibility by 3 using the digit sum (5 + 7 = 12).' },
      { id: 'c', text: '61' },
      { id: 'd', text: '91', misconception: '91 = 7 × 13. Remember to test 7, not only 2, 3 and 5.' },
    ],
    correctOptionId: 'c',
    explanation: '61 has exactly two factors, 1 and 61. Each of the other numbers has a factor other than 1 and itself.',
    steps: ['A prime has exactly two factors.', 'Test the primes up to √61 ≈ 7.8, that is 2, 3, 5 and 7.', '61 is not divisible by any of them, so 61 is prime.', '51 = 3×17, 57 = 3×19, 91 = 7×13 are composite.'],
    cognitive: 'apply', difficultyTier: 4, marks: 1, negativeMarks: 0, expectedSeconds: 60, competencyCodes: [], provenance: prov,
  },
  {
    id: 'q-g6s-001', versionId: V, grade: 6, subject: 'SCI', topicId: 'g6s-c4-t1', type: 'mcq', level: 'standard',
    stem: 'A bar magnet is hung freely from a thread so that it can turn. When it comes to rest, in which direction does it point?',
    options: [
      { id: 'a', text: 'East–West', misconception: 'A freely hanging magnet lines up with the Earth\'s magnetism, which runs roughly North–South.' },
      { id: 'b', text: 'North–South' },
      { id: 'c', text: 'Any direction, depending on how it was hung', misconception: 'It always settles in the same direction. That is why a compass works.' },
      { id: 'd', text: 'Towards the nearest iron object, always', misconception: 'Nearby iron can disturb it, but with no iron close by it points North–South.' },
    ],
    correctOptionId: 'b',
    explanation: 'A freely suspended magnet always comes to rest pointing roughly North–South. A compass needle works on the same principle.',
    steps: ['The Earth behaves like a giant magnet.', 'A freely turning magnet lines up with it.', 'The end that points North is called the North-seeking pole.'],
    cognitive: 'remember_understand', difficultyTier: 2, marks: 1, negativeMarks: 0, expectedSeconds: 40, competencyCodes: [], provenance: prov,
  },
  {
    id: 'q-g7m-001', versionId: V, grade: 7, subject: 'MATH', topicId: 'g7m-c8-t1', type: 'numeric', level: 'standard',
    stem: 'Evaluate:  (−8) × (−5) + (−12)',
    numeric: { value: 28, tolerance: 0 },
    explanation: '(−8) × (−5) = +40, because a negative times a negative is positive. Then 40 + (−12) = 28.',
    steps: ['Multiply first: (−8) × (−5) = 40.', 'Add: 40 + (−12) = 40 − 12.', 'Answer: 28.'],
    cognitive: 'apply', difficultyTier: 3, marks: 1, negativeMarks: 0, expectedSeconds: 60, competencyCodes: [], provenance: prov,
  },
  {
    id: 'q-g7s-001', versionId: V, grade: 7, subject: 'SCI', topicId: 'g7s-c2-t1', type: 'mcq', level: 'standard',
    stem: 'Riya drops a little of each liquid on turmeric paper. Which liquid turns the yellow paper red?',
    options: [
      { id: 'a', text: 'Lemon juice', misconception: 'Lemon juice is acidic. Turmeric stays yellow in acids.' },
      { id: 'b', text: 'Vinegar', misconception: 'Vinegar is acidic, so turmeric does not change colour.' },
      { id: 'c', text: 'Soap solution' },
      { id: 'd', text: 'Sugar solution', misconception: 'Sugar solution is neutral, so there is no colour change.' },
    ],
    correctOptionId: 'c',
    explanation: 'Turmeric is a natural indicator that turns red in a basic solution. Soap solution is basic.',
    steps: ['Turmeric: yellow in acids and neutral solutions, red in bases.', 'Soap solution is basic.', 'So it turns turmeric paper red.'],
    cognitive: 'apply', difficultyTier: 3, marks: 1, negativeMarks: 0, expectedSeconds: 45, competencyCodes: [], provenance: prov,
  },
  {
    id: 'q-g8m-001', versionId: V, grade: 8, subject: 'MATH', topicId: 'g8m-c1-t1', type: 'numeric', level: 'standard',
    stem: 'What is the smallest whole number by which 72 must be multiplied to make it a perfect square?',
    numeric: { value: 2, tolerance: 0 },
    explanation: '72 = 2 × 2 × 2 × 3 × 3. The 3s pair up, but one 2 is left over. Multiplying by 2 gives 144 = 12².',
    steps: ['Prime factorise: 72 = 2³ × 3².', 'In a perfect square every prime has an even power.', '2³ needs one more 2, so multiply by 2.', '72 × 2 = 144 = 12².'],
    cognitive: 'apply', difficultyTier: 5, marks: 1, negativeMarks: 0, expectedSeconds: 90, competencyCodes: [], provenance: prov,
  },
  {
    id: 'q-g8s-001', versionId: V, grade: 8, subject: 'SCI', topicId: 'g8s-c5-t1', type: 'mcq', level: 'standard',
    stem: 'A ball rolling on a flat playground slowly comes to a stop even though nobody touches it. Which force stops it?',
    options: [
      { id: 'a', text: 'Gravitational force', misconception: 'Gravity pulls the ball downward. On flat ground it does not slow the ball\'s sideways motion.' },
      { id: 'b', text: 'Friction' },
      { id: 'c', text: 'Magnetic force', misconception: 'A ball is not magnetic, and no magnet is involved.' },
      { id: 'd', text: 'Muscular force', misconception: 'Muscular force needs a living being to push or pull. Nobody touches the ball.' },
    ],
    correctOptionId: 'b',
    explanation: 'Friction between the ball and the ground opposes the motion, so the ball slows down and stops.',
    steps: ['The ball and the ground are in contact.', 'Friction acts opposite to the direction of motion.', 'It gradually reduces the speed to zero.'],
    cognitive: 'remember_understand', difficultyTier: 2, marks: 1, negativeMarks: 0, expectedSeconds: 40, competencyCodes: [], provenance: prov,
  },
  {
    id: 'q-g9m-001', versionId: V, grade: 9, subject: 'MATH', topicId: 'g9m-u2-c1-t1', type: 'mcq', level: 'standard',
    stem: 'What is the zero of the polynomial p(x) = 3x − 6?',
    options: [
      { id: 'a', text: '−2', misconception: 'Sign error: 3x − 6 = 0 gives 3x = +6, not −6.' },
      { id: 'b', text: '2' },
      { id: 'c', text: '6', misconception: 'Dropped the coefficient: the solution of 3x = 6 is x = 2, not 6.' },
      { id: 'd', text: '−6', misconception: 'Confused the zero with the constant term. The zero is the value of x that makes p(x) = 0.' },
    ],
    correctOptionId: 'b',
    explanation: 'Set p(x) = 0: 3x − 6 = 0, so 3x = 6 and x = 2. Check: p(2) = 6 − 6 = 0.',
    steps: ['A zero of p(x) is a value of x for which p(x) = 0.', '3x − 6 = 0 → 3x = 6 → x = 2.', 'Verify: p(2) = 3(2) − 6 = 0 ✓'],
    cognitive: 'remember_understand', difficultyTier: 3, marks: 1, negativeMarks: 0, expectedSeconds: 45, competencyCodes: ['CG-3', 'C-3.2'], provenance: prov,
  },
  {
    id: 'q-g9s-001', versionId: V, grade: 9, subject: 'SCI', topicId: 'g9s-u3-c1-t1', type: 'numeric', level: 'standard',
    stem: 'A car speeds up uniformly from 10 m/s to 30 m/s in 5 seconds. What is its acceleration (in m/s²)?',
    numeric: { value: 4, tolerance: 0.01, unit: 'm/s²' },
    explanation: 'a = (v − u) / t = (30 − 10) / 5 = 4 m/s².',
    steps: ['Initial velocity u = 10 m/s, final velocity v = 30 m/s, time t = 5 s.', 'a = (v − u) / t.', 'a = 20 / 5 = 4 m/s².'],
    cognitive: 'apply', difficultyTier: 4, marks: 2, negativeMarks: 0, expectedSeconds: 90, competencyCodes: [], provenance: prov,
  },
  {
    id: 'q-g10m-001', versionId: V, grade: 10, subject: 'MATH', topicId: 'g10m-u2-c3-t1', type: 'assertion_reason', level: 'standard',
    context: 'Assertion (A): The quadratic equation 2x² − 4x + 3 = 0 has no real roots.\nReason (R): If the discriminant b² − 4ac of a quadratic equation is negative, the equation has no real roots.',
    stem: 'Choose the correct option.',
    options: [
      { id: 'a', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'b', text: 'Both A and R are true, but R is not the correct explanation of A.', misconception: 'R is exactly the reason: here D = 16 − 24 = −8 < 0.' },
      { id: 'c', text: 'A is true but R is false.', misconception: 'R is a true statement of the discriminant rule.' },
      { id: 'd', text: 'A is false but R is true.', misconception: 'Calculate D carefully: b² = 16 and 4ac = 24, so D = −8, which is negative.' },
    ],
    correctOptionId: 'a',
    explanation: 'D = b² − 4ac = (−4)² − 4(2)(3) = 16 − 24 = −8 < 0, so there are no real roots. A is true, R is true, and R explains A.',
    steps: ['a = 2, b = −4, c = 3.', 'D = b² − 4ac = 16 − 24 = −8.', 'D < 0 ⇒ no real roots, so A is true.', 'R states the rule we just used, so R correctly explains A.'],
    cognitive: 'analyse_evaluate_create', difficultyTier: 5, marks: 1, negativeMarks: 0, expectedSeconds: 75, competencyCodes: [], provenance: prov,
  },
  {
    id: 'q-g10s-001', versionId: V, grade: 10, subject: 'SCI', topicId: 'g10s-u4-c1-t1', type: 'case_based', level: 'standard',
    context: 'Aarav is building a night lamp for a science fair. He connects three identical 6 Ω resistors in parallel across a 6 V battery. He wants to know how much current the battery supplies before choosing a switch rated for a maximum of 5 A.',
    stem: 'What is the total current drawn from the battery?',
    options: [
      { id: 'a', text: '0.33 A', misconception: 'This treats the resistors as if they were in series (18 Ω). In parallel the equivalent resistance is smaller.' },
      { id: 'b', text: '1 A', misconception: 'This is the current through one resistor (6 V ÷ 6 Ω). The battery supplies all three branches.' },
      { id: 'c', text: '3 A' },
      { id: 'd', text: '18 A', misconception: 'Multiplied the resistances instead of using 1/R = 1/R₁ + 1/R₂ + 1/R₃.' },
    ],
    correctOptionId: 'c',
    explanation: 'In parallel, 1/R = 1/6 + 1/6 + 1/6 = 1/2, so R = 2 Ω. I = V/R = 6/2 = 3 A, which is within the 5 A switch rating.',
    steps: ['Parallel: 1/R = 1/R₁ + 1/R₂ + 1/R₃ = 3/6.', 'R = 2 Ω.', "Ohm's law: I = V / R = 6 / 2 = 3 A.", 'Check: each branch carries 1 A, and 3 × 1 A = 3 A ✓'],
    cognitive: 'apply', difficultyTier: 5, marks: 1, negativeMarks: 0, expectedSeconds: 90, competencyCodes: [], provenance: prov,
  },
];
