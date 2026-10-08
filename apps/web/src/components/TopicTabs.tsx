'use client';

import { useState, useTransition, type ReactNode } from 'react';
import { submitDoubt } from '@/app/actions';

export function Tabs({ tabs }: { tabs: Array<{ id: string; label: string; body: ReactNode }> }) {
  const [on, setOn] = useState(tabs[0]!.id);
  return (
    <div>
      <div className="tabs" role="tablist">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={on === t.id} aria-controls={`p-${t.id}`} id={`t-${t.id}`} onClick={() => setOn(t.id)}>{t.label}</button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} role="tabpanel" id={`p-${t.id}`} aria-labelledby={`t-${t.id}`} hidden={on !== t.id}>{t.body}</div>
      ))}
    </div>
  );
}

export function VideoPlayer({ title, duration, chapters, board, eq }: { title: string; duration: string; chapters: Array<{ t: string; label: string }>; board: string; eq: string }) {
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  return (
    <div>
      <div className="player">
        <div className="board">
          <span style={{ opacity: .7, fontSize: '.9rem' }}>{board}</span>
          <span className="eq">{eq}</span>
          <span style={{ opacity: .85 }}>{title}</span>
        </div>
        {!playing && <button className="play" aria-label={`Play video: ${title}`} onClick={() => setPlaying(true)} />}
        <div className="ctrl">
          <span>{playing ? '❚❚' : '▶'}</span>
          <div className="track"><span style={{ width: `${playing ? Math.max(pos, 4) : pos}%` }} /></div>
          <span>{duration}</span><span>CC</span><span>240p · HD</span>
        </div>
      </div>
      {playing && <p className="notice info" style={{ marginTop: 10 }}>Preview build: this is the player shell. Topic videos are produced in the Remotion pipeline and stream through the video provider once it is chosen (decision pending).</p>}
      <div className="chapters">
        {chapters.map((c, i) => (
          <button key={c.t} onClick={() => { setPlaying(true); setPos(Math.round((i / chapters.length) * 100)); }}>
            <span className="ts">{c.t}</span><span>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function DoubtForm({ topicId }: { topicId: string }) {
  const [body, setBody] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  return (
    <form className="stack" onSubmit={(e) => {
      e.preventDefault();
      start(async () => {
        const r = await submitDoubt(topicId, body);
        setMsg(r.ok ? { ok: true, text: `Sent to your teacher. You'll get an answer within ${r.slaHours} school hours. It is visible only to you and your teachers.` } : { ok: false, text: r.error });
        if (r.ok) setBody('');
      });
    }}>
      <label htmlFor="doubt" className="small"><b>What's confusing you?</b> Mention the question or the video moment if you can.</label>
      <textarea id="doubt" className="in" rows={4} value={body} onChange={(e) => setBody(e.target.value)} placeholder="e.g. Why does the zero come out positive when the polynomial has a minus sign?" />
      <div className="row">
        <button className="btn" disabled={pending || body.trim().length === 0}>{pending ? 'Sending…' : 'Ask my teacher'}</button>
        <span className="small muted">No public posting. Only your teachers can see this.</span>
      </div>
      {msg && <p className={`feedback ${msg.ok ? 'ok' : 'no'}`} role="status">{msg.text}</p>}
    </form>
  );
}
