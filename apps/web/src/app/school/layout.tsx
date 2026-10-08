import { Shell } from '@/components/Shell';

export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell role="School leadership" who={{ name: 'Dr. Sunita Joshi', line: 'Principal' }}
      nav={[{ href: '/school', label: 'Academic overview', icon: '🏫' }, { href: '/school/coverage', label: 'Content coverage', icon: '🗺️' }]}>
      {children}
    </Shell>
  );
}
