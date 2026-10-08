'use client';

import { useActionState } from 'react';
import { signIn } from './actions';

export function LoginForm({ next }: { next: string }) {
  const [error, action, pending] = useActionState(signIn, null);
  return (
    <form action={action} className="stack">
      <input type="hidden" name="next" value={next} />
      <label className="small"><b>Username</b><input className="in" name="username" autoComplete="username" required /></label>
      <label className="small"><b>Password</b><input className="in" name="password" type="password" autoComplete="current-password" required /></label>
      {error && <p className="feedback no" role="alert">{error}</p>}
      <button className="btn" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
    </form>
  );
}
