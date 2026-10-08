import Link from 'next/link';
import type { ReactNode } from 'react';
import { BRAND, DEMO_SCHOOL } from '@/lib/demo';
import { NavLinks } from './NavLinks';
import { signOut } from '@/app/login/actions';

export type NavItem = { href: string; label: string; icon: string };

export function Shell({ nav, who, role, children }: { nav: NavItem[]; who: { name: string; line: string }; role: string; children: ReactNode }) {
  return (
    <div className="shell">
      <aside className="side">
        <Link href="/" className="brand"><span className="logo">वि</span>{BRAND}</Link>
        <div className="grp">{role}</div>
        <NavLinks nav={nav} />
        <div className="grp">Switch view (reviewer account)</div>
        <nav>
          <Link href="/learn">🎒 Student</Link>
          <Link href="/teacher">🧑‍🏫 Teacher</Link>
          <Link href="/parent">👪 Parent</Link>
          <Link href="/school">🏫 School leader</Link>
          <Link href="/admin">🛡️ Super admin</Link>
        </nav>
        <div className="who"><b>{who.name}</b>{who.line}<br />{DEMO_SCHOOL.name}
          <form action={signOut} style={{ marginTop: 10 }}><button className="btn ghost sm">Sign out</button></form>
        </div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
