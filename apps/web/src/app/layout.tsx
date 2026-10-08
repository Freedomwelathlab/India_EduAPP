import type { Metadata, Viewport } from 'next';
import { Baloo_2, Nunito_Sans, Roboto_Mono } from 'next/font/google';
import './globals.css';
import './components.css';

const baloo2 = Baloo_2({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-baloo', display: 'swap' });
const nunitoSans = Nunito_Sans({ subsets: ['latin'], weight: ['400', '600', '700', '900'], variable: '--font-nunito', display: 'swap' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'Vidya: CBSE learning & assessment for schools', template: '%s · Vidya' },
  description: 'Daily practice, CBSE-compliant periodic tests, tutor videos and doubt clearing for Classes 6–10 Maths and Science.',
  robots: { index: false }, // pre-launch
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${baloo2.variable} ${nunitoSans.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
