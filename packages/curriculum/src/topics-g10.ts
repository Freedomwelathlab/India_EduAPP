/**
 * Class 10 topic map (task C3), from the CBSE Secondary Curriculum 2026-27
 * subject PDFs (Maths_SecP1X, Science_SecP1). Topic titles follow the board's
 * content column; outcomes are short paraphrases of its "competencies" column.
 * Board limits ("derivation not required", "only 30°, 45°, 60°") are kept in
 * the outcome text because they bound what questions may ask.
 *
 * Keyed by chapter id. Existing seed topics (g10m-c4-t1, g10s-c11-t1) are
 * defined in cbse-2026-27.ts and are not repeated here.
 */
import type { Topic } from './types';

type T = [id: string, title: string, outcomes: string[], formativeOnly?: boolean, levels?: Topic['levels']];

const mk = ([id, title, outcomes, formativeOnly, levels]: T): Topic => ({
  id, title, learningOutcomes: outcomes, competencyCodes: [], canonicalConceptIds: [], prerequisiteTopicIds: [],
  assessmentScope: formativeOnly ? 'formative_only' : 'summative', levels: levels ?? ['standard', 'basic'],
});

const MATH: Record<string, T[]> = {
  'g10m-c1': [
    ['g10m-c1-t1', 'Fundamental Theorem of Arithmetic', ['States and applies the Fundamental Theorem of Arithmetic', 'Finds HCF and LCM by prime factorisation in real-life problems']],
    ['g10m-c1-t2', 'Irrationality proofs', ['Proves algebraically that √2, √3, √5 and expressions like 3 + 2√5 are irrational']],
  ],
  'g10m-c2': [
    ['g10m-c2-t1', 'Zeros of a polynomial', ['Finds the zeros of a polynomial graphically and algebraically']],
    ['g10m-c2-t2', 'Zeros and coefficients of a quadratic', ['Verifies the relationship between the zeros and coefficients of a quadratic polynomial']],
  ],
  'g10m-c3': [
    ['g10m-c3-t1', 'Graphical solution and consistency', ['Plots a pair of linear equations and reads the solution', 'Uses algebraic conditions to decide the number of solutions']],
    ['g10m-c3-t2', 'Substitution and elimination', ['Solves a pair of linear equations by substitution and elimination', 'Models and solves situational problems']],
  ],
  'g10m-c4': [
    ['g10m-c4-t2', 'Solving by factorisation and the quadratic formula', ['Solves quadratic equations (real roots only) by factorisation and the quadratic formula']],
    ['g10m-c4-t3', 'Word problems on quadratic equations', ['Formulates and solves quadratic equations from day-to-day situations']],
  ],
  'g10m-c5': [
    ['g10m-c5-t1', 'nth term of an AP', ['Derives and applies the nth term of an arithmetic progression']],
    ['g10m-c5-t2', 'Sum of the first n terms', ['Derives and applies the sum of the first n terms of an AP to daily-life problems']],
  ],
  'g10m-c6': [
    ['g10m-c6-t1', 'Basic Proportionality Theorem', ['Proves the Basic Proportionality Theorem and applies it and its converse']],
    ['g10m-c6-t2', 'Similarity criteria', ['Distinguishes congruent from similar figures', 'Proves similarity of triangles using AA, SSS and SAS criteria']],
  ],
  'g10m-c7': [
    ['g10m-c7-t1', 'Distance and section formulae', ['Uses the distance formula', 'Uses the section formula (internal division) to find a dividing point']],
  ],
  'g10m-c8': [
    ['g10m-c8-t1', 'Trigonometric ratios', ['Defines the trigonometric ratios of an acute angle', 'Evaluates the ratios of 0°, 30°, 45°, 60° and 90°']],
    ['g10m-c8-t2', 'Trigonometric identities', ['Proves and applies sin²A + cos²A = 1 and simple related identities']],
  ],
  'g10m-c9': [
    ['g10m-c9-t1', 'Heights and distances', ['Solves height and distance problems with angles of elevation and depression of 30°, 45° and 60°, using at most two right triangles']],
  ],
  'g10m-c10': [
    ['g10m-c10-t1', 'Tangents to a circle', ['Proves that a tangent is perpendicular to the radius at the point of contact', 'Proves that tangents from an external point are equal and applies this']],
  ],
  'g10m-c11': [
    ['g10m-c11-t1', 'Sectors and segments', ['Calculates areas of sectors and segments (central angle 60°, 90° or 120° for segments) and related perimeters']],
  ],
  'g10m-c12': [
    ['g10m-c12-t1', 'Combinations of solids', ['Calculates surface areas and volumes of combinations of any two of cube, cuboid, sphere, hemisphere, cylinder and cone']],
  ],
  'g10m-c13': [
    ['g10m-c13-t1', 'Mean of grouped data', ['Computes the mean of grouped data by direct, assumed-mean and step-deviation methods']],
    ['g10m-c13-t2', 'Median and mode of grouped data', ['Computes the median and mode of grouped frequency distributions (no bimodal cases)']],
  ],
  'g10m-c14': [
    ['g10m-c14-t1', 'Classical probability', ['Uses the classical definition of probability to solve simple real-life problems']],
  ],
};

const SCI: Record<string, T[]> = {
  'g10s-c1': [
    ['g10s-c1-t1', 'Chemical equations and balancing', ['Writes and balances chemical equations']],
    ['g10s-c1-t2', 'Types of chemical reactions', ['Classifies combination, decomposition, displacement, double displacement, precipitation, endothermic and exothermic reactions']],
    ['g10s-c1-t3', 'Oxidation and reduction', ['Identifies oxidation and reduction in a reaction']],
  ],
  'g10s-c2': [
    ['g10s-c2-t1', 'Acids, bases and indicators', ['Defines acids and bases by H⁺ and OH⁻ ions and identifies them with indicators', 'Describes neutralisation']],
    ['g10s-c2-t2', 'pH and everyday life', ['Uses the pH scale (logarithm definition not required) and explains its importance in daily life']],
    ['g10s-c2-t3', 'Important salts', ['Describes preparation and uses of NaOH, bleaching powder, baking soda, washing soda and Plaster of Paris']],
  ],
  'g10s-c3': [
    ['g10s-c3-t1', 'Properties of metals and non-metals', ['Compares physical and chemical properties', 'Uses the reactivity series']],
    ['g10s-c3-t2', 'Ionic compounds', ['Explains formation and properties of ionic compounds']],
    ['g10s-c3-t3', 'Metallurgy and corrosion', ['Outlines basic metallurgical processes', 'Explains corrosion and its prevention']],
    ['g10s-c3-t4', 'Periodic classification of elements', ['Döbereiner, Newlands, Mendeléev and the Modern Periodic Table; trends in properties (CBSE reading material)'], true],
  ],
  'g10s-c4': [
    ['g10s-c4-t1', 'Covalent bonding and versatile carbon', ['Explains covalent bond formation and the versatile nature of carbon']],
    ['g10s-c4-t2', 'Hydrocarbons and nomenclature', ['Distinguishes saturated and unsaturated hydrocarbons', 'Names alkanes, alkenes, alkynes and compounds with common functional groups']],
    ['g10s-c4-t3', 'Reactions of carbon compounds', ['Describes combustion, oxidation, addition and substitution', 'States properties and uses of ethanol and ethanoic acid', 'Explains soaps and detergents']],
  ],
  'g10s-c5': [
    ['g10s-c5-t1', 'Nutrition and respiration', ['Explains nutrition and respiration in plants and animals']],
    ['g10s-c5-t2', 'Transport and excretion', ['Explains transport and excretion in plants and animals']],
  ],
  'g10s-c6': [
    ['g10s-c6-t1', 'Coordination in plants', ['Describes tropic movements and plant hormones']],
    ['g10s-c6-t2', 'Nervous system and reflex action', ['Explains the nervous system and voluntary, involuntary and reflex actions']],
    ['g10s-c6-t3', 'Animal hormones', ['Explains chemical coordination by hormones in animals']],
  ],
  'g10s-c7': [
    ['g10s-c7-t1', 'Asexual and sexual reproduction', ['Compares asexual and sexual reproduction in plants and animals']],
    ['g10s-c7-t2', 'Reproductive health', ['Explains reproductive health, methods of family planning and prevention of HIV/AIDS']],
  ],
  'g10s-c8': [
    ['g10s-c8-t1', "Mendel's laws and sex determination", ["Explains Mendel's contribution and laws of inheritance", 'Explains sex determination in brief']],
    ['g10s-c8-t2', 'Evolution', ['Acquired and inherited traits, speciation, fossils and human evolution (assessed formatively only)'], true],
  ],
  'g10s-c9': [
    ['g10s-c9-t1', 'Spherical mirrors', ['Draws images formed by spherical mirrors', 'Uses the mirror formula (derivation not required) and magnification']],
    ['g10s-c9-t2', 'Refraction and lenses', ['States the laws of refraction and refractive index', 'Uses the lens formula and power of a lens']],
  ],
  'g10s-c10': [
    ['g10s-c10-t1', 'The human eye and its defects', ['Explains how the eye lens works and how defects of vision are corrected']],
    ['g10s-c10-t2', 'Prism, dispersion and scattering', ['Explains refraction through a prism, dispersion and scattering in daily life (sunrise/sunset colour excluded)']],
  ],
  'g10s-c11': [
    ['g10s-c11-t2', "Ohm's law and resistivity", ["Applies Ohm's law", 'Explains the factors that affect resistance and resistivity']],
    ['g10s-c11-t3', 'Heating effect and electric power', ['Explains the heating effect of current and its uses', 'Relates P, V, I and R']],
  ],
  'g10s-c12': [
    ['g10s-c12-t1', 'Magnetic field of a current', ['Draws field lines for a straight conductor, a coil and a solenoid']],
    ['g10s-c12-t2', "Force on a conductor and Fleming's left-hand rule", ["Applies Fleming's left-hand rule"]],
    ['g10s-c12-t3', 'AC, DC and domestic circuits', ['Compares AC and DC', 'Describes domestic electric circuits and safety']],
    ['g10s-c12-t4', 'Motor, induction and generator', ['Electric motor, electromagnetic induction and electric generator (assessed formatively only)'], true],
  ],
  'g10s-c13': [
    ['g10s-c13-t1', 'Ecosystems and environmental problems', ['Explains ecosystems, ozone depletion and waste management']],
  ],
};

export const G10_TOPICS: Record<string, Topic[]> = Object.fromEntries(
  [...Object.entries(MATH), ...Object.entries(SCI)].map(([chapterId, ts]) => [chapterId, ts.map(mk)]),
);
