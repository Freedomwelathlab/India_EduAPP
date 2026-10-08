import { Shell } from '@/components/Shell';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell role="Platform super admin" who={{ name: 'Platform Admin', line: 'MFA required · actions audited' }}
      nav={[{ href: '/admin', label: 'Curriculum & content', icon: '📚' }, { href: '/admin/trust', label: 'Trust & audit', icon: '🛡️' }]}>
      {children}
    </Shell>
  );
}
