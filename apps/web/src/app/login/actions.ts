'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE, DEMO_ACCOUNTS, canOpen, demoPassword, signSession } from '@/lib/session';

export async function signIn(_prev: string | null, form: FormData): Promise<string | null> {
  const username = String(form.get('username') ?? '').trim().toLowerCase();
  const password = String(form.get('password') ?? '');
  const next = String(form.get('next') ?? '');
  const account = DEMO_ACCOUNTS.find((a) => a.username === username);
  if (!account || password !== demoPassword()) return 'Wrong username or password.';
  (await cookies()).set(COOKIE, await signSession(account.username), {
    httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 8,
  });
  // Only follow internal paths the role may open (no open redirect).
  redirect(next.startsWith('/') && !next.startsWith('//') && canOpen(account.role, next) ? next : account.home);
}

export async function signOut() {
  (await cookies()).delete(COOKIE);
  redirect('/login');
}
