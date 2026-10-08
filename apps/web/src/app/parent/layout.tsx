import { Shell } from '@/components/Shell';
import { PARENT } from '@/lib/demo';

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell role="Parent" who={{ name: PARENT.name, line: 'Parent of Aanya (9A)' }}
      nav={[{ href: '/parent', label: "Aanya's progress", icon: '👧' }, { href: '/parent/privacy', label: 'Privacy & consent', icon: '🔒' }]}>
      {children}
    </Shell>
  );
}
