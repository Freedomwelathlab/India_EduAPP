import { Shell } from '@/components/Shell';
import { ME } from '@/lib/demo';

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell
      role="Student"
      who={{ name: ME.name, line: `Class ${ME.section} · Roll ${ME.roll}` }}
      nav={[
        { href: '/learn', label: 'Today', icon: '🏠' },
        { href: '/learn/subjects', label: 'My subjects', icon: '📚' },
        { href: '/learn/questions', label: 'Question gallery', icon: '✍️' },
        { href: '/learn/tests', label: 'Tests & results', icon: '🧪' },
        { href: '/learn/sessions', label: 'Live sessions', icon: '🎥' },
        { href: '/learn/progress', label: 'My progress', icon: '📈' },
      ]}
    >
      {children}
    </Shell>
  );
}
