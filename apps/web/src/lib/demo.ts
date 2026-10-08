/**
 * In-memory DEMO tenant. Development only: a fictional school, people and
 * marks used to render every screen before Postgres is wired (Nov 2026).
 * The calculations (IA, best-2-of-3, grades, mastery, recommendations) use the
 * real engines in packages/, not hard-coded results.
 */
import { CBSE_2026_27_SUBJECTS, findTopic, type Grade, type SubjectCode } from '@ieos/curriculum';
import { SEED_QUESTIONS } from '@ieos/assessment';
import { observeAll, INITIAL_MASTERY } from '@ieos/learning-engine';

export const BRAND = 'Vidya'; // working name: trademark search pending
export const DEMO_SCHOOL = {
  id: 'sch-demo', organisationId: 'org-demo',
  name: 'Sahyadri Public School (Demo)', city: 'Pune', state: 'MH', board: 'CBSE', year: '2026-27',
};

export const ME = { id: 'stu-aanya', name: 'Aanya Sharma', grade: 9 as Grade, section: '9A', roll: '07' };
export const TEACHER = { id: 'tch-rao', name: 'Mrs. Lakshmi Rao', subjects: ['MATH'] as SubjectCode[], sections: ['9A', '9B'] };
export const PARENT = { id: 'par-sharma', name: 'Rohit Sharma', child: ME.id };

export interface DemoStudent { id: string; name: string; roll: string; pts: [number, number, number]; multiple: number; portfolio: number; enrichment: number; theory: number; history: boolean[] }

/** Class 9A Mathematics: PT scores as fractions; IA components 0–1; annual theory out of 80. */
export const CLASS_9A: DemoStudent[] = [
  { id: 'stu-aanya', name: 'Aanya Sharma', roll: '07', pts: [0.72, 0.85, 0.8], multiple: 0.8, portfolio: 1, enrichment: 0.8, theory: 61, history: [true, false, true, true, true, false, true, true] },
  { id: 's2', name: 'Arjun Mehta', roll: '01', pts: [0.55, 0.6, 0.5], multiple: 0.6, portfolio: 0.8, enrichment: 0.6, theory: 44, history: [false, true, false, true, false, true, true] },
  { id: 's3', name: 'Diya Iyer', roll: '04', pts: [0.9, 0.95, 0.88], multiple: 1, portfolio: 1, enrichment: 1, theory: 74, history: [true, true, true, true, true, true, true, true] },
  { id: 's4', name: 'Kabir Singh', roll: '12', pts: [0.3, 0.42, 0.35], multiple: 0.4, portfolio: 0.6, enrichment: 0.4, theory: 24, history: [false, false, true, false, false, false, true, false, false, false] },
  { id: 's5', name: 'Meera Nair', roll: '18', pts: [0.68, 0.7, 0.75], multiple: 0.8, portfolio: 0.8, enrichment: 0.8, theory: 55, history: [true, true, false, true, true, true] },
  { id: 's6', name: 'Rohan Das', roll: '22', pts: [0.6, 0.48, 0.66], multiple: 0.6, portfolio: 0.6, enrichment: 0.8, theory: 47, history: [true, false, false, true, true, false, true] },
  { id: 's7', name: 'Sara Khan', roll: '27', pts: [0.8, 0.78, 0.92], multiple: 0.8, portfolio: 1, enrichment: 0.8, theory: 68, history: [true, true, true, false, true, true, true] },
  { id: 's8', name: 'Vihaan Gupta', roll: '31', pts: [0.45, 0.5, 0.4], multiple: 0.4, portfolio: 0.4, enrichment: 0.6, theory: 33, history: [false, true, false, false, true, false, false, true] },
];

export const masteryOf = (history: boolean[]) => observeAll(INITIAL_MASTERY, history);

export interface Video { id: string; topicId: string; title: string; durationS: number; source: 'platform' | 'school'; status: 'published' | 'in_review' | 'draft'; board: string; chapters: Array<{ t: number; label: string }>; transcript: string }

export const VIDEOS: Video[] = SEED_QUESTIONS.map((q) => {
  const loc = findTopic(q.topicId)!;
  return {
    id: `vid-${q.topicId}`, topicId: q.topicId, title: loc.topic.title, durationS: 240 + (q.grade * 37) % 180,
    // Nothing has had expert review yet, so nothing may claim it (content gate §37).
    source: 'platform', status: 'in_review', board: loc.subject.name,
    chapters: [
      { t: 0, label: 'What you will learn' },
      { t: 45, label: 'The key idea' },
      { t: 120, label: 'Worked example' },
      { t: 200, label: 'Common mistake to avoid' },
    ],
    // Concept outline only. It must never contain the practice question's own answer.
    transcript: `In this video: ${loc.topic.learningOutcomes.join('; ') || loc.topic.title}. The worked example uses different numbers from your practice question, so you still have to work that one out yourself.`,
  };
});

export interface Doubt { id: string; studentName: string; section: string; topicId: string; body: string; status: 'open' | 'answered' | 'faq'; ageHours: number; answer?: string; votes: number }

export const DOUBTS: Doubt[] = [
  { id: 'd1', studentName: 'Kabir Singh', section: '9A', topicId: 'g9m-u2-c1-t1', body: 'Why is the zero of 3x − 6 positive 2 when there is a minus sign in the polynomial?', status: 'open', ageHours: 3, votes: 5 },
  { id: 'd2', studentName: 'Vihaan Gupta', section: '9A', topicId: 'g9m-u2-c1-t1', body: 'Can a linear polynomial have two zeros?', status: 'open', ageHours: 20, votes: 3 },
  { id: 'd3', studentName: 'Meera Nair', section: '9B', topicId: 'g9m-u2-c1-t1', body: 'Is the zero the same as the y-intercept?', status: 'answered', ageHours: 30, votes: 2, answer: 'No. The zero is where the graph crosses the x-axis (p(x) = 0). The y-intercept is p(0). For 3x − 6, the zero is 2 and the y-intercept is −6.' },
  { id: 'd4', studentName: 'Aanya Sharma', section: '9A', topicId: 'g9s-u3-c1-t1', body: 'If a car slows down, is its acceleration negative?', status: 'faq', ageHours: 50, votes: 9, answer: 'Yes, if you take the direction of motion as positive. Slowing down means the velocity is decreasing, so a = (v − u)/t comes out negative. This is called retardation or deceleration.' },
  { id: 'd5', studentName: 'Arjun Mehta', section: '9A', topicId: 'g9s-u3-c1-t1', body: 'Why is acceleration measured in m/s² and not m/s?', status: 'open', ageHours: 26, votes: 4 },
];

export interface Session { id: string; type: 'topic_clinic' | 'pre_test_revision' | 'remedial_group'; title: string; grade: Grade; subject: SubjectCode; topicIds: string[]; teacher: string; startsAt: string; durationMin: number; capacity: number; enrolled: number; sections: string[]; status: 'scheduled' | 'completed'; recording?: boolean }

export const SESSIONS: Session[] = [
  { id: 'ss1', type: 'pre_test_revision', title: 'PT-2 revision: Polynomials', grade: 9, subject: 'MATH', topicIds: ['g9m-u2-c1-t1'], teacher: 'Mrs. Lakshmi Rao', startsAt: '2026-10-09T16:00:00+05:30', durationMin: 45, capacity: 40, enrolled: 27, sections: ['9A', '9B'], status: 'scheduled' },
  { id: 'ss2', type: 'remedial_group', title: 'Small-group help: zeros of a polynomial', grade: 9, subject: 'MATH', topicIds: ['g9m-u2-c1-t1'], teacher: 'Mrs. Lakshmi Rao', startsAt: '2026-10-10T15:30:00+05:30', durationMin: 30, capacity: 8, enrolled: 3, sections: ['9A'], status: 'scheduled' },
  { id: 'ss3', type: 'topic_clinic', title: 'Motion clinic: acceleration and v–t graphs', grade: 9, subject: 'SCI', topicIds: ['g9s-u3-c1-t1'], teacher: 'Mr. Anil Kulkarni', startsAt: '2026-10-13T16:00:00+05:30', durationMin: 45, capacity: 40, enrolled: 18, sections: ['9A', '9B', '9C'], status: 'scheduled' },
  { id: 'ss4', type: 'topic_clinic', title: 'Number System doubts', grade: 9, subject: 'MATH', topicIds: [], teacher: 'Mrs. Lakshmi Rao', startsAt: '2026-10-01T16:00:00+05:30', durationMin: 45, capacity: 40, enrolled: 31, sections: ['9A', '9B'], status: 'completed', recording: true },
];

export const TESTS = [
  { id: 'pt1', title: 'Periodic Test 1', subject: 'MATH' as SubjectCode, date: '2026-07-18', status: 'marked', score: '18 / 25' },
  { id: 'pt2', title: 'Periodic Test 2', subject: 'MATH' as SubjectCode, date: '2026-10-15', status: 'upcoming', score: null },
  { id: 'hy', title: 'Half-Yearly Examination', subject: 'SCI' as SubjectCode, date: '2026-09-12', status: 'marked', score: '58 / 80' },
  { id: 'pt3', title: 'Periodic Test 3', subject: 'MATH' as SubjectCode, date: '2027-01-14', status: 'scheduled', score: null },
];

export const subjectsForGrade = (g: Grade) => CBSE_2026_27_SUBJECTS.filter((s) => s.grade === g);

export const fmtDate = (iso: string) => new Date(iso).toLocaleString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });
export const fmtDur = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
