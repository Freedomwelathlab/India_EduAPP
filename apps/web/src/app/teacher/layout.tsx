import { Shell } from '@/components/Shell';
import { TEACHER } from '@/lib/demo';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell
      role="Teacher"
      who={{ name: TEACHER.name, line: `Mathematics · ${TEACHER.sections.join(', ')}` }}
      nav={[
        { href: '/teacher', label: 'Class dashboard', icon: '🏠' },
        { href: '/teacher/ia', label: 'IA register', icon: '📋' },
        { href: '/teacher/tests', label: 'Test builder', icon: '🧪' },
        { href: '/teacher/doubts', label: 'Doubt queue', icon: '🙋' },
        { href: '/teacher/sessions', label: 'Live sessions', icon: '🎥' },
      ]}
    >
      {children}
    </Shell>
  );
}
