import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ maxWidth: 520, margin: '0 auto', padding: '80px 16px', textAlign: 'center' }}>
      <h1>Page not found</h1>
      <p className="muted" style={{ margin: '12px 0 20px' }}>That page doesn't exist, or the topic isn't mapped yet.</p>
      <Link href="/learn" className="btn">Back to Today</Link>
    </main>
  );
}
