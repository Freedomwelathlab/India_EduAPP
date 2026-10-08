import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SLUG_SUBJECT, allChapters, chapterLabel, getSubject, type Grade } from '@ieos/curriculum';
import { questionsForTopic } from '@ieos/assessment';
import { PageHead } from '@/components/ui';
import { VIDEOS } from '@/lib/demo';

export default async function ChapterPage({ params }: { params: Promise<{ grade: string; subject: string; chapter: string }> }) {
  const p = await params;
  const grade = Number(p.grade) as Grade;
  const s = SLUG_SUBJECT[p.subject] && getSubject(grade, SLUG_SUBJECT[p.subject]!);
  const c = s && allChapters(s).find((x) => x.id === p.chapter);
  if (!s || !c) notFound();

  return (
    <>
      <PageHead
        crumbs={[['Subjects', '/learn/subjects'], [`Class ${grade} ${s.name}`, `/learn/${grade}/${p.subject}`], [c.unit.title]]}
        title={`${chapterLabel(c)}: ${c.title}`}
        sub={`${c.textbook}${c.periods ? ` · ${c.periods} periods recommended` : ''}`}
      />
      <div className="grid g2">
        {c.topics.map((t) => {
          const v = VIDEOS.find((x) => x.topicId === t.id);
          const qs = questionsForTopic(t.id);
          return (
            <Link key={t.id} href={`/learn/topic/${t.id}`} className="card card-link stack">
              <h3>{t.title}</h3>
              {t.learningOutcomes.length > 0 && <ul className="small muted" style={{ margin: 0, paddingLeft: 18 }}>{t.learningOutcomes.map((o) => <li key={o}>{o}</li>)}</ul>}
              <div className="row">
                <span className={`chip ${v ? 'ok' : ''}`}>🎥 {v ? 'Video' : 'No video yet'}</span>
                <span className={`chip ${qs.length ? 'ok' : ''}`}>✍️ {qs.length} question{qs.length === 1 ? '' : 's'}</span>
                {t.levels.includes('advanced') && <span className="chip info">Advanced track</span>}
                {t.competencyCodes.map((cc) => <span key={cc} className="chip">{cc}</span>)}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
