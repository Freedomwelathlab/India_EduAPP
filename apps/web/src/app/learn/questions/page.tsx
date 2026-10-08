import Link from 'next/link';
import { SEED_QUESTIONS, toStudentView } from '@ieos/assessment';
import { chapterLabel, findTopic } from '@ieos/curriculum';
import { QuestionCard } from '@/components/QuestionCard';
import { PageHead } from '@/components/ui';

export const metadata = { title: 'Question gallery' };

export default function Gallery() {
  const qs = [...SEED_QUESTIONS].sort((a, b) => a.grade - b.grade || a.subject.localeCompare(b.subject));
  return (
    <>
      <PageHead title="Question gallery" sub="One sample question for each Class × Subject (6–10, Maths & Science), across the four CBSE question types. All are original items, marked on the server." />
      <p className="notice" style={{ marginBottom: 16 }}>Status: <b>draft, pending subject-expert review</b>. Under the content gate, nothing reaches students in a live school until a named reviewer signs off.</p>
      <div className="stack">
        {qs.map((q) => {
          const t = findTopic(q.topicId)!;
          return (
            <div key={q.id}>
              <p className="small muted" style={{ margin: '0 0 6px 4px' }}>
                Class {q.grade} · {t.subject.name} · {chapterLabel(t.chapter)} {t.chapter.title} › <Link href={`/learn/topic/${q.topicId}`}>{t.topic.title}</Link>
              </p>
              <QuestionCard q={toStudentView(q)} />
            </div>
          );
        })}
      </div>
    </>
  );
}
