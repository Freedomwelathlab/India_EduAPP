'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from './Shell';

export function NavLinks({ nav }: { nav: NavItem[] }) {
  const path = usePathname();
  // The most specific matching item wins, so "/learn" is not lit on "/learn/sessions".
  const active = nav
    .filter((n) => path === n.href || path.startsWith(n.href + '/'))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;
  return (
    <nav>
      {nav.map((n) => (
        <Link key={n.href} href={n.href} className={n.href === active ? 'on' : ''} aria-current={n.href === active ? 'page' : undefined}>
          <span aria-hidden>{n.icon}</span>{n.label}
        </Link>
      ))}
    </nav>
  );
}
