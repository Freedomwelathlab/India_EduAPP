/**
 * DEMO sign-in for the review build. Fictional accounts only; no real student
 * data ever sits behind these. Production replaces this with school-issued
 * accounts (Supabase Auth) and MFA for staff, per docs/architecture.
 *
 * The session cookie is `<username>.<hmac>` signed with SESSION_SECRET, using
 * Web Crypto so the same code runs in middleware (edge) and server actions.
 */

export type DemoRole = 'reviewer' | 'student' | 'teacher' | 'parent' | 'principal' | 'admin';

export interface DemoAccount { username: string; role: DemoRole; name: string; home: string }

export const DEMO_ACCOUNTS: DemoAccount[] = [
  { username: 'reviewer', role: 'reviewer', name: 'Founder review (all views)', home: '/learn' },
  { username: 'student', role: 'student', name: 'Aanya Sharma · Class 9A', home: '/learn' },
  { username: 'teacher', role: 'teacher', name: 'Mrs. Lakshmi Rao · Maths', home: '/teacher' },
  { username: 'parent', role: 'parent', name: 'Rohit Sharma · parent', home: '/parent' },
  { username: 'principal', role: 'principal', name: 'Dr. Sunita Joshi · Principal', home: '/school' },
  { username: 'admin', role: 'admin', name: 'Platform super admin', home: '/admin' },
];

/** Shared password for the fictional demo accounts. Override with DEMO_PASSWORD. */
export const demoPassword = () => process.env.DEMO_PASSWORD ?? 'VidyaDemo#2026';

const secret = () => process.env.SESSION_SECRET ?? 'dev-only-session-secret-change-me';

/** Which top-level areas each role may open. */
export const AREA_ACCESS: Record<DemoRole, string[]> = {
  reviewer: ['/learn', '/teacher', '/parent', '/school', '/admin'],
  student: ['/learn'],
  teacher: ['/teacher'],
  parent: ['/parent'],
  principal: ['/school', '/teacher'],
  admin: ['/admin'],
};

export const COOKIE = 'vidya_demo_session';

async function hmac(value: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function signSession(username: string): Promise<string> {
  return `${username}.${await hmac(username)}`;
}

export async function readSession(cookie: string | undefined): Promise<DemoAccount | null> {
  if (!cookie) return null;
  const dot = cookie.lastIndexOf('.');
  if (dot < 1) return null;
  const username = cookie.slice(0, dot);
  const sig = cookie.slice(dot + 1);
  const expected = await hmac(username);
  if (sig.length !== expected.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  if (diff !== 0) return null;
  return DEMO_ACCOUNTS.find((a) => a.username === username) ?? null;
}

export function canOpen(role: DemoRole, path: string): boolean {
  return AREA_ACCESS[role].some((a) => path === a || path.startsWith(a + '/'));
}
