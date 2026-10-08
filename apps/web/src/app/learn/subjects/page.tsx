import Link from 'next/link';
import { CBSE_2026_27_SUBJECTS } from '@ieos/curriculum';
import { PageHead, SubjectIcon, subjectSlug } from '@/components/ui';

export const metadata = { title: 'Subjects' };

export default function Subjects() {
  const grades = [6, 7, 8, 9, 10] as const;
  return (
    <>
      <PageHead title="All classes & subjects" sub="CBSE 2026-27 · Mathematics and Science · Classes 6–10. The demo lets you browse every class." />
      {grades.map((g) => (
        <div key={g} className="section">
          <h2>Class {g} {g >= 9 && <span className="chip ok" style={{ marginLeft: 8, verticalAlign: 'middle' }}>Official CBSE 2026-27 syllabus</span>}</h2>
          <div className="grid g2">
            {CBSE_2026_27_SUBJECTS.filter((s) => s.grade === g).map((s) => {
              const chapters = s.units.flatMap((u) => u.chapters);
              const topics = chapters.reduce((n, c) => n + c.topics.length, 0);
              return (
                <Link key={s.id} href={`/learn/${g}/${subjectSlug(s.subject)}`} className="card card-link row">
                  <SubjectIcon subject={s.subject} />
                  <span style={{ flex: 1 }}>
                    <b>{s.name}</b> <span className="muted small">· {s.textbook}</span><br />
                    <span className="small muted">{chapters.length} chapters · {topics} topics mapped so far</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
