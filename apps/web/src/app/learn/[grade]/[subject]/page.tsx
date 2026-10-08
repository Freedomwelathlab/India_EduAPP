import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SLUG_SUBJECT, chapterLabel, getSubject, theoryMarksTotal, type Grade } from '@ieos/curriculum';
import { PageHead, SubjectIcon } from '@/components/ui';

export default async function SubjectPage({ params }: { params: Promise<{ grade: string; subject: string }> }) {
  const p = await params;
  const grade = Number(p.grade) as Grade;
  const code = SLUG_SUBJECT[p.subject];
  const s = code && getSubject(grade, code);
  if (!s) notFound();
  const total = theoryMarksTotal(s);

  return (
    <>
      <PageHead
        crumbs={[['Subjects', '/learn/subjects'], [`Class ${grade}`], [s.name]]}
        title={`Class ${grade} ${s.name}`}
        sub={<>NCERT <i>{s.textbook}</i> · CBSE 2026-27{total ? ` · Theory ${total} + Internal Assessment 20` : ' · School-based assessment'}</>}
        right={<SubjectIcon subject={s.subject} />}
      />
      {s.notes.map((n) => <p key={n} className="notice" style={{ marginBottom: 12 }}>{n}</p>)}

      <div className="stack">
        {s.units.map((u) => (
          <div key={u.id} className="card">
            <div className="row between" style={{ marginBottom: 10 }}>
              <h2>{u.title}</h2>
              {u.theoryMarks !== undefined && <span className="chip info">{u.theoryMarks} marks</span>}
            </div>
            <div className="table-wrap">
              <table className="t">
                <thead><tr><th>#</th><th>Chapter</th><th>Topics</th><th className="num">Periods</th><th>Status</th></tr></thead>
                <tbody>
                  {u.chapters.map((c) => (
                    <tr key={c.id}>
                      <td style={{ whiteSpace: 'nowrap' }}>{chapterLabel(c)}</td>
                      <td>{c.topics.length ? <Link href={`/learn/${grade}/${p.subject}/${c.id}`}><b>{c.title}</b></Link> : c.title}{c.boardSyllabusNames && <div className="small muted">CBSE syllabus: {c.boardSyllabusNames.join(" · ")}</div>}</td>
                      <td>{c.topics.length || '—'}</td>
                      <td className="num">{c.periods ?? '—'}</td>
                      <td>{c.topics.length ? <span className="chip ok">Ready</span> : <span className="chip">Mapping</span>}{c.confidence !== 'high' && <span className="chip warn" style={{ marginLeft: 4 }} title="Mapping of this book chapter to the CBSE unit still needs a teacher to confirm">confirm mapping</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <p className="small muted" style={{ marginTop: 16 }}>Sources: {s.sources.map((x) => <a key={x.url} href={x.url} target="_blank" rel="noreferrer" style={{ marginRight: 8 }}>{x.title}</a>)}</p>
    </>
  );
}
