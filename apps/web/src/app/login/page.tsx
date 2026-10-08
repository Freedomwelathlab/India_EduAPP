import { BRAND } from '@/lib/demo';
import { DEMO_ACCOUNTS } from '@/lib/session';
import { LoginForm } from './LoginForm';

export const metadata = { title: 'Sign in' };

export default async function Login({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next = '' } = await searchParams;
  return (
    <main style={{ maxWidth: 520, margin: '0 auto', padding: '60px 16px' }}>
      <div className="row" style={{ marginBottom: 20 }}><span className="logo">वि</span><h1>{BRAND}</h1></div>
      <div className="card stack">
        <h2>Sign in</h2>
        <LoginForm next={next} />
      </div>
      <div className="card flat section stack">
        <h3>Demo accounts (fictional school)</h3>
        <p className="small muted">Review build only. Production uses school-issued accounts, with no self sign-up for children and MFA for staff. Your reviewer will give you the password.</p>
        <div className="table-wrap"><table className="t">
          <tbody>{DEMO_ACCOUNTS.map((a) => <tr key={a.username}><td><code>{a.username}</code></td><td className="small">{a.name}</td></tr>)}</tbody>
        </table></div>
      </div>
    </main>
  );
}
