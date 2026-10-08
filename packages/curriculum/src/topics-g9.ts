/**
 * Class 9 topic map (task C3), from the CBSE Secondary Curriculum 2026-27
 * "Key Concepts" columns (Maths_SecP1IX, ScienceSt_SecP1), placed on the NCERT
 * Ganita Manjari / Exploration chapter that teaches them. Outcomes paraphrase
 * the board's "The student will be able to" column. Competency codes are the
 * board's own (CG-x / C-x.y).
 *
 * Keyed by chapter id. Seed topics g9m-c2-t1, g9m-c8-t1 and g9s-c4-t1 live in
 * cbse-2026-27.ts and are not repeated here.
 */
import type { Topic } from './types';

type T = [id: string, title: string, outcomes: string[], codes?: string[], extra?: Partial<Topic>];

const mk = ([id, title, outcomes, codes, extra]: T): Topic => ({
  id, title, learningOutcomes: outcomes, competencyCodes: codes ?? [], canonicalConceptIds: [], prerequisiteTopicIds: [],
  assessmentScope: 'summative', levels: ['standard', 'advanced'], ...extra,
});

const MATH: Record<string, T[]> = {
  'g9m-c1': [
    ['g9m-c1-t1', 'The Cartesian plane', ['Specifies locations and relative positions using coordinates', 'Represents a floor plan on a grid'], ['CG-4', 'C-4.5']],
    ['g9m-c1-t2', 'Distance and midpoint', ['Computes the distance between two points', 'Finds the midpoint of a segment', 'Tests collinearity and right angles with coordinates'], ['CG-4', 'C-4.5']],
  ],
  'g9m-c2': [
    ['g9m-c2-t2', 'Linear growth and decay', ['Models linear growth and decay with linear polynomials', 'Identifies patterns in linear relationships'], ['CG-3', 'C-3.2']],
    ['g9m-c2-t3', 'Slope and y-intercept', ['Identifies the slope and y-intercept of y = ax + b', 'Graphs a linear relationship'], ['CG-3', 'C-3.2']],
  ],
  'g9m-c3': [
    ['g9m-c3-t1', 'Rational numbers and density', ['Represents rationals on the number line', 'Explains density and finds rationals between two rationals'], ['CG-1', 'C-1.1']],
    ['g9m-c3-t2', 'Decimal expansions', ['Computes decimal representations of rational numbers'], ['CG-1', 'C-1.1']],
    ['g9m-c3-t3', 'Irrational numbers', ['Proves the irrationality of √2 and √3', 'Constructs the square-root spiral'], ['CG-1', 'C-1.1']],
  ],
  'g9m-c4': [
    ['g9m-c4-t1', 'Identities with geometric models', ['Visualises algebraic identities with area models'], ['CG-7', 'C-7.2']],
    ['g9m-c4-t2', 'Factorisation using identities', ['Factorises expressions and quadratics using identities and algebra tiles', 'Simplifies rational expressions'], ['CG-7', 'C-7.2']],
  ],
  'g9m-c5': [
    ['g9m-c5-t1', 'Chords and their properties', ['Uses perpendicular bisectors and distances of chords from the centre'], ['CG-4', 'C-7.3']],
    ['g9m-c5-t2', 'Angles subtended by arcs; cyclic points', ['Relates angles subtended by an arc', 'Explains why one circle passes through three non-collinear points'], ['CG-4', 'C-7.3']],
  ],
  'g9m-c6': [
    ['g9m-c6-t1', 'Perimeter, π and arc length', ['Computes perimeters and arc lengths', 'Explains π and its historical approximations (Archimedes, Aryabhata, Zu Chongzhi)'], ['CG-5', 'C-5.1']],
    ['g9m-c6-t2', "Heron's and Brahmagupta's formulas", ["Uses Heron's formula", "Uses Brahmagupta's formula for a cyclic quadrilateral and relates the two"], ['CG-5', 'C-5.1']],
    ['g9m-c6-t3', 'Area of a circle and sector', ['Derives the area of a circle and computes sector areas'], ['CG-5', 'C-5.1']],
  ],
  'g9m-c7': [
    ['g9m-c7-t1', 'Empirical probability', ['Places events on the probability scale', 'Estimates probability from experiments and data']],
    ['g9m-c7-t2', 'Theoretical probability', ['Defines sample space and events', 'Computes the theoretical probability of an event']],
  ],
  'g9m-c8': [
    ['g9m-c8-t2', 'Rules of a sequence', ['Finds explicit and recursive rules and generates terms'], ['CG-11', 'C-8.1']],
    ['g9m-c8-t3', 'Geometric progressions', ['Finds the nth term of a GP and visualises it', 'Analyses fractals and the Tower of Hanoi'], ['CG-11', 'C-8.1']],
  ],
  'g9m-c9': [
    ['g9m-c9-t1', "Euclid's axioms and postulates", ['Explains definitions, axioms and the 5 postulates', "Explains the Sulbasutra construction of a square"], ['CG-7', 'C-7.1', 'C-7.3']],
    ['g9m-c9-t2', 'Lines and angles', ['Applies the linear-pair theorem and its converse', 'Proves vertically opposite angles are equal', 'Uses angles formed by parallel lines'], ['CG-7', 'C-7.1', 'C-7.3']],
    ['g9m-c9-t3', 'Congruence of triangles', ['Uses SAS, SSS, ASA, AAS and RHS', 'Proves properties of isosceles triangles', 'Explains why SSA fails in general'], ['CG-4', 'C-4.1', 'C-7.3']],
    ['g9m-c9-t4', 'Propositions and converses', ['Forms the converse of a proposition', 'Uses counter-examples to show a converse is false'], ['C-7.3']],
  ],
  'g9m-c10': [
    ['g9m-c10-t1', 'Representing data', ['Collects, organises and graphs data to answer a statistical question', 'Reads stacked and 100% stacked bar graphs'], ['CG-6', 'C-6.1']],
    ['g9m-c10-t2', 'Measures of central tendency', ['Computes and interprets mean, median and mode'], ['CG-6', 'C-6.1']],
  ],
  'g9m-c11': [
    ['g9m-c11-t1', 'Algorithms and computational thinking', ['Follows and designs step-by-step procedures (integrated across units; CBSE lists no separate marks)'], [], { assessmentScope: 'formative_only' }],
  ],
  'g9m-c12': [
    ['g9m-c12-t1', 'Parallelograms', ['Proves characterisations of a parallelogram', 'Explains central symmetry of parallelograms'], ['CG-4', 'C-4.2', 'C-7.3']],
    ['g9m-c12-t2', 'Midpoint theorem and medians', ['Proves the midpoint theorem and its converse', 'Proves medians are concurrent and divide in 2:1'], ['CG-4', 'C-4.2', 'C-7.3']],
  ],
  'g9m-c13': [
    ['g9m-c13-t1', 'Linear equations in two variables', ['Represents a linear equation graphically and in slope-intercept form']],
    ['g9m-c13-t2', 'Pairs of linear equations', ['Solves pairs graphically, by substitution and by elimination', 'Determines consistency and models contextual problems']],
  ],
  'g9m-c14': [
    ['g9m-c14-t1', 'Cuboids, cubes and pyramids', ['Recognises and measures cuboids, cubes and pyramids'], ['CG-5', 'C-5.1']],
    ['g9m-c14-t2', 'Spheres and cones', ['Calculates surface areas and volumes of spheres, hemispheres and right circular cones'], ['CG-5', 'C-5.1']],
  ],
};

const SCI: Record<string, T[]> = {
  'g9s-c1': [
    ['g9s-c1-t1', 'Ways of doing science', ['Introductory chapter on scientific inquiry; not in the CBSE unit table'], [], { assessmentScope: 'formative_only', levels: ['standard'] }],
  ],
  'g9s-c2': [
    ['g9s-c2-t1', 'Discovery and types of cells', ['Differentiates plant and animal, prokaryotic and eukaryotic cells'], ['C-3.1']],
    ['g9s-c2-t2', 'Cell membrane and permeability', ['Explains the permeability of the cell membrane'], ['C-3.1']],
    ['g9s-c2-t3', 'Cell division', ['Describes cellular division and its link to cancer'], ['C-3.2']],
  ],
  'g9s-c3': [
    ['g9s-c3-t1', 'Plant tissues', ['Classifies meristematic and permanent tissues and their functions'], ['C-4.2']],
    ['g9s-c3-t2', 'Animal tissues', ['Describes epithelial, connective, muscular and nervous tissue'], ['C-4.2']],
    ['g9s-c3-t3', 'The musculoskeletal system', ['Relates joints, muscles and bones to movement', 'Explains care through posture, nutrition and exercise'], ['C-5.3']],
  ],
  'g9s-c4': [
    ['g9s-c4-t2', 'Displacement and velocity', ['Expresses displacement and velocity in SI units', 'Interprets distance–time graphs'], ['C-2.1']],
    ['g9s-c4-t3', 'Uniform circular motion', ['Explains uniform circular motion (elementary idea)'], ['C-2.1']],
  ],
  'g9s-c5': [
    ['g9s-c5-t1', 'Homogeneous and heterogeneous mixtures', ['Classifies mixtures'], ['C-1.1']],
    ['g9s-c5-t2', 'Solutions, suspensions and colloids', ['Compares their properties'], ['C-1.1']],
    ['g9s-c5-t3', 'Separation techniques', ['Chooses a separation method, including centrifugation', 'Handles laboratory apparatus safely'], ['C-6.1']],
  ],
  'g9s-c6': [
    ['g9s-c6-t1', 'Balanced and unbalanced forces; friction', ['Distinguishes balanced and unbalanced forces', 'Explains friction'], ['C-2.1']],
    ['g9s-c6-t2', "Newton's laws of motion", ["Applies Newton's first, second and third laws to real events"], ['C-2.1']],
  ],
  'g9s-c7': [
    ['g9s-c7-t1', 'Work and the work–energy theorem', ['Calculates work done by a constant force', 'Applies the work–energy theorem'], ['C-2.5']],
    ['g9s-c7-t2', 'Conservation of energy and power', ['Applies conservation of energy', 'Calculates power'], ['C-2.5']],
    ['g9s-c7-t3', 'Simple machines', ['Calculates mechanical advantage of pulleys, inclined planes and levers'], ['C-2.5']],
  ],
  'g9s-c8': [
    ['g9s-c8-t1', 'Atomic models', ['Compares the Thomson, Rutherford and Bohr models'], ['C-1.1']],
    ['g9s-c8-t2', 'Electron distribution and valency', ['Distributes electrons for the first 18 elements', 'Derives valency'], ['C-1.1']],
    ['g9s-c8-t3', 'Atomic number, mass number, isotopes and isobars', ['Uses atomic and mass number', 'Distinguishes isotopes and isobars'], ['C-1.1']],
  ],
  'g9s-c9': [
    ['g9s-c9-t1', 'Laws of chemical combination', ['States the laws of conservation of mass and constant proportion', "Explains Dalton's atomic theory"], ['C-1.1']],
    ['g9s-c9-t2', 'Molecules, ions and formulae', ['Writes chemical formulae', 'Distinguishes covalent and ionic compounds'], ['C-1.1']],
    ['g9s-c9-t3', 'Molecular and formula unit mass', ['Calculates molecular mass and formula unit mass'], ['C-1.1', 'C-5.1']],
  ],
  'g9s-c10': [
    ['g9s-c10-t1', 'Production and propagation of sound', ['Explains sound as a longitudinal wave through a medium', 'Relates time period and frequency'], ['C-8.1']],
    ['g9s-c10-t2', 'Pitch, loudness and speed in media', ['Relates pitch and loudness to wave properties', 'Compares sound speed in solids and liquids']],
    ['g9s-c10-t3', 'Reflection of sound', ['Explains echo, reverberation and echolocation (e.g. the Gol Gumbaz whispering gallery)']],
  ],
  'g9s-c11': [
    ['g9s-c11-t1', 'Asexual reproduction', ['Describes types of asexual reproduction with examples'], ['C-2.8']],
    ['g9s-c11-t2', 'Sexual reproduction in flowering plants', ['Describes the flower, pollination and fertilisation'], ['C-2.8']],
    ['g9s-c11-t3', 'Reproductive health', ['Explains reproductive health, hygiene and birth-control methods'], ['C-3.3']],
  ],
  'g9s-c12': [
    ['g9s-c12-t1', 'Classification and the five kingdoms', ['Explains why we classify', 'Describes the five kingdoms with examples'], ['C-4.1']],
    ['g9s-c12-t2', 'Plant and animal divisions; binomial names', ['Recognises major divisions', 'Uses binomial nomenclature', 'Explains why viruses are acellular'], ['C-4.1']],
  ],
  'g9s-c13': [
    ['g9s-c13-t1', 'Earth as an interconnected system', ['Describes interactions of the Earth\'s spheres', 'Explains solar radiation and the electromagnetic spectrum']],
  ],
};

export const G9_TOPICS: Record<string, Topic[]> = Object.fromEntries(
  [...Object.entries(MATH), ...Object.entries(SCI)].map(([chapterId, ts]) => [chapterId, ts.map(mk)]),
);
